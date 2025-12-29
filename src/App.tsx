import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense } from "react";
import ContentAvatar from "./components/ContentAvatar";
import Buttons from "./components/Buttons";
import SceneLoader from "./components/SceneLoader";

function App() {
  return (
    <>
      <Buttons />

      <Canvas shadows camera={{ position: [0, 10, 0], fov: 30 }}>
        <color attach="background" args={["lightpink"]} />

        <axesHelper args={[0.5]} />
        <gridHelper args={[10, 10]} />

        <Suspense fallback={<SceneLoader />}>
          <ContentAvatar />
          <Preload all />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
