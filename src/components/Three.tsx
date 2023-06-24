import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { gsap } from "gsap";
import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export const toRadians = (deg: number) => (Math.PI / 180) * deg;

const Three = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const orbitRef = useRef<OrbitControlsImpl>(null);
  const sphereRef =
    useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[]
      >
    >(null);
  const ringRef =
    useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[]
      >
    >(null);

  useFrame((state, delta) => {
    const {
      mouse: { x, y },
    } = state;
    orbitRef.current?.setAzimuthalAngle(-x * toRadians(90));
    orbitRef.current?.setPolarAngle((y + 1) * toRadians(60));

    if (sphereRef.current && ringRef.current) {
      sphereRef.current.rotateZ(0.01);
      ringRef.current.rotateZ(0.01);
    }

    setMousePosition({ x, y });

    orbitRef.current?.update();
  });

  const moveSphere = (event: KeyboardEvent) => {
    if (!sphereRef.current) return;
    const prevX = () => sphereRef.current?.position.x || 0;
    const prevZ = () => sphereRef.current?.position.z || 0;

    if (event.keyCode === 37) {
      // Left arrow key pressed
      gsap.to(sphereRef.current.position, {
        x: prevX() - 0.5,
        duration: 2,
      });
    } else if (event.keyCode === 38) {
      // Up arrow key pressed
      gsap.to(sphereRef.current.position, {
        z: prevZ() - 0.5,
        duration: 2,
      });
    } else if (event.keyCode === 39) {
      // Right arrow key pressed
      gsap.to(sphereRef.current.position, {
        x: prevX() + 0.5,
        duration: 2,
      });
    } else if (event.keyCode === 40) {
      // Down arrow key pressed
      gsap.to(sphereRef.current.position, {
        z: prevZ() + 0.5,
        duration: 2,
      });
    }

    orbitRef.current?.update();
  };

  const bounceSphere = () => {
    if (!sphereRef.current) return;
    const timeline = gsap.timeline();

    timeline.to(sphereRef.current.position, {
      y: 2,
      duration: 0.2,
    });

    timeline.to(sphereRef.current.position, {
      y: 1,
      duration: 0.7,
      delay: ">",
      ease: "bounce",
    });
  };

  const throwSphere = () => {
    if (!sphereRef.current) return;
    const timeline = gsap.timeline();

    timeline.to(sphereRef.current.position, {
      x: mousePosition.x * 3,
      duration: 1,
    });

    timeline.to(sphereRef.current.position, {
      y: 2,
      duration: 0.2,
      delay: "<",
    });

    timeline.to(sphereRef.current.position, {
      y: 1,
      duration: 0.7,
      delay: ">",
      ease: "bounce",
    });
  };

  useEffect(() => {
    console.log("ORBIT", orbitRef.current);
    console.log("SPHERE", sphereRef.current);
    console.log("RING", ringRef.current);

    document.addEventListener("keydown", moveSphere);

    return () => {
      document.removeEventListener("keydown", moveSphere);
    };
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.5, 6]} />
      <OrbitControls
        ref={orbitRef}
        maxPolarAngle={toRadians(80)}
        minPolarAngle={toRadians(45)}
      />
      {/* SPHERE */}
      <mesh
        position={[0, 1, 0]}
        ref={sphereRef}
        castShadow
        onClick={bounceSphere}
        onDoubleClick={throwSphere}
      >
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial color={"white"} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* RING */}
      <mesh
        rotation={[toRadians(90), 0, 0]}
        position={[0, 1, 0]}
        scale={0.2}
        ref={ringRef}
        receiveShadow
      >
        <ringGeometry args={[7, 9, 50, 50, 30, 30]} />
        <meshStandardMaterial
          color="lightgreen"
          side={THREE.DoubleSide}
          metalness={5}
          roughness={0.5}
        />
      </mesh>
      {/* PLANE */}
      <mesh rotation={[toRadians(-90), 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100, 20, 20]} />
        <meshPhongMaterial color="green" side={THREE.DoubleSide} />
      </mesh>
      <ambientLight args={["white", 0.2]} />

      <spotLight
        position={[1, 1, 3]}
        args={["white", 1.5, 17, toRadians(50), 1]}
        castShadow
      />
      {/* ENVIRONMENT */}
      <Environment background>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial side={THREE.BackSide} color="#003d00" />
        </mesh>
        {/* <ambientLight args={["white", 0.2]} /> */}
      </Environment>
    </>
  );
};

export default Three;
