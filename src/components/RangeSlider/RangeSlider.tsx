import Nouislider from 'nouislider-react'
import React, { FC } from 'react'
import { useGlobalContext } from '../../context'
import { setFilterByRange } from '../../reducers/reducer'
import { Product } from '../../types'

interface RangeSliderProps {
  field: keyof Product
  from: number
  to: number
}

export const RangeSlider: FC<RangeSliderProps> = ({ field, from, to }) => {
  const { dispatch } = useGlobalContext()
  return (
    <Nouislider
      range={{ min: from, max: to }}
      start={[from, to]}
      step={1}
      format={{
        to: function (value) {
          return value.toFixed(0)
        },
        from: function (value) {
          return Number(value)
        },
      }}
      connect
      tooltips={[true, true]}
      behaviour='tap-drag'
      style={{ fontSize: 14, width: '70%' }}
      onSlide={(a) =>
        dispatch(
          setFilterByRange({ field: field, value: { from: Number(a[0]), to: Number(a[1]) } }),
        )
      }
    />
  )
}
