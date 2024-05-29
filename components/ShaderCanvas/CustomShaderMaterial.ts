import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { ShaderMaterial } from "three";

class CustomShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2() },
      },
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
          vec2 uv = fragCoord / resolution * 2.0 - 1.0;
          uv.x *= resolution.x / resolution.y;

          uv.x += sin(cos(uv.x * sin(uv.x / 2.0) - time) + time) * 5.0;

          vec3 uvRGB = vec3(uv.y, uv.y, uv.y);

          uvRGB.x += (cos(uv.x) * sin(time) + cos(uv.x + time * 2.0)) * 0.3;
          uvRGB.y += (cos(uv.x + 2.0) * sin(time - 2.0) + cos(uv.x + time * 2.0)) * 0.3;
          uvRGB.z += (cos(uv.x + 4.0) * sin(time - 4.0) + cos(uv.x + time * 2.0)) * 0.3;

          float a = smoothstep(0.0, abs(uvRGB.x), 0.08);

          fragColor = vec4(uvRGB, a);
        }

        void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
        }
      `,
    });
  }
}

extend({ CustomShaderMaterial });

export default CustomShaderMaterial;
