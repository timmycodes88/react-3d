import tw from "twin.macro"
import Scene from "./Scenes/Scene"

export default function App() {
  return (
    <Body>
      <Scene />
    </Body>
  )
}

const Body = tw.div`w-screen h-screen`
