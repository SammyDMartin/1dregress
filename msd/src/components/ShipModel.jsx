import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * 3D model of the Annihilator-class — elongated pyramid/dart profile
 * with spinal mount, radiator strakes, engine section, and weapon hardpoints.
 */
export default function ShipModel({ highlight = null }) {
  const groupRef = useRef();
  const glowRef = useRef();
  const strakesRef = useRef([]);
  const hardpointsRef = useRef([]);

  // Animate
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.position.y = Math.sin(t * 0.5) * 1.5;
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.25 + Math.sin(t * 2) * 0.15;
      glowRef.current.scale.x = 1 + Math.sin(t * 3) * 0.08;
      glowRef.current.scale.y = 1 + Math.cos(t * 2.5) * 0.08;
    }
    // Pulse hardpoints when weapons highlighted
    hardpointsRef.current.forEach((hp, i) => {
      if (hp) {
        hp.material.opacity =
          highlight === "weapons"
            ? 0.5 + Math.sin(t * 4 + i * 0.4) * 0.4
            : 0.3;
      }
    });
    // Glow strakes when thermal highlighted
    strakesRef.current.forEach((s) => {
      if (s) {
        s.material.opacity = highlight === "thermal" ? 0.9 : 0.5;
        s.material.emissiveIntensity = highlight === "thermal" ? 0.8 : 0.2;
      }
    });
  });

  // Hull material
  const hullMat = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: 0x12121e,
        emissive: 0x050510,
        specular: 0x4488aa,
        shininess: 80,
        flatShading: true,
      }),
    []
  );

  return (
    <group ref={groupRef}>
      {/* Main hull — elongated 4-sided pyramid */}
      <mesh material={hullMat} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <coneGeometry args={[12, 100, 4, 1]} />
      </mesh>

      {/* Hull edge wireframe */}
      <lineSegments rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <edgesGeometry
          args={[new THREE.ConeGeometry(12, 100, 4, 1)]}
        />
        <lineBasicMaterial color={0x00e5ff} transparent opacity={0.12} />
      </lineSegments>

      {/* Engine section */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 55]}>
        <cylinderGeometry args={[10, 14, 20, 8]} />
        <meshPhongMaterial
          color={0x0d1b2a}
          emissive={0x001122}
          specular={0x66aacc}
          shininess={60}
        />
      </mesh>

      {/* Engine nozzle */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 68]}>
        <cylinderGeometry args={[8, 13, 12, 8, 1, true]} />
        <meshPhongMaterial
          color={0x003344}
          emissive={0x002233}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Engine glow */}
      <mesh ref={glowRef} position={[0, 0, 72]} scale={[1, 1, 2]}>
        <sphereGeometry args={[8, 16, 16]} />
        <meshBasicMaterial
          color={highlight === "propulsion" ? 0x00ffff : 0x00aadd}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Secondary engine glow ring */}
      <mesh position={[0, 0, 66]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[11, 0.5, 8, 32]} />
        <meshBasicMaterial color={0x00ccff} transparent opacity={0.15} />
      </mesh>

      {/* Radiator strakes — 4× extensible graphene */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2 + Math.PI / 4;
        return (
          <mesh
            key={`strake-${i}`}
            ref={(el) => (strakesRef.current[i] = el)}
            position={[
              Math.cos(angle) * 18,
              Math.sin(angle) * 18,
              25,
            ]}
            rotation={[0, 0, angle]}
          >
            <planeGeometry args={[35, 4]} />
            <meshPhongMaterial
              color={0x006677}
              emissive={0x003344}
              emissiveIntensity={0.2}
              side={THREE.DoubleSide}
              transparent
              opacity={0.5}
            />
          </mesh>
        );
      })}

      {/* Fore Whipple shield */}
      <mesh
        rotation={[Math.PI / 2, 0, Math.PI / 4]}
        position={[0, 0, -50]}
      >
        <coneGeometry args={[14, 6, 4, 1, true]} />
        <meshPhongMaterial
          color={highlight === "armour" ? 0x5588aa : 0x334455}
          emissive={0x112233}
          transparent
          opacity={highlight === "armour" ? 0.7 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Spinal mount — Diamond Duster rail */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 90, 6]} />
        <meshPhongMaterial
          color={highlight === "weapons" ? 0xff8844 : 0xff6b35}
          emissive={highlight === "weapons" ? 0x662200 : 0x331500}
        />
      </mesh>

      {/* Forward sensor array */}
      <mesh position={[0, 0, -54]}>
        <octahedronGeometry args={[3.5, 0]} />
        <meshPhongMaterial
          color={highlight === "sensors" ? 0x00ffff : 0x00e5ff}
          emissive={0x003344}
          wireframe
        />
      </mesh>

      {/* Sensor ring */}
      <mesh position={[0, 0, -48]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5, 0.3, 6, 16]} />
        <meshBasicMaterial
          color={0x00e5ff}
          transparent
          opacity={highlight === "sensors" ? 0.6 : 0.15}
        />
      </mesh>

      {/* UV laser hardpoints — 32 emitters along hull */}
      {Array.from({ length: 32 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const row = Math.floor(i / 8);
        const zPos = -30 + row * 18;
        return (
          <mesh
            key={`hp-${i}`}
            ref={(el) => (hardpointsRef.current[i] = el)}
            position={[
              Math.cos(angle) * 10.5,
              Math.sin(angle) * 10.5,
              zPos,
            ]}
          >
            <sphereGeometry args={[0.6, 8, 8]} />
            <meshBasicMaterial color={0x00ffaa} transparent opacity={0.3} />
          </mesh>
        );
      })}

      {/* X-ray laser emitters — 4 larger nodes */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2;
        return (
          <mesh
            key={`xray-${i}`}
            position={[Math.cos(angle) * 11, Math.sin(angle) * 11, -10]}
          >
            <boxGeometry args={[1.5, 1.5, 3]} />
            <meshPhongMaterial
              color={highlight === "weapons" ? 0xff4444 : 0x882222}
              emissive={highlight === "weapons" ? 0x440000 : 0x220000}
            />
          </mesh>
        );
      })}

      {/* Missile launch rail clusters */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2 + Math.PI / 4;
        return (
          <mesh
            key={`rail-${i}`}
            position={[Math.cos(angle) * 9, Math.sin(angle) * 9, 35]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[1.2, 1.2, 8, 6]} />
            <meshPhongMaterial color={0x2a2a3a} emissive={0x111118} />
          </mesh>
        );
      })}
    </group>
  );
}
