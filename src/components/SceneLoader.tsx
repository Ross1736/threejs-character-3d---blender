import style from "./styles/SceneLoader.module.css";
import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

function SceneLoader() {
  const { progress } = useProgress();
  const [shown, setShown] = useState<number>(0);

  useEffect(() => {
    const p = Number(progress.toFixed(0));

    if (p > 0 && p !== shown) {
      const id = requestAnimationFrame(() => setShown(p));
      return () => cancelAnimationFrame(id);
    }
  }, [progress, shown]);

  if (shown === 100) {
    return null;
  }
  return <div className={style.loader}>{shown}%</div>;
}

export default SceneLoader;
