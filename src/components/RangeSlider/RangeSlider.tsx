import Nouislider from 'nouislider-react'
import React, { FC } from 'react'

interface RangeSliderProps {
  rangeValues?: {
    from: number
    to: number
  }
  startValues: {
    from: number
    to: number
  }
  onChange: (value: { from: number; to: number }) => void
}

export const RangeSlider: FC<RangeSliderProps> = ({
  rangeValues = { from: 0, to: 1 },
  startValues,
  onChange,
}) => {
  return (
    <Nouislider
      range={{ min: startValues.from, max: startValues.to }}
      start={[rangeValues.from, rangeValues.to]}
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
      style={{ fontSize: 14, marginTop: '25px' }}
      onSlide={(a) => onChange({ from: Number(a[0]), to: Number(a[1]) })}
    />
  )
}
