import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useCallback, useRef } from "react";
import Points from "./Points.js";
import Cloud from "./Cloud.js";
import CameraControls from "./CameraControls.js";
import {Stars } from "@react-three/drei";



function AnimationCanvas() {
  const [frequency, setFrequency] = useState(0.001);
  const [period, setPeriod] = useState(0);
  const [waveCount, setWaveCount] = useState(112);
  const [waveSep, setWaveSep] = useState(0.5);
  const [toggle, setToggle] = useState(true);
  const [trig, setTrig] = useState("sin");
  const [xPos, setXPos] = useState(100);
  const [yPos, setYPos] = useState(20);
  const [zPos, setZPos] = useState(20);

  const [buttonText, setButtonText] = useState("plz click me");

  //const[toggle, setToggle] = useState(true)

  useState(() => {
    return () => {
      alert("unmounted");
    };
  }, [toggle]);

  const props = { frequency, period, waveCount, waveSep, trig };

  // const goToSkills = useCallback(() =>{
  //   let counter = 1
  //   // for(let i = 0; i < xPos; i++){
  //   //   setTimeout(()=>{

  //   //   }, .1)
  // //}//
  //   setXPos(0)
  //   setYPos(0)
  //   setZPos(0)
  //     console.log('xPos', xPos)

  // }, [xPos])
  const cameraRef = useRef();

  const goToSkills = () => {
    const camera = cameraRef.current;

    console.log("camerca", cameraRef.current);
    // cameraRef.current.camera.position.set(100, 100, 100);
    // camera.lookAt(0, 0, 0);

    // target.set(100, 100, 0);
  };
  //setToggle={setToggle} toggle={toggle}
  // useFrame(() => cameraRef.current.camera.position.set(100, 100, 100))
  return (
    <>
      <button onClick={() => goToSkills()}>test</button>
      <Canvas
        ref={cameraRef}
        camera={{ position: [xPos, yPos, zPos], fov: 50 }}
      >
<Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <Suspense fallback={null}>
          {/* <pointLight position={[5, 5, 5]} /> */}



          <Points {...props} />
          {/* <Cloud count={8} radius={20} /> */}

        </Suspense>
        <CameraControls />
      </Canvas>
    </>
  );
}

export default AnimationCanvas;
