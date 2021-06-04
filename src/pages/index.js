import React, { useRef, Suspense } from "react"
import { Canvas, extend, useThree, useFrame, useLoader, useUpdate } from "@react-three/fiber"
import { 
  TextureLoader,
  CubeTextureLoader } from "three"
import { Html } from "drei";
import Media from "react-media";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../styles/htmlstyles.css"
import "../styles/handoff.css"
import "../styles/variables.css"
import "../styles/materialIcons.css"

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
        <main className="quick-start">
         <div className="container">
           <h1 className="heading">Start your next big endeavor.</h1>
           <button className="button">Mail Us!</button>
         <div className="columns" id="col">
          <div className="quick-start__column">
            <button className="icon-button">
              <i className="material-icons quick-start__icon">power_settings_new</i>
            </button>
          </div>
          <div className="quick-start__column">
            <button className="icon-button-2">
              <i className="material-icons quick-start__icon">power_settings_new</i>
            </button>
          </div>
          <div className="quick-start__column">
            <button className="icon-button-3">
              <i className="material-icons quick-start__icon">power_settings_new</i>
            </button>
          </div>
          <div className="quick-start__column">
            <button className="icon-button-4">
              <i className="material-icons quick-start__icon">power_settings_new</i>
            </button>
          </div>
          <div className="quick-start__column">
            <button className="icon-button-5">
              <i className="material-icons quick-start__icon">power_settings_new</i>
            </button>
          </div>
        </div>
        <div className="text">from haloweave ❤️</div>
      </div>
    </main>
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