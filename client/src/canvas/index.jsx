import {Canvas} from "@react-three/fiber"
import { Center, Environment} from "@react-three/drei"
import Shirt from "./Shirt"
import Backdrop from "./Backdrop"
import Camerarig from "./Camerarig"

const Canvasmodel = () => {
  return (
    <Canvas
      shadows
      camera={{position: [0, 0, 0], fov: 25}}
      gl={{preserveDrawerBuffer: true}}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <Camerarig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </Camerarig>

    </Canvas>
  )
}

export default Canvasmodel