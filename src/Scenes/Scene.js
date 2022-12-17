import { Physics } from "@react-three/cannon"
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import Box from "../Objects/Box"
import Car from "../Objects/Car"
import Ground from "../Objects/Ground"

import Track from "../Objects/Track"
import degreesToRadians from "../utils/degreesToRadians"

export default function Scene() {
  return (
    <Body>
      <OrbitControls target={[-2.64, -0.71, 0.03]} />

      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"}
      />

      <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />

      <Car />
      <Track />
      <Ground />

      <ambientLight intensity={0.5} />
      <spotLight position={[5, 10, 10]} />
    </Body>
  )
}

function Body({ children }) {
  return (
    <Canvas>
      <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
        {children}
      </Physics>
    </Canvas>
  )
}
