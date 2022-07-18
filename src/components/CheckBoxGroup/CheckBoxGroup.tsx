import React, { FC, useCallback } from 'react'

type OnCheckBoxChange = (event: { value: boolean; field: string; name: string }) => void

interface CheckBoxProps {
  name: string
  field: string
  checked: boolean
  onChange: OnCheckBoxChange
}

const CheckBox: FC<CheckBoxProps> = ({ name, field, checked, onChange }) => {
  return (
    <label style={{ display: 'flex', gap: '10px' }}>
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
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </label>
  )
}

type CheckBoxGroupProps = {
  field: string
  values: string[]
  checkedValues?: string[]
  onChange: (values: string[]) => void
}

export const CheckBoxGroup: FC<CheckBoxGroupProps> = ({
  field,
  values,
  checkedValues = [],
  onChange,
}) => {
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
