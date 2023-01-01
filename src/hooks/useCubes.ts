import { nanoid } from "nanoid";
import create from "zustand";
type Position = [number, number, number];
type Texture = "dirt" | "grass" | "glass" | "wood" | "log";
export interface ICube {
  id: string;
  position: Position;
  texture: Texture;
}

export interface CubesState {
  texture: Texture;
  cubes: ICube[];
  addCube: (position: Position) => void;
  removeCube: (id: string) => void;
  setTexture: (texture: Texture) => void;
  saveWorld: () => void;
}

export const useCubes = create<CubesState>((set) => ({
  texture: "dirt",
  cubes: [
    {
      id: nanoid(),
      position: [0.5, 1, 0],
      texture: "dirt",
    },
    {
      id: nanoid(),
      position: [0.5, 2, 0],
      texture: "wood",
    },
  ],
  addCube: (position) => {
    set((state) => ({
      cubes: [
        ...state.cubes,
        {
          id: nanoid(),
          position,
          texture: state.texture,
        },
      ],
    }));
  },

  removeCube: (id: string) => {
    set((state) => ({ cubes: state.cubes.filter((c) => c.id !== id) }));
  },
  setTexture: (texture) => set(() => ({ texture })),
  saveWorld: () =>
    set((state) => {
      localStorage.setItem("cubes", JSON.stringify(state.cubes));
      return state;
    }),
}));
