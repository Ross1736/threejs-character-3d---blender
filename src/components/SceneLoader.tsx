import style from "./styles/SceneLoader.module.css";
import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

function SceneLoader() {
  const { progress } = useProgress();
  const [shown, setShown] = useState<number>(0);

  useEffect(() => {
    const p = Math.floor(progress);
    if (p > 0 && p !== shown) {
      const id = requestAnimationFrame(() => setShown(p));
      return () => cancelAnimationFrame(id);
    }
  }, [progress, shown]);

  return (
    <Html center>
      <div className={style.loader}>{shown}%</div>
    </Html>
  );
}

export default SceneLoader;
