import { TextureLoader } from "three";
import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import circleImg from "../assets/circle.png";
import { useCallback, useMemo, useRef } from "react";
import { Text } from "@react-three/drei";

function Points({ frequency, period, wCount, wSep, trig }) {
  const imgTex = useLoader(TextureLoader, circleImg);
  const [amplitude, setAmplitude] = useState(5);
  const bufferRef = useRef();

  let t = period ?? 0;
  let f = frequency ?? 0.001;
  let a = amplitude ?? 5;
  const graph = useCallback(
    (x, z) => {
      return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
    },
    [t, f, a]
  );

  const waveCount = wCount ?? 112;
  const waveSep = wSep ?? 0.5;

  let wave = useMemo(() => {
    let wave = [];
    for (let xi = 0; xi < waveCount; xi++) {
      for (let zi = 0; zi < waveCount; zi++) {
        let x = xi - waveCount / 2;
        let z;
        if (trig === "cos") {
          z = waveSep * (zi - waveCount / 2) * Math.cos(f * (x ** 2 + t));
        } else if (trig === "tan") {
          z = waveSep * (zi - waveCount / 2) * Math.tan(f * (x ** 2 + t));
        } else {
          z = waveSep * (zi - waveCount / 2) * Math.sin(f * (x ** 2 + t));
        }
        let y = graph(x, z);
        wave.push(x, y, z);
      }
    }
    return new Float32Array(wave);
  }, [graph, waveCount, waveSep, f, t, trig]);

  let count = 1;
  useFrame(() => {
    t += 15;
    const positions = bufferRef.current.array;
    let i = 0;
    for (let xi = 0; xi < waveCount; xi++) {
      for (let zi = 0; zi < waveCount; zi++) {
        let x = waveSep * (xi - waveCount / 2);
        let z = waveSep * (zi - waveCount / 2);
        positions[i + 1] = graph(x, z);
        i += 3;
      }
    }
    bufferRef.current.needsUpdate = true;

    if (count === 1) {
      console.log("bufferRef", bufferRef);
      count++;
    }
  });

  // const ref = useRef();
  // useFrame(({ camera }) => {
  //   ref.current.quaternion.copy(camera.quaternion);
  // });

  return (
    <>
      <Html>
        <button onClick={() => setAmplitude(10)}>change amplitude </button>
      </Html>

      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            ref={bufferRef}
            attachObject={["attributes", "position"]}
            array={wave}
            count={wave.length / 3}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          attach="material"
          map={imgTex}
          color={0x00faff}
          size={0.5}
          sizeAttenuation
          transparent={false}
          alphaTest={0.5}
          opacity={1.0}
        />
      </points>
    </>
  );
}

export default React.memo(Points);
