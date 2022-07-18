import React, { FC, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context'
import { resetFilters, setFilterByValue } from '../../reducers/reducer'
import { Product } from '../../types'
import { RangeSlider } from '../RangeSlider/RangeSlider'

type OnCheckBoxChange = (event: { value: boolean; field: string; name: string }) => void

interface CheckBoxProps {
  name: string
  field: string
  checked: boolean
  onChange: OnCheckBoxChange
}

const CheckBox: FC<CheckBoxProps> = ({ name, field, checked, onChange }) => {
  return (
    <label>
      {name}
      <input
        type='checkbox'
        checked={checked}
        name={name}
        onChange={(e) =>
          onChange({
            value: e.target.checked,
            field,
            name,
          })
        }
      />
    </label>
  )
}

type CheckBoxGroupProps = {
  field: string
  values: string[]
  checkedValues?: string[]
  onChange: (values: string[]) => void
}

const CheckBoxGroup: FC<CheckBoxGroupProps> = ({ field, values, checkedValues = [], onChange }) => {
  const onCheckBoxChange: OnCheckBoxChange = useCallback(
    ({ name, value }) => {
      if (value) {
        onChange([...checkedValues, name])
      } else {
        onChange(checkedValues.filter((value) => name !== value))
      }
    },
    [checkedValues, onChange],
  )

  return (
    <>
      {values.map((value) => (
        <CheckBox
          key={value}
          field={field}
          name={value}
          onChange={onCheckBoxChange}
          checked={checkedValues.includes(value)}
        />
      ))}
    </>
  )
}

const initFormValue = {
  color: [] as string[],
}

const ALL_COLORS = ['red', 'black', 'white']

export const Form = () => {
  const { dispatch } = useGlobalContext()
  const [formState, setFormState] = useState<{ color: string[] }>()

  useEffect(() => {
    const storeFormState = localStorage.getItem('formState')

    if (storeFormState) {
      try {
        setFormState(JSON.parse(storeFormState))
      } catch (e) {
        console.log(e)
      }
    } else {
      setFormState(initFormValue)
    }
  }, [])

  useEffect(() => {
    if (formState) {
      localStorage.setItem('formState', JSON.stringify(formState))
    }
  }, [formState])

  const onColorChange = useCallback((value: string[]) => {
    dispatch(setFilterByValue({ field: 'color', value: value }))
    setFormState((state) => ({
      ...state,
      color: value,
    }))
  }, [])

  const handleReset = useCallback(() => {
    setFormState({ ...initFormValue })
    dispatch(resetFilters())
  }, [])

  return (
    <>
      <CheckBoxGroup
        field='color'
        checkedValues={formState?.color}
        onChange={onColorChange}
        values={ALL_COLORS}
      />
      <button onClick={handleReset}>RESET</button>
    </>
  )
}

export const Filters = () => {
  return (
    <Filter>
      <Form />
      {/* <FilterCategory>
        <h4>Brands:</h4>
        {['Google', 'Xiaomi', 'Samsung', 'Apple'].map((name) => (
          <div key={'brand' + name} style={{ display: 'flex', gap: '20px' }}>
            <Input name={name} field={'brand'} reset={reset} />
            <p>{name}</p>
          </div>
        ))}
      </FilterCategory> */}
      {/* <RangeSlider field={'year'} from={2000} to={2022} />
      <RangeSlider field={'count'} from={0} to={200} /> */}
    </Filter>
  )
}

const FilterCategory = styled.div`
  padding: 0 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`

const Filter = styled.div`
  height: calc(100vh - 58.5px);
  width: 250px;
`
