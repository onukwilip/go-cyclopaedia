import { CheckboxProps } from "semantic-ui-react";
import React from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Group, Object3D } from "three";

export type checkBoxType = (
  event: React.FormEvent<HTMLInputElement>,
  data: CheckboxProps
) => void;

export class Planetmenu {
  constructor(
    public name: string,
    public img: string,
    public refObj: {
      ref: React.RefObject<Group>;
      objRef: React.RefObject<Object3D<Event>>;
    }
  ) {}
}

export type SpaceRefsType = {
  cameraRef: React.MutableRefObject<undefined>;
  orbitRef: React.RefObject<OrbitControlsImpl>;
  sunRef: React.RefObject<Group>;
  mecuryRef: React.RefObject<Group>;
  mecuryObjRef: React.RefObject<Object3D<Event>>;
  venusRef: React.RefObject<Group>;
  venusObjRef: React.RefObject<Object3D<Event>>;
  earthRef: React.RefObject<Group>;
  earthObjRef: React.RefObject<Object3D<Event>>;
  planetRef: React.RefObject<Group>;
  planetObjRef: React.RefObject<Object3D<Event>>;
  marsRef: React.RefObject<Group>;
  marsObjRef: React.RefObject<Object3D<Event>>;
  planetShipRef: React.RefObject<Group>;
  planetShipObjRef: React.RefObject<Object3D<Event>>;
  saturnRef: React.RefObject<Group>;
  saturnObjRef: React.RefObject<Object3D<Event>>;
  jupiterRef: React.RefObject<Group>;
  jupiterObjRef: React.RefObject<Object3D<Event>>;
  neptuneRef: React.RefObject<Group>;
  neptuneObjRef: React.RefObject<Object3D<Event>>;
  uranusRef: React.RefObject<Group>;
  uranusObjRef: React.RefObject<Object3D<Event>>;
  starsRef: React.RefObject<Object3D<Event>>;
  milkyWayRef: React.RefObject<Group>;
};
