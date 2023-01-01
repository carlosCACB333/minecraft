import { useEffect, useState } from "react";

type Action =
  | "forward"
  | "backward"
  | "left"
  | "right"
  | "up"
  | "down"
  | "dirt"
  | "grass"
  | "glass"
  | "wood"
  | "log";

const ACTIONS: { [k: string]: Action } = {
  KeyW: "forward",
  KeyS: "backward",
  KeyA: "left",
  KeyD: "right",
  ArrowUp: "forward",
  ArrowDown: "backward",
  ArrowLeft: "left",
  ArrowRight: "right",

  Space: "up",
  ShiftLeft: "down",
  Dijit1: "dirt",
  Dijit2: "grass",
  Dijit3: "glass",
  Dijit4: "wood",
  Dijit5: "log",
  Numpad1: "dirt",
  Numpad2: "glass",
  Numpad3: "grass",
  Numpad4: "log",
  Numpad5: "wood",
};

export const useKeyboard = () => {
  const [actions, setAction] = useState<{
    [k in Action]: boolean;
  }>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const action = ACTIONS[event.code];
      if (!action) return;
      if (actions[action]) return;
      setAction((prev) => ({ ...prev, [action]: true }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const action = ACTIONS[event.code];
      if (!action) return;
      setAction((prev) => ({ ...prev, [action]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [actions]);

  return actions;
};
