import { useBox } from "@react-three/cannon";
import { FC, useState } from "react";
import { ICube, useCubes } from "../hooks";
import * as textures from "../images/texture";

interface Props {
  cube: ICube;
}
export const Cube: FC<Props> = ({ cube }) => {
  const [removeCube, addCube] = useCubes((state) => [
    state.removeCube,
    state.addCube,
  ]);
  const [hover, setHover] = useState(false);
  const { position, texture } = cube;
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const textureActive = (textures as any)[texture + "Texture"];
  return (
    <mesh
      ref={ref as any}
      onPointerMove={(e) => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHover(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (e.altKey) {
          removeCube(cube.id);
        } else {
          const pos = Object.values(e.point).map((n) => Math.ceil(n));
          addCube(pos as any);
        }
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        color={hover ? "green" : "white"}
        map={textureActive}
        attach="material"
      />
    </mesh>
  );
};
