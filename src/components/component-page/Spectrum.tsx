import React, { useState } from 'react'
import ComponentPageLayout, { ColorPicker, ColorPreview } from './layout'
import clickSpectrumCode from '../../../registry/new-york/ClickSpectrum/ClickSpectrum.tsx?raw'
import ClickSpectrum from '../../../registry/new-york/ClickSpectrum/ClickSpectrum'
import SliderField from '../SliderField'
import PreviewTarget from './PreviewTarget'

const colorOptions = ["#FFFFFF", "#000000", "#a3e635", "#f59e0b", "#8b5cf6"]

const Spectrum = () => {
  const [color, setColor] = useState("#ffffff")
  const [barCount, setBarCount] = useState(16)
  const [maxBarHeight, setMaxBarHeight] = useState(30)
  const [ringSpeed, setRingSpeed] = useState(1.5)

  const code = `<ClickSpectrum
  strokeColor="${color}"
  barCount={${barCount}}
  maxBarHeight={${maxBarHeight}}
  ringSpeed={${ringSpeed}}
>
  {/*Content div*/}
</ClickSpectrum>`

  return (
    <ComponentPageLayout
      title="Spectrum"
      code={code}
      cliCode="npx shadcn@latest add devsterxyz/Klick/click-spectrum"
      manualCode={clickSpectrumCode}
      controlTitle="Tune the spectrum"
      controlDescription="Shape the color, bar count, peak height, and ring speed."
      controlAdornment={<ColorPreview color={color} />}
      preview={<ClickSpectrum strokeColor={color} barCount={barCount} maxBarHeight={maxBarHeight} ringSpeed={ringSpeed}><PreviewTarget label="Spectrum" /></ClickSpectrum>}
      controls={
        <>
          <ColorPicker value={color} colors={colorOptions} onChange={setColor} />
          <SliderField title="barCount" min={6} max={48} step={1} value={barCount} onChange={setBarCount} />
          <SliderField title="maxBarHeight" min={12} max={80} step={1} value={maxBarHeight} onChange={setMaxBarHeight} />
          <SliderField title="ringSpeed" min={0.5} max={6} step={0.5} value={ringSpeed} onChange={setRingSpeed} />
        </>
      }
    />
  )
}

export default Spectrum
