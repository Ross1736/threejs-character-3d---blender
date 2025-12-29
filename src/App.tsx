import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ContentAvatar from "./components/ContentAvatar";
import Buttons from "./components/Buttons";
import SceneLoader from "./components/SceneLoader";

function App() {
  return (
    <>
      <Buttons />
      <SceneLoader />

      <Canvas shadows camera={{ position: [0, 10, 0], fov: 30 }}>
        <color attach="background" args={["skyblue"]} />

        <axesHelper args={[0.5]} />
        <gridHelper args={[10, 10]} />

        <Suspense fallback={null}>
          <ContentAvatar />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
