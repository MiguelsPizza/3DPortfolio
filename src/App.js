import './App.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { extend} from '@react-three/fiber';
import AnimationCanvas from './components/AnimationCanvas.js'
import { Suspense, useState} from 'react';
extend({OrbitControls})



function App() {
// const props = {xPos, setXPos, yPos, setYPos, zPos, setZPos}

  return (
    <div className="anim">
      <Suspense fallback={<div>Loading...</div>}>
        <AnimationCanvas  />
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

