import React from 'react'
import {SketchPicker} from "react-color"
import { useSnapshot } from 'valtio'
import state from '../store'

const ColorPicker = () => {
  const snap = useSnapshot(state)
  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker
        color={snap.color}
        disableAlpha
        // presetColors={Red: #FF0000: White: #FFFFFF: Cyan #00FFFF: Silver: #C0C0C0: Blue #0000FF: Gray or Grey #808080: DarkBlue #00008B: Black #000000: LightBlue: #ADD8E6: Orange: #FFA500: Purple #800080: Brown: #A52A2A: Yellow: #FFFF00: Maroon #800000: Lime #00FF00: Green #008000, #FF00FF, #808000, #FFC0CB, #7FFD4}
        onChange={(color) => state.color = color.hex}
      />
    </div>
  )
}

export default ColorPicker