import React, { useRef, Suspense } from "react"
import { Canvas, extend, useThree, useFrame, useLoader, render, events } from "@react-three/fiber"
import { 
  TextureLoader,
  CubeTextureLoader } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../styles/styles.css"   

extend({ OrbitControls });

const CameraControls = () => {
  const { camera, gl: { domElement }} = useThree();
  const controls = useRef();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      autoRotate={true}
      autoRotateSpeed = {1.0}
      enableZoom={false}
    />
  );
};

const Skybox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "/haloweave.png",
    "/2.png",
    "/3.png",
    "/4.png",
    "/5.png",
    "/6.png"
  ]);
  scene.background = texture;
  return null;
}

const Sphere = () => {
  const [texture, displacementMap] = useLoader(TextureLoader, ["/texture.jpg","/displacement.jpg"]);
  return (
    <mesh>
      <sphereGeometry attach="geometry" args={[2, 32, 32]} />
      <meshBasicMaterial attach="material" map={texture} displacementMap={displacementMap} />
    </mesh>
  )
}


export default () => {
  return (
  <>
  <Canvas>
    <CameraControls />
    <Suspense fallback={null}>
      <Skybox />
      <Sphere className="sphere"/>
    </Suspense>
  </Canvas>
</>
)
}