
import { Color, Vector3, Spherical } from "three";
import {useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import { Text } from "@react-three/drei";


function Word({ children, ...props }) {
  const color = new Color();
  const fontProps = {
    font: "/Inter-Bold.woff",
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);
  useFrame(({ camera }) => {
    ref.current.quaternion.copy(camera.quaternion);
    ref.current.material.color.lerp(
      color.set(hovered ? "#fa2720" : "white"),
      0.1
    );
  });
  return (
    <Text
      ref={ref}
      onPointerOver={over}
      onPointerOut={out}
      {...props}
      {...fontProps}
      children={children}
    />
  );
}

const skills = [
  "react",
  "firebase",
  "javascript",
  "python",
  "AWS",
  "nodejs",
  "html",
  "css",
  "sass",
  "git",
  "jquery",
  "mongodb",
  "mysql",
  "sql",
  "react-native",
  "react-redux",
  "redux",
  "react-router",
  "react-router-dom",
  "react-hooks",
  "react-transition-group",
  "react-spring",
  "react-three",
  "react-three-fiber",
  "three.js",
];

function Cloud({ count = 4, radius = 20 }) {
  const words = useMemo(() => {
    const temp = [];
    const spherical = new Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    for (let i = 1; i < count + 1; i++) {
      for (let j = 0; j < count; j++) {
        temp.push([
          new Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j)
          ),
          skills[Math.floor(Math.random() * skills.length)],
        ]);
      }
    }
    return temp;
  }, [count, radius]);
  return words.map(([pos, word], index) => (
    <Word key={index} position={pos} children={word} />
  ));
}

export default Cloud;
