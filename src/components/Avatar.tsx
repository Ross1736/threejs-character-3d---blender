import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import { type Group, type AnimationClip, type SkinnedMesh } from "three";
import { useControllerStore } from "../store/controller.store";
import { useControls } from "leva";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

function Avatar() {
  const groupRef = useRef<Group>(null);

  const { nodes, materials } = useGLTF("/glb/chica.glb");

  const body = nodes.Cn02_Body as SkinnedMesh | undefined;

  const { animations: idleAnimations } = useFBX("/fbx/Breathing Idle.fbx");
  const { animations: dismissingAnimations } = useFBX(
    "/fbx/Dismissing Gesture.fbx"
  );
  // const { animations: talkingAnimations } = useFBX("/fbx/Talking.fbx");

  const listAnimations = useMemo<AnimationClip[]>(() => {
    const list: AnimationClip[] = [];
    if (idleAnimations && idleAnimations[0]) {
      const c = idleAnimations[0].clone();
      c.name = "idle";
      list.push(c);
    }
    if (dismissingAnimations && dismissingAnimations[0]) {
      const c = dismissingAnimations[0].clone();
      c.name = "dismissing";
      list.push(c);
    }
    return list;
  }, [idleAnimations, dismissingAnimations]);

  const { actions } = useAnimations(listAnimations, groupRef);

  const { activeAnimation } = useControllerStore();

  console.log(nodes);
  console.log(materials);
  console.log(listAnimations);

  useEffect(() => {
    actions[activeAnimation]?.reset().fadeIn(0.5).play();
    return () => {
      actions[activeAnimation]?.fadeOut(0.5);
    };
  }, [activeAnimation, actions]);

  const { playAudio, script } = useControls({
    playAudio: false,
    script: {
      value: "voz",
      options: ["voz"],
    },
  });

  const audio = useMemo(() => new Audio(`/audios/${script}.wav`), [script]);
  const jsonFile = useLoader(THREE.FileLoader, `/audios/${script}.wav.json`);
  const lipsync = JSON.parse(jsonFile);

  useEffect(() => {
    if (playAudio) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playAudio, audio, script]);

  // useFrame(() => {
  //   const currentTime = audio.currentTime;

  //   Object.values(corresponding).forEach((value) => {
  //     console.log(value);
  //   });
  // });

  return (
    <group dispose={null} ref={groupRef} rotation-x={Math.PI}>
      <primitive object={nodes.Armature} />
      {body?.skeleton && (
        <skinnedMesh
          geometry={body.geometry}
          material={materials.Cn02_Body}
          skeleton={body.skeleton}
        />
      )}
    </group>
  );
}

export default Avatar;

useGLTF.preload("/glb/chica.glb");
