import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickBubbleCode from '../../../registry/new-york/ClickBubble/ClickBubble.tsx?raw'
import ClickBubble from '../../../registry/new-york/ClickBubble/ClickBubble'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Bubble = () => {
  const [color, setColor] = useState("#ffffff")
  const [wobbleFreq, setWobbleFreq] = useState(6)
  const [wobbleAmp, setWobbleAmp] = useState(2)
  const [growSpeed, setGrowSpeed] = useState(2.5)

  const code = `<ClickBubble
  strokeColor="${color}"
  wobbleFreq={${wobbleFreq}}
  wobbleAmp={${wobbleAmp}}
  growSpeed={${growSpeed}}
>
  {/*Content div*/}
</ClickBubble>`

  return (
    <ComponentPageLayout
      title="Bubble"
      code={code}
      cliCode="npx shadcn@latest add devsterxyz/Klick/click-bubble"
      manualCode={clickBubbleCode}
      controlTitle="Tune the bubble"
      controlDescription="Shape the color, wobble frequency, wobble amount, and growth."
      controlAdornment={<ColorPreview color={color} />}
      preview={<ClickBubble strokeColor={color} wobbleFreq={wobbleFreq} wobbleAmp={wobbleAmp} growSpeed={growSpeed}><PreviewTarget label="Bubble" /></ClickBubble>}
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="wobbleFreq" min={2} max={16} step={1} value={wobbleFreq} onChange={setWobbleFreq} />
          <SliderField title="wobbleAmp" min={0} max={10} step={0.5} value={wobbleAmp} onChange={setWobbleAmp} />
          <SliderField title="growSpeed" min={0.5} max={8} step={0.5} value={growSpeed} onChange={setGrowSpeed} />
        </>
      }
    />
  )
}

export default Bubble
