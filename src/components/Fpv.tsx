import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const Fpv = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  return (
    <PointerLockControls
      args={[camera, domElement]}
      addEventListener={undefined}
      hasEventListener={undefined}
      removeEventListener={undefined}
      dispatchEvent={undefined}
    />
  );
};
