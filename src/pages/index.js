import React, { useRef, Suspense } from "react"
import { Canvas, extend, useThree, useFrame, useLoader, useUpdate } from "@react-three/fiber"
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
        <Html center>
         <div className="container">
          <div className="container-1">
              <div className="text">
                  <h1>Ready to start your next big endeavour ?</h1>
              </div>
          </div>
          <div className="container-2">
              <div className="button">
                  <a href="mailto:contact@haloweave.com">Mail Us</a>
              </div>
          </div>
          <div className="container-2">
              <div className="socials">
                  <div className="icons">
                      <div className="box-1"><a href="https://google.com"><i className="fab fa-github"></i></a></div>
                      <div className="box-2"><a href="https://google.com"><i className="fab fa-twitter"></i></a></div>
                      <div className="box-3"><a href="https://google.com"><i className="fab fa-instagram"></i></a></div>
                      <div className="box-4"><a href="https://google.com"><i className="fab fa-behance"></i></a></div>
                      <div className="box-5"><a href="https://google.com"><i className="fab fa-linkedin"></i></a></div>
                  </div>
              </div>
          </div>
          <div className="container-3">
              <div className="made-with">
                  <p>Made with ❤️ by haloweave</p>
              </div>
          </div>
      </div>
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
    <mesh position={[0, 0.47, 0]}>
      <sphereGeometry attach="geometry" args={[2, 20, 20]} />
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