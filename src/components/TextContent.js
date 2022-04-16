

import { Color, Vector3, Spherical } from "three";
import {useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import { Text } from "@react-three/drei";




function TextContent({ hideHtml, setHideHtml }) {
  const ref = useRef();
  useFrame(({ camera }) => {
    ref.current.quaternion.copy(camera.quaternion);
  });

  return (
    <Text
    ref={ref}
    scale={[10, 10, 10]}
    color="White"
    position={[10, 20, 0]}
    onClick={() => setHideHtml(!hideHtml)}
  >
Hello World
  </Text>

  );
}

export default TextContent;




// import {useFrame } from '@react-three/fiber';
// import { useRef} from 'react';

// import { Text } from "@react-three/drei";

// function TextContent() {
//   const ref = useRef();
//   useFrame(({ camera }) => {
//     ref.current.quaternion.copy(camera.quaternion);
//   });

//   return (
//     <Text
//     ref={ref}
//     scale={[10, 10, 10]}
//     color="White"
//     position={[10, 20, 0]}
//   >
//     > THIS IS A LONG PARAgraph FULL  OF RANDOM BULLSHIT OT TEST OUT HOW LONG THE ASDF ASDF ASF ASLKALSKFJLJ
//   </Text>
//   );
// }

// export default TextContent