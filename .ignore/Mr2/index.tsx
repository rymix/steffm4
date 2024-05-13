"use client";

import { OrbitControls, Preload } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as TWEEN from "@tweenjs/tween.js";
import { CanvasWrapper } from "components/Mr2/StyledMr2";
import { useThree } from "contexts/three";
import { Resolution } from "postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Mesh } from "three";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Mr2Model: React.FC = () => {
  const fileUrl = "/models/mr2.glb";
  const group = useRef<THREE.Group>(null!);
  const mesh = useRef<Mesh>(null!);
  const actions = useRef<{ [key: string]: THREE.AnimationAction }>();
  const model = useLoader(GLTFLoader, fileUrl);
  const { scene, animations } = model;
  const [mixer, setMixer] = useState<THREE.AnimationMixer | null>(null);
  const { isUserInteracting, setZoomLevel, zoomLevel } = useThree();

  // For model rotation
  useFrame(() => {
    if (!isUserInteracting) {
      mesh.current.rotation.y += 0.005;
    }
  });

  const lowestHeight = 0;
  const highestHeight = 2.5;
  const period = 15;

  // For camera vertical movement
  useFrame((state) => {
    TWEEN.update(); // Update all tweens

    if (!isUserInteracting) {
      const time = state.clock.getElapsedTime();
      const amplitude = (highestHeight - lowestHeight) / 2;
      const centerY = (highestHeight + lowestHeight) / 2;
      const yPos =
        Math.sin((time * 2 * Math.PI) / period) * amplitude + centerY;

      if (Math.abs(state.camera.position.y - yPos) > 0.05) {
        // If the camera is not already at the target position (with some tolerance)
        new TWEEN.Tween(state.camera.position)
          .to({ y: yPos }, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
      }
    }
  });

  useEffect(() => {
    if (group.current && animations.length > 0) {
      const newMixer = new THREE.AnimationMixer(group.current);
      const idleAction = newMixer.clipAction(animations[0]);
      const clip = idleAction.getClip();
      idleAction.play();

      actions.current = { idle: idleAction };
      setMixer(newMixer);

      // Cleanup function to stop and uncache the animation on component unmount
      return () => {
        idleAction.stop();
        newMixer.uncacheAction(clip);
      };
    }
    // Return a noop function for consistent return
    return () => {};
  }, [model, animations]);

  useEffect(() => {
    if (scene) {
      const materialMask = {
        color: 0x000000,
        transparent: true,
        opacity: 0.9,
      };

      ["CarSolid", "HeadlightsSolid", "WheelsSolid"].forEach((name) => {
        const solidMesh = scene.getObjectByName(name);
        if (solidMesh && solidMesh instanceof THREE.Mesh) {
          solidMesh.material = materialMask;
        }
      });
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (mixer) mixer.update(delta);
  });

  return (
    <group ref={group} dispose={null}>
      <mesh ref={mesh}>
        <primitive object={scene} />
      </mesh>
    </group>
  );
};

const Mr2 = (): React.FC => {
  const { setIsUserInteracting, setZoomLevel, zoomLevel } = useThree();

  // Adjust the onStart and onEnd handlers to manage user interaction state
  const handleStart = (): void => {
    setIsUserInteracting(true);
    TWEEN.removeAll(); // Stop any ongoing tweens to avoid conflicts
  };

  const handleEnd = (): void => {
    setIsUserInteracting(false);
    // Reset the camera zoom to its default value
    new TWEEN.Tween(state.camera.zoom)
      .to({ zoom: 1 }, 1000) // Tween to reset zoom over 1000 milliseconds
      .onUpdate(() => state.camera.updateProjectionMatrix()) // Update the camera's projection matrix on each tween update
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  };

  return (
    <CanvasWrapper>
      <Canvas
        shadows
        frameloop="always"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 80,
          near: 0.1,
          far: 200,
          position: [0, 1.5, 3],
        }}
      >
        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls // autoRotate //For auto rotation
            enableZoom
            enablePan
            onStart={handleStart}
            onEnd={handleEnd}
            // For locking vertical movement of the object.
            // maxPolarAngle={Math.PI / 2}
            // minPolarAngle={Math.PI / 2}
          />
          <Mr2Model />
          <Preload all />
        </Suspense>
        <EffectComposer>
          <Bloom
            intensity={1}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.025}
            mipmapBlur={false}
            resolutionX={Resolution.AUTO_SIZE}
            resolutionY={Resolution.AUTO_SIZE}
          />
        </EffectComposer>
      </Canvas>
    </CanvasWrapper>
  );
};

export default Mr2;
