import style from "./styles/Buttons.module.css";
import { useControllerStore } from "../store/controller.store";

const listAnimations = [
  "idle",
  "armStretching",
  "defeated",
  "happyIdle",
  "oldManIdle",
  "pointingForward",
  "surprised",
  "tellingSecret",
  "thankful",
  "twistDanceAnimations",
];

function Buttons() {
  const { setActiveAnimation } = useControllerStore();

  return (
    <div className={style.buttons}>
      {listAnimations.map((e, i) => (
        <button key={i} onClick={() => setActiveAnimation(e)}>
          {e}
        </button>
      ))}
    </div>
  );
}

export default Buttons;
