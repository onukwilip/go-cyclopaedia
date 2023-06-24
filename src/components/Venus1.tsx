/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 scene.gltf -T --shadows
Author: uperesito (https://sketchfab.com/uperesito)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/mapa-topografico-de-venus-be3b7a53a2bd4a8c92edf2fcd9dfe0aa
Title: Mapa Topografico De Venus
*/

import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import { GroupProps } from "react-three-fiber";

export const Venus1 = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF(
    "/models/mapa_topografico_de_venus/scene-transformed.glb"
  ) as any;
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Esfera_Mat_0.geometry}
        material={materials.material}
      />
    </group>
  );
});

useGLTF.preload("/models/mapa_topografico_de_venus/scene-transformed.glb");