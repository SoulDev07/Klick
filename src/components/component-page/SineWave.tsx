import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickSineWaveCode from '../../../registry/new-york/ClickSineWave/ClickSineWave.tsx?raw'
import ClickSineWave from '../../../registry/new-york/ClickSineWave/ClickSineWave'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const SineWave = () => {
  const [color, setColor] = useState("#ffffff")
  const [waveSpeed, setWaveSpeed] = useState(0.2)
  const [expandSpeed, setExpandSpeed] = useState(4)
  const [amplitude, setAmplitude] = useState(20)

  const code = `<ClickSineWave
  strokeColor="${color}"
  waveSpeed={${waveSpeed}}
  expandSpeed={${expandSpeed}}
  amplitude={${amplitude}}
>
  {/*Content div*/}
</ClickSineWave>`

  return (
    <ComponentPageLayout
      title="Sine Wave"
      code={code}
      cliCode="npx shadcn@latest add devsterxyz/Klick/click-sine-wave"
      manualCode={clickSineWaveCode}
      controlTitle="Tune the sine wave"
      controlDescription="Shape the color, wave speed, expansion, and amplitude."
      controlAdornment={<ColorPreview color={color} />}
      preview={<ClickSineWave strokeColor={color} waveSpeed={waveSpeed} expandSpeed={expandSpeed} amplitude={amplitude}><PreviewTarget label="Sine Wave" /></ClickSineWave>}
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="waveSpeed" min={0.05} max={1} step={0.05} value={waveSpeed} onChange={setWaveSpeed} />
          <SliderField title="expandSpeed" min={1} max={12} step={0.5} value={expandSpeed} onChange={setExpandSpeed} />
          <SliderField title="amplitude" min={4} max={60} step={1} value={amplitude} onChange={setAmplitude} />
        </>
      }
    />
  )
}

export default SineWave
