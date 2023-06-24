/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 scene.gltf -T --shadows
Author: uperesito (https://sketchfab.com/uperesito)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/venus-v11-99be254b68da48d092c3b8917020c67a
Title: Venus v1.1
*/

import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "react-three-fiber";
import { Group } from "three";

export const Mecury = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF(
    "/models/venus_v1.1/scene-transformed.glb"
  ) as any;
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.material}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
});

useGLTF.preload("/models/venus_v1.1/scene-transformed.glb");
