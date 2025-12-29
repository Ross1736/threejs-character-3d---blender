import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { Suspense } from "react";
import ContentAvatar from "./components/ContentAvatar";
import Buttons from "./components/Buttons";

function App() {
  return (
    <>
      <Buttons />

      <Canvas shadows camera={{ position: [0, 10, 0], fov: 30 }}>
        <color attach="background" args={["lightpink"]} />

        <axesHelper args={[0.5]} />
        <gridHelper args={[10, 10]} />

        <Suspense fallback={null}>
          <ContentAvatar />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
