import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import CustomShaderMaterial from "./CustomShaderMaterial";

extend({ CustomShaderMaterial });

const ShaderEffect = () => {
  const shaderRef = useRef<CustomShaderMaterial>(null);

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value += delta;
      shaderRef.current.uniforms.resolution.value.set(
        state.size.width,
        state.size.height,
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <customShaderMaterial ref={shaderRef} />
    </mesh>
  );
};

const ShaderCanvas = () => {
  return (
    <Canvas>
      <ShaderEffect />
    </Canvas>
  );
};

export default ShaderCanvas;
