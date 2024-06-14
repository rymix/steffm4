/* eslint-disable @typescript-eslint/no-namespace */
import type { ReactThreeFiber } from "@react-three/fiber";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import CustomShaderMaterial from "components/ShaderCanvas/CustomShaderMaterial";
import { useRef } from "react";

extend({ CustomShaderMaterial });

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      customShaderMaterial: ReactThreeFiber.Object3DNode<
        CustomShaderMaterial,
        typeof CustomShaderMaterial
      >;
    }
  }
}

const ShaderEffect: React.FC = () => {
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

const ShaderCanvas: React.FC = () => {
  return (
    <Canvas>
      <ShaderEffect />
    </Canvas>
  );
};

export default ShaderCanvas;
