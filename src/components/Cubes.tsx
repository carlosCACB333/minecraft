import { useCubes } from "../hooks/useCubes";
import { Cube } from "./Cube";

export const Cubes = () => {
  const { cubes } = useCubes();
  return (
    <>
      {cubes.map((cube) => (
        <Cube key={cube.id} cube={cube} />
      ))}
    </>
  );
};
