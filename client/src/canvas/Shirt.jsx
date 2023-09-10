import React from 'react'
import {easing} from "maath"
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'

const Shirt = () => {
    const snap = useSnapshot(state);
    const {nodes, materials} = useGLTF('/shirt_baked.glb');

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));     //to ease the color on the model instead of applying it dramatically

    const stateString = JSON.stringify(snap);

  return (
    <group key = {stateString}>
      <mesh  
        castShadow              //to cast the 3d shadow
        geometry={nodes.T_Shirt_male.geometry}               //set the geometry
        material={materials.lambert1}               //set the roughness
        material-roughnes={1}                   //the roughness of the 3d model
        dispose={null}
      >
        {snap.isFullTexture &&(
          <Decal
            position={[0,0,0]}
            rotation={[0,0,0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture &&(             //the logoTexture in our state is currently on so it'll display the logo on the shirt automatically
        <Decal
          position={[0,0.04,0.15]}
          rotation={[0,0,0]}
          scale={0.15}
          map={logoTexture}
          depthTest={false}
          depthWrite={true}
        />
        )}
      </mesh>
    </group>
  )
}

export default Shirt