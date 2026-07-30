import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickInflateCode from '../../../registry/new-york/ClickInflate/ClickInflate.tsx?raw'
import ClickInflate from '../../../registry/new-york/ClickInflate/ClickInflate'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Inflate = () => {
  const [color, setColor] = useState("#ffffff")
  const [targetRadius, setTargetRadius] = useState(60)
  const [lerpSpeed, setLerpSpeed] = useState(0.15)
  const [lineWidth, setLineWidth] = useState(1.5)

  const code = `<ClickInflate
  strokeColor="${color}"
  targetRadius={${targetRadius}}
  lerpSpeed={${lerpSpeed}}
  lineWidth={${lineWidth}}
>
  {/*Content div*/}
</ClickInflate>`

  return (
    <ComponentPageLayout
      title="Inflate"
      code={code}
      cliCode="npx shadcn@latest add devsterxyz/Klick/click-inflate"
      manualCode={clickInflateCode}
      controlTitle="Tune the inflation"
      controlDescription="Shape the color, target radius, easing, and line width."
      controlAdornment={<ColorPreview color={color} />}
      preview={<ClickInflate strokeColor={color} targetRadius={targetRadius} lerpSpeed={lerpSpeed} lineWidth={lineWidth}><PreviewTarget label="Inflate" /></ClickInflate>}
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="targetRadius" min={20} max={160} step={1} value={targetRadius} onChange={setTargetRadius} />
          <SliderField title="lerpSpeed" min={0.05} max={0.5} step={0.05} value={lerpSpeed} onChange={setLerpSpeed} />
          <SliderField title="lineWidth" min={0.5} max={8} step={0.5} value={lineWidth} onChange={setLineWidth} />
        </>
      }
    />
  )
}

export default Inflate
