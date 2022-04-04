

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {extend, useFrame, useThree } from '@react-three/fiber';
import {useRef} from 'react';

extend({OrbitControls})

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
      autoRotateSpeed={-0.8}
    />
  );
}

export default CameraControls