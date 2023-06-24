import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import React, { forwardRef, useEffect, useContext, FC } from "react";
import { Group } from "three";
import { GroupProps, useFrame } from "react-three-fiber";
import { Sun } from "./Sun";
import { Jupiter } from "./Jupiter";
import { Venus1 } from "./Venus1";
import { Mars } from "./Mars";
import { Neptune } from "./Neptune";
import { Planet } from "./Planet";
import { PlanetShip } from "./PlanetShip";
import { Saturn } from "./Saturn_cartoon";
import { StyledPlanet } from "./Styled_Planet";
import { Uranus } from "./Uranus";
import { Mecury } from "./Mecury";
import { MilkyWay } from "./Milky_way";
import { Context } from "../context/Context";
import { SpaceRefsType } from "../types";

const MecuryMesh = forwardRef<Group, GroupProps>((props, ref) => {
  return (
    // <mesh position={[-1, 0.5, 0]} ref={ref} {...props}>
    //   <sphereGeometry args={[0.01, 30, 30]} />
    //   <meshStandardMaterial color={"orange"} side={THREE.DoubleSide} />
    // </mesh>
    <Mecury position={[-1.8, 0.5, 0]} ref={ref} {...props} scale={0.029} />
  );
});

const VenusMesh = forwardRef<Group, GroupProps>((props, ref) => {
  return (
    // <mesh position={[-2, -0.5, 0]} ref={ref} {...props}>
    //   <sphereGeometry args={[0.03, 30, 30]} />
    //   <meshStandardMaterial color={"red"} side={THREE.DoubleSide} />
    // </mesh>
    <Venus1 position={[-2, -0.5, 0]} ref={ref} scale={0.00003} {...props} />
  );
});

const EarthMesh = forwardRef<Group, GroupProps>((props, ref) => {
  return (
    // <mesh position={[-3, 0.3, 0.1]} ref={ref} {...props}>
    //   <sphereGeometry args={[0.05, 30, 30]} />
    //   <meshStandardMaterial color={"lightblue"} side={THREE.DoubleSide} />
    // </mesh>
    <StyledPlanet position={[-3, 0.3, 0.1]} ref={ref} {...props} scale={0.08} />
  );
});

const PlanetMesh = forwardRef<Group, GroupProps>((props, ref) => {
  return (
    <Planet position={[-3.5, 0.2, -0.4]} ref={ref} {...props} scale={0.0008} />
  );
});

const MarsMesh = forwardRef<Group, GroupProps>((props, ref) => {
  return (
    // <mesh position={[-4, 0.1, 0.1]} ref={ref} {...props}>
    //   <sphereGeometry args={[0.04, 30, 30]} />
    //   <meshStandardMaterial color={"#800000"} side={THREE.DoubleSide} />
    // </mesh>
    <Mars position={[-4, 0.1, 0.1]} ref={ref} {...props} scale={0.005} />
  );
});

const PlanetShipMesh = forwardRef<Group, GroupProps>((props, ref) => {
  return (
    <PlanetShip
      position={[-4.5, -0.1, -0.1]}
      ref={ref}
      {...props}
      scale={0.00001}
    />
  );
});

const SaturnMesh = forwardRef<Group, GroupProps>((props, ref) => {
  return (
    // <group ref={ref} {...props} position={[-5.7, 0.17, 0.15]}>
    //   <mesh>
    //     <sphereGeometry args={[0.07, 30, 30]} />
    //     <meshStandardMaterial color={"#c9aa89"} side={THREE.DoubleSide} />
    //   </mesh>

    //   <mesh
    //     // position={[-5.7, 0.17, 0.15]}
    //     rotation={[toRadians(90), 0, toRadians(45)]}
    //   >
    //     <ringGeometry args={[0.09, 0.16, 30, 30]} />
    //     <meshStandardMaterial color={"#766c69"} side={THREE.DoubleSide} />
    //   </mesh>
    // </group>
    <Saturn {...props} position={[-5.7, 0.17, 0.15]} ref={ref} scale={0.079} />
  );
});

const JupiterMesh = forwardRef<Group, GroupProps>((props, ref) => {
  return (
    // <mesh position={[-6.1, 0.5, 0.1]} ref={ref} {...props}>
    //   <sphereGeometry args={[0.08, 30, 30]} />
    //   <meshStandardMaterial color={"#bf7f3e"} side={THREE.DoubleSide} />
    // </mesh>
    <Jupiter position={[-6.1, 0.5, 0.1]} ref={ref} scale={0.03} />
  );
});

