import React, { useRef, Suspense } from "react"
import { Canvas, extend, useThree, useFrame, useLoader, render, events } from "@react-three/fiber"
import { 
  TextureLoader,
  CubeTextureLoader } from "three"
import { Html } from "drei";
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

const HTMLContent = () => {
  return (
        <Html>
          <div className="container">
            <div className="box-1">github</div>
            <div className="box-2">linkedin</div>
            <div className="box-3">twitter</div>
            <div className="box-4">behance</div>
            <div className="box-5">instagram</div>
          </div>
        </Html>
  )
}

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
  const [texture, displacementMap] = useLoader(TextureLoader, ["/moon.png","/displacement.jpg"]);
  return (
    <mesh position={[0, 0.47, 0]}>
      <sphereGeometry attach="geometry" args={[2, 30, 30]} />
      <meshBasicMaterial attach="material" map={texture} displacementMap={displacementMap} />
    </mesh>
  )
}


export default () => {
  return (
  <>
  <Canvas style={{ width: '100%', height: '100vh' }} resize={{ scroll: false }}>
    <CameraControls />
    <Suspense fallback={null}>
      <HTMLContent />
      <Skybox />
      <Sphere />
    </Suspense>
  </Canvas>
</>
)
}