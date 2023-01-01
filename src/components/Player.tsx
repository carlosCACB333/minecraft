import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks";

const SPEED = 5;
const JUMP = 5;

export const Player = () => {
  const actions = useKeyboard();

  const { camera } = useThree();
  const pos = useRef([0, 0, 0]);
  const vel = useRef([0, 0, 0]);

  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 0.5, 0],
    type: "Dynamic",
  }));

  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p;
    });
  }, [api.position]);

  useEffect(() => {
    api.velocity.subscribe((v) => {
      vel.current = v;
    });
  }, [api.velocity]);

  useFrame(() => {
    camera.position.copy(new Vector3(...pos.current));
    const frontVector = new Vector3(
      0,
      0,
      (actions.forward ? 1 : 0) - (actions.backward ? 1 : 0)
    );

    const sideVector = new Vector3(
      (actions.right ? 1 : 0) - (actions.left ? 1 : 0),
      0,
      0
    );

    const direction = new Vector3();
    direction
      .subVectors(sideVector, frontVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(
      direction.x,
      actions.up && Math.abs(vel.current[1]) < 0.05 ? JUMP : vel.current[1],
      direction.z
    );
  });
  return <mesh ref={ref as any} />;
};
