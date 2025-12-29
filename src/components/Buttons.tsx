import style from "./styles/Buttons.module.css";
import { useControllerStore } from "../store/controller.store";

function Buttons() {
  const { setActiveAnimation } = useControllerStore();

  return (
    <div className={style.buttons}>
      <button onClick={() => setActiveAnimation("idle")}>Idle</button>
      <button onClick={() => setActiveAnimation("dismissing")}>
        Dismissing
      </button>
    </div>
  );
}

export default Buttons;
