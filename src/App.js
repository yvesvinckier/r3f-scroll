import * as THREE from "three";
import React, { Suspense, useRef, useEffect, useMemo } from "react";
import lerp from "lerp";
import { TextureLoader, LinearFilter } from "three";
import { Canvas, useFrame, extend, useLoader } from "@react-three/fiber";
import { Html, shaderMaterial, Text } from "@react-three/drei";
import { Block, useBlock } from "./blocks";
import glsl from "glslify";
import state from "./store";

import Twitter from "./assets/Twitter";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

const CurveShaderMaterial = shaderMaterial(
  // Uniform
  {
    uVelocity: 0,
    uTexture: new THREE.Texture(),
  },

  // Vertex Shader
  glsl`
  precision mediump float;

  uniform float uVelocity;
  varying vec2 vUv;

  void main() {
    vec3 pos = position;
    pos.y = pos.y + ((sin(uv.x * 3.1415926535897932384626433832795) * uVelocity * 5.0) * 0.125);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
  }`,

  // Fragment Shader
  glsl`
  precision mediump float;

  uniform float uVelocity;
  uniform sampler2D uTexture;
  
  varying vec2 vUv;

  void main() {
    vec3 tex = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(tex, 1.0);
    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }`
);

extend({ CurveShaderMaterial });

function Plane({ color = "white", left, children, map }) {
  const curveShaderMaterialRef = useRef();
  const { contentMaxWidth } = useBlock();
  const aspect = 1.75;

  let last = state.top.current;
  useFrame(() => {
    const { top } = state;
    curveShaderMaterialRef.current.uVelocity = lerp(
      curveShaderMaterialRef.current.uVelocity,
      (top.current - last) / 150,
      0.1
    );
    last = top.current;
  });

  return (
    <>
      <mesh scale={[contentMaxWidth, contentMaxWidth / aspect, 1]}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <curveShaderMaterial
          ref={curveShaderMaterialRef}
          // wireframe={true}
          color={color}
          uTexture={map}
          uTexture-encoding={THREE.sRGBEncoding}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

function Paragraph({ image, index, factor, offset, text, aspect, header }) {
  const { contentMaxWidth, mobile, canvasWidth, margin } = useBlock();
  const size = aspect < 1 && !mobile ? 0.65 : 1;
  const left = !(index % 2);
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2;
  const pixelWidth = contentMaxWidth * state.zoom;

  return (
    <Block factor={factor} offset={offset}>
      <group position={[alignRight * (left ? -1 : 1), 0, 0]}>
        <Plane left map={image} />
        <Html
          style={{
            width: pixelWidth / (mobile ? 1 : 2),
            textAlign: left ? "left" : "right",
          }}
          position={[
            left || mobile ? (-contentMaxWidth * size) / 2 : 0,
            (-contentMaxWidth * size) / 2 / aspect - 0.4,
            1,
          ]}
        >
          <div tabIndex={index}>{text}</div>
        </Html>
        <Html
          style={{
            textAlign: "center",
            fontFamily: "Italiana",
            fontSize: "200px",
            color: "#fff",
          }}
          position={[
            left || mobile
              ? (-contentMaxWidth * size) / 2
              : (-contentMaxWidth * size) / 2,
            (contentMaxWidth * size) / 1.5 / aspect - 0.4,
            1,
          ]}
        >
          <div tabIndex={index}>{header}</div>
        </Html>
      </group>
    </Block>
  );
}

function Content() {
  const images = useLoader(
    TextureLoader,
    state.projects.map(({ image }) => image)
  );
  useMemo(
    () => images.forEach((texture) => (texture.minFilter = LinearFilter)),
    [images]
  );
  const fontProps = {
    fontSize: 0.32,
    fontFamily: "Inter",
    letterSpacing: 0.05,
    lineHeight: 1,
    "material-toneMapped": false,
    color: "#fff",
  };
  return (
    <>
      <Block factor={1} offset={0}>
        <Block factor={1.5}>
          <Html
            style={{
              textAlign: "center",
              fontFamily: "Italiana",
              fontSize: "200px",
              color: "#fff",
            }}
            position={[-4, -2, 0]}
          >
            DIVING
          </Html>
        </Block>
        <Block factor={1.0}>
          <Text anchorX="center" anchorY="middle" {...fontProps}>
            Squid church-key fashion axe hoodie small batch.
          </Text>
        </Block>
      </Block>
      {state.projects.map((props, index) => (
        <Paragraph key={index} index={index} {...props} image={images[index]} />
      ))}
    </>
  );
}

function App() {
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
    <>
      <Canvas
        className="canvas"
        orthographic
        camera={{ zoom: state.zoom, position: [0, 0, 500] }}
      >
        <Suspense
          fallback={<Html center className="loading" children="Loading..." />}
        >
          <Content />
          {/* <Startup /> */}
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        {new Array(state.sections).fill().map((_, index) => (
          <div
            key={index}
            id={"0" + index}
            style={{ height: `${(state.pages / state.sections) * 100}vh` }}
          />
        ))}
      </div>
      <Header />
      <a
        href="https://twitter.com/NowMoDesign/"
        style={{ position: "absolute", bottom: 40, right: "4vw", width: 50 }}
      >
        <Twitter />
      </a>
      <Footer />
    </>
  );
}

export default App;
