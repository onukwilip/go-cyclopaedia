/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 scene.gltf -T --shadows
Author: Tycho Magnetic Anomaly (https://sketchfab.com/Tycho_Magnetic_Anomaly)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/ringed-world-6fdfb3c84fb348188d6968092be1b1b5
Title: Ringed World
*/

import React, { forwardRef, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group } from "three";
import { GroupProps } from "react-three-fiber";

export const Saturn = forwardRef<Group, GroupProps>((props, ref) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/ringed_world/scene-transformed.glb"
  ) as any;
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="GLTF_SceneRootNode">
          <group name="Torus_0">
            <mesh
              name="Object_4"
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.material}
            />
          </group>
          <group name="Torus001_1">
            <mesh
              name="Object_7"
              castShadow
              receiveShadow
              geometry={nodes.Object_7.geometry}
              material={materials.material_1}
            />
          </group>
          <group name="Torus002_2">
            <mesh
              name="Object_10"
              castShadow
              receiveShadow
              geometry={nodes.Object_10.geometry}
              material={materials.material_1}
            />
          </group>
          <group name="Torus003_3" position={[0, 0.903, 0.159]} scale={0.162}>
            <mesh
              name="Object_13"
              castShadow
              receiveShadow
              geometry={nodes.Object_13.geometry}
              material={materials.material_2}
            />
          </group>
          <group name="Torus004_4" position={[0, 0.903, 0.159]} scale={0.162}>
            <mesh
              name="Object_15"
              castShadow
              receiveShadow
              geometry={nodes.Object_15.geometry}
              material={materials.material_2}
            />
          </group>
          <group name="Torus005_5" position={[0, -0.903, -0.159]} scale={0.162}>
            <mesh
              name="Object_17"
              castShadow
              receiveShadow
              geometry={nodes.Object_17.geometry}
              material={materials.material_2}
            />
          </group>
          <group name="Torus006_6" position={[0, -0.903, -0.159]} scale={0.162}>
            <mesh
              name="Object_19"
              castShadow
              receiveShadow
              geometry={nodes.Object_19.geometry}
              material={materials.material_2}
            />
          </group>
          <group name="Sphere004_14" rotation={[0, -0.017, 0]} scale={1.005}>
            <mesh
              name="Object_28"
              castShadow
              receiveShadow
              geometry={nodes.Object_28.geometry}
              material={materials.material_6}
            />
          </group>
          <group name="Sphere005_15" rotation={[0, -0.004, 0]} scale={1.005}>
            <mesh
              name="Object_30"
              castShadow
              receiveShadow
              geometry={nodes.Object_30.geometry}
              material={materials.material_6}
            />
          </group>
          <group name="Torus007_17">
            <mesh
              name="Object_32"
              castShadow
              receiveShadow
              geometry={nodes.Object_32.geometry}
              material={materials.material}
            />
          </group>
        </group>
        <mesh
          name="Object_22"
          castShadow
          receiveShadow
          geometry={nodes.Object_22.geometry}
          material={materials.material_3}
          rotation={[0.175, 0, 0]}
        />
        <mesh
          name="Object_24"
          castShadow
          receiveShadow
          geometry={nodes.Object_24.geometry}
          material={materials.material_4}
          rotation={[0.175, 0, 0]}
          scale={1.01}
        />
        <mesh
          name="Object_26"
          castShadow
          receiveShadow
          geometry={nodes.Object_26.geometry}
          material={materials.material_5}
          position={[5.092, 2.405, -5.037]}
          scale={0.1}
        />
      </group>
    </group>
  );
});

useGLTF.preload("/models/ringed_world/scene-transformed.glb");