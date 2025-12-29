import { Center, Environment, OrbitControls } from "@react-three/drei";
import Avatar from "./Avatar";

function ContentAvatar() {
  return (
    <>
      <OrbitControls
        target={[0, 0, 0]}
        minDistance={3.5}
        maxDistance={5}
        zoomToCursor={false}
        enableRotate={false}
        enableZoom={true}
        enablePan={false}
      />
      <Environment preset="apartment" />
      <Center position={[0, 0, 0.4]}>
        <Avatar />
      </Center>
    </>
  );
}

export default ContentAvatar;
