import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Cubes, Fpv, Ground, Player, Selector } from "./components";

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[0, 1, 0]} />
        <ambientLight intensity={0.5} />
        <Fpv />
        <Physics>
          <Cubes />
          <Ground />
          <Player />
        </Physics>
      </Canvas>
      <div className="pointer">+</div>
      <Selector />
    </>
  );
}

export default App;
