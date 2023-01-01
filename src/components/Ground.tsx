import { usePlane } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";
import { useCubes } from "../hooks/useCubes";
import { grassTexture } from "../images";

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  const addCube = useCubes((state) => state.addCube);
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const pos = Object.values(e.point).map((n) => Math.ceil(n));
    addCube(pos as any);
  };
  return (
    <mesh ref={ref as any} receiveShadow onClick={handleClick}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={grassTexture} />
    </mesh>
  );
};
