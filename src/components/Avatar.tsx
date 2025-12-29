import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import { type Group, type AnimationClip, type SkinnedMesh } from "three";
import { useControllerStore } from "../store/controller.store";
import { useControls } from "leva";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { weightEnvelope } from "../utils/lipsync";

type RhubarbSymbol = keyof typeof corresponding;
type RhubarbCue = { start: number; end: number; value: RhubarbSymbol };

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_aa",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

function Avatar() {
  const groupRef = useRef<Group>(null);

  const { nodes, materials } = useGLTF("/glb/placeholder.glb");

  const body = nodes.body as SkinnedMesh | undefined;

  const { animations: idleAnimations } = useFBX("/fbx/Idle.fbx");
  const { animations: armStretchingAnimations } = useFBX(
    "/fbx/Arm Stretching.fbx"
  );
  const { animations: defeatedAnimations } = useFBX("/fbx/Defeated.fbx");
  const { animations: happyIdleAnimations } = useFBX("/fbx/Happy Idle.fbx");
  const { animations: oldManIdleAnimations } = useFBX("/fbx/Old Man Idle.fbx");
  const { animations: pointingForwardAnimations } = useFBX(
    "/fbx/Pointing Forward.fbx"
  );
  const { animations: surprisedAnimations } = useFBX("/fbx/Surprised.fbx");
  const { animations: tellingSecretAnimations } = useFBX(
    "/fbx/Telling A Secret.fbx"
  );
  const { animations: thankfulAnimations } = useFBX("/fbx/Thankful.fbx");

  const listAnimations = useMemo<AnimationClip[]>(() => {
    const list: AnimationClip[] = [];
    if (idleAnimations && idleAnimations[0]) {
      const c = idleAnimations[0].clone();
      c.name = "idle";
      list.push(c);
    }
    if (armStretchingAnimations && armStretchingAnimations[0]) {
      const c = armStretchingAnimations[0].clone();
      c.name = "armStretching";
      list.push(c);
    }
    if (defeatedAnimations && defeatedAnimations[0]) {
      const c = defeatedAnimations[0].clone();
      c.name = "defeated";
      list.push(c);
    }
    if (happyIdleAnimations && happyIdleAnimations[0]) {
      const c = happyIdleAnimations[0].clone();
      c.name = "happyIdle";
      list.push(c);
    }
    if (oldManIdleAnimations && oldManIdleAnimations[0]) {
      const c = oldManIdleAnimations[0].clone();
      c.name = "oldManIdle";
      list.push(c);
    }
    if (pointingForwardAnimations && pointingForwardAnimations[0]) {
      const c = pointingForwardAnimations[0].clone();
      c.name = "pointingForward";
      list.push(c);
    }
    if (surprisedAnimations && surprisedAnimations[0]) {
      const c = surprisedAnimations[0].clone();
      c.name = "surprised";
      list.push(c);
    }
    if (tellingSecretAnimations && tellingSecretAnimations[0]) {
      const c = tellingSecretAnimations[0].clone();
      c.name = "tellingSecret";
      list.push(c);
    }
    if (thankfulAnimations && thankfulAnimations[0]) {
      const c = thankfulAnimations[0].clone();
      c.name = "thankful";
      list.push(c);
    }
    return list;
  }, [
    idleAnimations,
    armStretchingAnimations,
    defeatedAnimations,
    happyIdleAnimations,
    oldManIdleAnimations,
    pointingForwardAnimations,
    surprisedAnimations,
    tellingSecretAnimations,
    thankfulAnimations,
  ]);

  const { actions } = useAnimations(listAnimations, groupRef);

  const { activeAnimation } = useControllerStore();

  console.log(nodes);
  // console.log(materials);
  // console.log(listAnimations);

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
  const lipsync = JSON.parse(jsonFile as string) as { mouthCues: RhubarbCue[] };

  console.log(lipsync);

  useEffect(() => {
    if (playAudio) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playAudio, script, audio]);

  const headRef = useRef<SkinnedMesh | null>(null);
  const teethRef = useRef<SkinnedMesh | null>(null);

  useEffect(() => {
    headRef.current = nodes.Wolf3D_Head as SkinnedMesh;
    teethRef.current = nodes.Wolf3D_Teeth as SkinnedMesh;
  }, [nodes]);

  useFrame(() => {
    const currentTime = audio.currentTime;
    const s = 0.22;

    const head = headRef.current;
    const teeth = teethRef.current;
    if (!head?.morphTargetDictionary || !head?.morphTargetInfluences) return;

    const hDict = head.morphTargetDictionary;
    const tDict = teeth?.morphTargetDictionary;

    const nextH = head.morphTargetInfluences.slice();
    const nextT = teeth?.morphTargetInfluences
      ? teeth.morphTargetInfluences.slice()
      : undefined;

    for (const value of Object.values(corresponding)) {
      const ih = hDict[value];
      if (ih !== undefined) nextH[ih] = nextH[ih] + (0 - nextH[ih]) * s;
      if (tDict && nextT) {
        const it = tDict[value];
        if (it !== undefined) nextT[it] = nextT[it] + (0 - nextT[it]) * s;
      }
    }

    for (let i = 0; i < lipsync.mouthCues.length; i++) {
      const cue = lipsync.mouthCues[i];
      if (currentTime >= cue.start && currentTime <= cue.end) {
        const name = corresponding[cue.value];

        const ih = hDict[name];
        if (ih !== undefined) {
          const w = weightEnvelope(currentTime, cue.start, cue.end);
          nextH[ih] = nextH[ih] + (w - nextH[ih]) * s;
        }

        if (tDict && nextT) {
          const it = tDict[name];
          if (it !== undefined) {
            const w = weightEnvelope(currentTime, cue.start, cue.end);
            nextT[it] = nextT[it] + (w - nextT[it]) * s;
          }
        }

        break;
      }
    }

    head.morphTargetInfluences = nextH;
    if (teeth && nextT) teeth.morphTargetInfluences = nextT;
  });

  return (
    <group dispose={null} ref={groupRef} rotation={[-Math.PI / 2, 0, 0]}>
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

useGLTF.preload("/glb/placeholder.glb");
