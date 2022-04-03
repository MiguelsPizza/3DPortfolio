import './App.css';
import {Color, Vector3, Spherical, TextureLoader} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import circleImg from './assets/circle.png';
import { Suspense, useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { Text } from '@react-three/drei'
extend({OrbitControls})


function Word({ children, ...props }) {
  const color = new Color()
  const fontProps = { font: '/Inter-Bold.woff', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const over = (e) => (e.stopPropagation(), setHovered(true))
  const out = () => setHovered(false)
  // Change the mouse cursor on hover
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer'
    return () => (document.body.style.cursor = 'auto')
  }, [hovered])
  // Tie component to the render-loop
  useFrame(({ camera }) => {
    // Make text face the camera
    ref.current.quaternion.copy(camera.quaternion)
    // Animate font color
    ref.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1)
  })
  return <Text ref={ref} onPointerOver={over} onPointerOut={out} {...props} {...fontProps} children={children} />
}

const skills = ['react', 'firebase', 'javascript', 'python', 'AWS', 'nodejs', 'html', 'css', 'sass', 'git', 'jquery', 'mongodb', 'mysql', 'sql', 'react-native', 'react-redux', 'redux', 'react-router', 'react-router-dom', 'react-hooks', 'react-transition-group', 'react-spring', 'react-three', 'react-three-fiber',  'three.js',]

function Cloud({ count = 4, radius = 20 }) {
  const words = useMemo(() => {
    const temp = []
    const spherical = new Spherical()
    const phiSpan = Math.PI / (count + 1)
    const thetaSpan = (Math.PI * 2) / count
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++) temp.push([new Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), skills[Math.floor(Math.random() * (skills.length ))]])
    return temp
  }, [count, radius])
  return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)
}

function CameraControls(){
  const {
    camera,
    gl: {domElement}
  } = useThree();

  const controlsRef = useRef();
  useFrame(() => controlsRef.current.update())

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, domElement]}
      autoRotate
      autoRotateSpeed={-0.0}
    />
  );
}

function Points({setToggle, toggle}) {
  const imgTex = useLoader(TextureLoader, circleImg);
  const bufferRef = useRef();


  let t = 0;
  let f = 0.001;
  let a = 5;
  const graph = useCallback((x, z) => {
    return Math.sin(f * (x ** 2 + z ** 2+ t)) * a;
  }, [t, f, a])



  const waveCount = 112
  const waveSep = .5

  let wave = useMemo(() => {
    let wave = []
    // let circleCount = 1
    for (let xi = 0; xi < waveCount; xi++) {
      // let currentCount = 0
      for (let zi = 0; zi < waveCount; zi++) {

        // let x = (xi - count / 2)* Math.random() * sep;
        // // let x = Math.sqrt(Math.abs((count/2)^3 - xi^2)) * sep
        // let z = (zi - count / 2) * Math.random() * sep;
        // // let z = Math.sqrt(Math.abs((count/2)^3 - zi^2)) * sep
        let x =  (xi - waveCount / 2)
        let z = waveSep * (zi - waveCount / 2) * Math.tan(f * (x ** 2 + t));
        // let z = waveSep * (zi - waveCount / 2);
        let y = graph(x, z);

        wave.push(x, y, z);
      }
    }
    return new Float32Array(wave);
  }, [ toggle, graph])

  useFrame(() => {
    t += 15

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
  })
  const ref = useRef();
  useFrame(({ camera }) => {
    // Make text face the camera
    ref.current.quaternion.copy(camera.quaternion)
    // Animate font color
  })


  return (
    <>
            <Text
        ref={ref}
        scale={[200, 200, 200]}
        color="White" // default
        position={[10, 20, 0]}
      onClick={() => setToggle(!toggle)}>
      >
        HELLO WORLD
      </Text>
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={bufferRef}
          attachObject={['attributes', 'position']}
          array={wave}
          count={wave.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        attach="material"
        map={imgTex}
        color={0x00fAFF}
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

function AnimationCanvas() {

  const [toggle, setToggle] = useState(false);
  return (
    <Canvas
      camera={{ position: [100, 70, 100], fov: 50 }}
    >
      <Suspense fallback={null}>
      <pointLight position={[5, 5, 5]} />

        <Points setToggle={setToggle} toggle={toggle} />
        <Cloud count={8} radius={20} />

      </Suspense>
      <CameraControls/>
      </Canvas>
  );
}


function App() {
  return (
    <div className="anim">
      <Suspense fallback={<div>Loading...</div>}>
        <AnimationCanvas />
      </Suspense>
    </div>
  );
}

export default App;



// const count = 10
// const sep = 20


// let positions = useMemo(() => {

//   let positions = []
//   // let circleCount = 1
//   for (let xi = 0; xi < count; xi++) {
//     // let currentCount = 0
//     for (let zi = 0; zi < count; zi++) {
//       for(let yi = 0; yi < count; yi++){
//       let x = (xi - count / 2)* Math.random() * sep;
//       // let x = Math.sqrt(Math.abs((count/2)^3 - xi^2)) * sep
//       let z = (zi - count / 2) * Math.random() * sep;
//       let y =  (yi - count / 2)* Math.random() * sep;
//       // let z = Math.sqrt(Math.abs((count/2)^3 - zi^2)) * sep
//       // let x = sep * (xi - count / 2) * Math.PI;
//       // let z = sep * (zi - count / 2) * Math.sin(f * (x ** 2 + t));
//       // let y = graph(x, z);

//       positions.push(x, y, z);
//       }
//       // currentCount++
//     }
//     // circleCount++
//   }

//   return new Float32Array(positions);
// }, [toggle])