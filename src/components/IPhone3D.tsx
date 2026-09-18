import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function IPhone3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .01, 100);
    camera.position.set(0, 0, 1.15);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight(0xaad8ff, 0x160909, 2.2));
    const key = new THREE.DirectionalLight(0xffc46b, 5.5); key.position.set(2, 3, 4); scene.add(key);
    const rim = new THREE.DirectionalLight(0x62e8ff, 4); rim.position.set(-3, 1, -2); scene.add(rim);
    const followGroup = new THREE.Group();
    const spinGroup = new THREE.Group();
    followGroup.add(spinGroup); scene.add(followGroup);
    let model: THREE.Object3D | undefined;
    const loader = new GLTFLoader();
    loader.load("/models/iphone-17-pro.glb", (gltf) => {
      model = gltf.scene;
      model.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        child.castShadow = true;
      });
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const normalizedScale = .28 / Math.max(size.x, size.y, size.z);
      const normalizer = new THREE.Group();
      model.position.sub(center);
      normalizer.scale.setScalar(normalizedScale);
      normalizer.add(model);
      spinGroup.add(normalizer);
    });
    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize); observer.observe(mount);
    let mx = 0, my = 0, frame = 0;
    const move = (event: PointerEvent) => { const r = mount.getBoundingClientRect(); mx = ((event.clientX-r.left)/r.width-.5)*.22; my = ((event.clientY-r.top)/r.height-.5)*.14; };
    mount.addEventListener("pointermove", move);
    const animate = () => { followGroup.rotation.y += (mx-followGroup.rotation.y)*.045; followGroup.rotation.x += (-my-followGroup.rotation.x)*.045; renderer.render(scene,camera); frame=requestAnimationFrame(animate); };
    animate();
    const tween = gsap.fromTo(spinGroup.rotation, { y: -Math.PI * 2, x: .18 }, { y: 0, x: 0, ease: "none", scrollTrigger: { trigger: ".result-stage", start: "top 82%", end: "bottom 42%", scrub: .85 } });
    return () => { tween.kill(); observer.disconnect(); mount.removeEventListener("pointermove", move); cancelAnimationFrame(frame); renderer.dispose(); scene.traverse(o => { if (o instanceof THREE.Mesh) { o.geometry.dispose(); const mats = Array.isArray(o.material) ? o.material : [o.material]; mats.forEach(m => m.dispose()); } }); mount.removeChild(renderer.domElement); };
  }, []);
  return <div ref={mountRef} className="size-full" role="img" aria-label="使用 iPhone 17 Pro 三维模型展示微醺印记" />;
}