const NeptuneMesh = forwardRef<Group, GroupProps>((props, ref) => {
  return (
    // <mesh position={[-6.7, 0.2, -0.1]} ref={ref} {...props}>
    //   <sphereGeometry args={[0.05, 30, 30]} />
    //   <meshStandardMaterial color={"darkblue"} side={THREE.DoubleSide} />
    // </mesh>
    <Neptune position={[-6.7, 0.2, -0.1]} ref={ref} scale={0.06} {...props} />
  );
});

const UranusMesh = forwardRef<Group, GroupProps>((props, ref) => {
  return (
    // <mesh position={[-7.0, 0.28, -0.15]} ref={ref} {...props}>
    //   <sphereGeometry args={[0.046, 30, 30]} />
    //   <meshStandardMaterial color={"#b9dee1"} side={THREE.DoubleSide} />
    // </mesh>
    <Uranus position={[-7.0, 0.28, -0.15]} ref={ref} {...props} scale={0.12} />
  );
});

const SunMesh = forwardRef<Group, GroupProps>((props, ref) => {
  return (
    // <mesh ref={ref} position={[0, 0, 0]} {...props}>
    //   <sphereGeometry args={[1, 30, 30]} />
    //   <meshBasicMaterial color={"yellow"} side={THREE.DoubleSide} />
    //   <pointLight args={[0xffffff, 1, 100]} position={[0, 0, 0]} />
    //   {props.children}
    // </mesh>
    <>
      <Sun ref={ref} position={[0, 0, 0]} {...props} scale={0.15} />
      <pointLight args={[0xffffff, 1, 100]} position={[0, 0, 0]} />
    </>
  );
});

