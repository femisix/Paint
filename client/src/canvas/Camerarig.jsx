import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import state from '../store'

const Camerarig = ({children}) => {

  const group = useRef();
  const snap = useSnapshot(state)
  
  useFrame((state, delta) =>{             //useframe hook allows you to run codes on every rendered frame
    const isBreakPoint = window.innerWidth <=1260;
    const isMobile = window.innerWidth <= 600;

    //set the initial position of the model on different screen sizes
    let targetPosition = [-0.4, 0, 2];
    if(snap.intro){
      if(isBreakPoint) targetPosition = [0, 0, 2];
      if(isMobile) targetPosition = [0, 0.2, 2.5];
    }else{
      if(isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2]
    }

    //set camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    easing.dampE(                     //the rotaing animation effect on the shirt
      group.current.rotation,
      [-state.pointer.y / 15, -state.pointer.x / 9, 0],
      0.25,         //smooth time
      delta         //delta is the difference between the last frame that happended
    )
  })



  return (
    <group ref={group}>
      {children}      
    </group>
  )
}

export default Camerarig