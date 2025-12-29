import { Canvas } from "@react-three/fiber";
import ContentAvatar from "./components/ContentAvatar";
import Buttons from "./components/Buttons";

function App() {
  return (
    <>
      <Buttons />

      <Canvas shadows camera={{ position: [0, 10, 0], fov: 50 }}>
        <color attach="background" args={["lightpink"]} />

        <axesHelper args={[0.5]} />
        <gridHelper args={[10, 10]} />
        <ContentAvatar />
      </Canvas>
    </>
  );
}

export default App;
