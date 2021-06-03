import React, { useRef, Suspense } from "react"
import { Canvas, extend, useThree, useFrame, useLoader, useUpdate } from "@react-three/fiber"
import { 
  TextureLoader,
  CubeTextureLoader } from "three"
import { Html } from "drei";
import Media from "react-media";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
        <Html fullscreen>
        </Html>
  )
}

const Skybox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "/1.png",
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
    <mesh position={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[2, 20, 20]} />
      <meshBasicMaterial attach="material" map={texture} displacementMap={displacementMap} />
    </mesh>
  )
}

const SphereMobile = () => {
  const [texture, displacementMap] = useLoader(TextureLoader, ["/moon.png","/displacement.jpg"]);
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1.5, 20, 20]} />
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
      <Media queries={{ small: { maxWidth: 599 } }}>
        {matches =>
          matches.small ? (
            <SphereMobile />
          ) : (
            <Sphere />
          )
        }
      </Media>
    </Suspense>
  </Canvas>
</>
)
}