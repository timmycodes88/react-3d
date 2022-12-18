import { Physics } from "@react-three/cannon"
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useState } from "react"
import Box from "../Objects/Box"
import Car from "../Objects/Car"
import Ground from "../Objects/Ground"

import Track from "../Objects/Track"
import degreesToRadians from "../utils/degreesToRadians"

export default function Scene() {
  const [thirdPerson, setThirdPerson] = useState(false)
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21])

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key == "k") {
        if (thirdPerson) {
          setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01])
        }
        setThirdPerson(!thirdPerson)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [thirdPerson])

  return (
    <Body>
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"}
      />

      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}

      <Car thirdPerson={thirdPerson} setCameraPosition={setCameraPosition} />
      <Track />
      <Ground />

      <ambientLight intensity={0.2} />
      <pointLight
        position={[-2.86, 0.1, -0.9]}
        intensity={0.1}
        color={"deepskyblue"}
      />
      <pointLight
        position={[-3.33, 0.1, -0.9]}
        intensity={0.1}
        color={"orange"}
      />
      <pointLight position={[0.41, 0.1, 2]} intensity={0.1} color="red" />
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
