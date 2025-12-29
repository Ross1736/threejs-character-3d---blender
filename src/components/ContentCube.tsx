import { OrbitControls } from "@react-three/drei";

function ContentCube() {
  return (
    <>
      <mesh>
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <boxGeometry args={[1, 1, 1]} scale={1} />
        <meshPhongMaterial />
      </mesh>
      <ambientLight intensity={0.1} />
      <OrbitControls target={[0, 0, 0]} />
    </>
  );
}

export default ContentCube;