const SpaceScene: FC<{ refs: SpaceRefsType }> = ({
  refs: {
    cameraRef,
    orbitRef,
    sunRef,
    mecuryRef,
    mecuryObjRef,
    venusRef,
    venusObjRef,
    earthRef,
    earthObjRef,
    planetRef,
    planetObjRef,
    marsRef,
    marsObjRef,
    planetShipRef,
    planetShipObjRef,
    saturnRef,
    saturnObjRef,
    jupiterRef,
    jupiterObjRef,
    neptuneRef,
    neptuneObjRef,
    uranusRef,
    uranusObjRef,
    starsRef,
    milkyWayRef,
  },
}) => {
  const context = useContext(Context);

  useFrame((state) => {
    if (context.rotate) rotate();
    else killRotate();

    if (context.revolve) revolve();
    else killRevolve();

    // if (orbitRef.current)
    //   orbitRef.current.target =
    //     mecuryRef.current?.position || new THREE.Vector3(0, 0, 0);

    orbitRef.current?.update();
  });

  const revolve = () => {
    mecuryObjRef.current?.rotateZ(0.009);
    venusObjRef.current?.rotateZ(0.008);
    earthObjRef.current?.rotateZ(0.007);
    planetObjRef.current?.rotateZ(0.0057);
    marsObjRef.current?.rotateZ(0.006);
    planetShipObjRef.current?.rotateZ(0.0062);
    saturnObjRef.current?.rotateZ(0.005);
    jupiterObjRef.current?.rotateZ(0.004);
    neptuneObjRef.current?.rotateZ(0.003);
    uranusObjRef.current?.rotateZ(0.004);
  };
  const killRevolve = () => {
    mecuryObjRef.current?.rotateZ(0);
    venusObjRef.current?.rotateZ(0);
    earthObjRef.current?.rotateZ(0);
    planetObjRef.current?.rotateZ(0);
    marsObjRef.current?.rotateZ(0);
    planetShipObjRef.current?.rotateZ(0);
    saturnObjRef.current?.rotateZ(0);
    jupiterObjRef.current?.rotateZ(0);
    neptuneObjRef.current?.rotateZ(0);
    uranusObjRef.current?.rotateZ(0);
  };
  const rotate = () => {
    sunRef.current?.rotateZ(0.01);
    mecuryRef.current?.rotateZ(0.01);
    venusRef.current?.rotateZ(0.01);
    earthRef.current?.rotateZ(0.01);
    planetRef.current?.rotateZ(0.01);
    marsRef.current?.rotateZ(0.01);
    planetShipRef.current?.rotateZ(0.01);
    planetShipRef.current?.rotateY(0.01);
    planetShipRef.current?.rotateX(0.01);
    saturnRef.current?.rotateY(0.01);
    jupiterRef.current?.rotateY(0.01);
    neptuneRef.current?.rotateZ(0.01);
    uranusRef.current?.rotateZ(0.01);

    // STARS
    starsRef.current?.rotateZ(0.001);
    starsRef.current?.rotateY(0.001);
    milkyWayRef.current?.rotateX(0.001);
  };
  const killRotate = () => {
    sunRef.current?.rotateZ(0);
    mecuryRef.current?.rotateZ(0);
    venusRef.current?.rotateZ(0);
    earthRef.current?.rotateZ(0);
    planetRef.current?.rotateZ(0);
    marsRef.current?.rotateZ(0);
    planetShipRef.current?.rotateZ(0);
    planetShipRef.current?.rotateY(0);
    planetShipRef.current?.rotateX(0);
    saturnRef.current?.rotateY(0);
    jupiterRef.current?.rotateY(0);
    neptuneRef.current?.rotateZ(0);
    uranusRef.current?.rotateZ(0);

    // STARS
    starsRef.current?.rotateZ(0);
    starsRef.current?.rotateY(0);
    milkyWayRef.current?.rotateX(0);
  };

  useEffect(() => {
    console.log(orbitRef.current);
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 2]} ref={cameraRef} />
      <OrbitControls ref={orbitRef} maxZoom={0.1} minZoom={1} />
      <Stars ref={starsRef} radius={150} />
      <MilkyWay
        ref={milkyWayRef}
        scale={100}
        position={[-100, -50, 50]}
      ></MilkyWay>
      <SunMesh ref={sunRef}></SunMesh>
      <object3D ref={mecuryObjRef}>
        <MecuryMesh ref={mecuryRef} />
      </object3D>
      <object3D ref={venusObjRef}>
        <VenusMesh ref={venusRef} />
      </object3D>
      <object3D ref={earthObjRef}>
        <EarthMesh ref={earthRef} />
      </object3D>
      <object3D ref={planetObjRef}>
        <PlanetMesh ref={planetRef} />
      </object3D>
      <object3D ref={marsObjRef}>
        <MarsMesh ref={marsRef} />
      </object3D>
      <object3D ref={planetShipObjRef}>
        <PlanetShipMesh ref={planetShipRef} />
      </object3D>
      <object3D ref={saturnObjRef}>
        <SaturnMesh ref={saturnRef} />
      </object3D>
      <object3D ref={jupiterObjRef}>
        <JupiterMesh ref={jupiterRef} />
      </object3D>
      <object3D ref={neptuneObjRef}>
        <NeptuneMesh ref={neptuneRef} />
      </object3D>
      <object3D ref={uranusObjRef}>
        <UranusMesh ref={uranusRef} />
      </object3D>

      <ambientLight args={[0xffffff, 0.1]} />
    </>
  );
};

export default SpaceScene;

/* SELECT upper(isnull(C.Surname,'')+ isnull(C.Othernames,'')) as Name, upper(C.Address)as Address, 
T.MeterNo, R.TariffCode,T.AccountNo,T.Units,T.CostOfUnits, R.OldTariffCode,T.VAT,T.Amount,T.OperatorID,T.TransactionDateTime,T.transref,T.BUID,
C.BookNo
FROM Transactions T
JOIN Meters M ON T.MeterNo = M.MeterNo
JOIN TARIFF R ON M.Tariff = R.TariffID
JOIN Customers C ON T.MeterNo = C.MeterNo
WHERE TransactionDateTime between @startDate and @EndDate */

/*

SELECT top(10) upper(isnull(C.Surname,'')+ isnull(C.Othernames,'')) as Name, upper(C.Address)as Address, 
T.MeterNo, R.TariffCode,T.AccountNo,T.Units,T.CostOfUnits, R.OldTariffCode,T.VAT,T.Amount,T.OperatorID,T.TransactionDateTime,T.transref,T.BUID,
C.BookNo,
case when (T.Amount > 0) then T.Amount - (T.CostOfUnits + T.VAT) else 0 end as SubAccountAmount
FROM Transactions T
JOIN Meters M ON T.MeterNo = M.MeterNo
JOIN TARIFF R ON M.Tariff = R.TariffID
JOIN Customers C ON T.MeterNo = C.MeterNo
WHERE TransactionDateTime between @startDate and @EndDate

*/
