import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { MapControls } from "@react-three/drei";
import { OrthographicCamera } from "@react-three/drei";

export const Control = () => {
  return (
    <>
      <OrthographicCamera makeDefault position={[0, 50, 0]} scale={0.1} />
      {/* <PerspectiveCamera makeDefault position={[0, 50, 0]} /> */}
      <MapControls
        enableRotate={false}
        enableDamping={false}
        target={[0, 0, 0]}
      />
      {/* <OrbitControls enableDamping={false} /> */}
    </>
  );
};

export default Control;
