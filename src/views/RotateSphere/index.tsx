import React, {useEffect} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import normalMap from '@/assets/textures/normalMap.png';

import './index.css';

const CarExhibition: React.FC = () => {
    const renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );
    camera.position.z = 3;


    const initScene = (): void => {
        new OrbitControls(camera, renderer.domElement);
        renderer.setSize(window.innerWidth, window.innerHeight);
        const container = document.getElementById('container');
        container?.appendChild(renderer.domElement);

        const geometry = new THREE.SphereBufferGeometry(.5, 64, 64);
        const material = new THREE.MeshStandardMaterial({color: 0x292929});

        const textureLoader = new THREE.TextureLoader();
        const normalTexture = textureLoader.load(normalMap);

        material.setValues({
            metalness: 0.7,
            roughness: 0.2,
            normalMap: normalTexture
        });
        const sphere = new THREE.Mesh(geometry, material);

        scene.add(sphere);
        initPointLight();
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            sphere.rotation.y = .5 * elapsedTime;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);

        };

        animate();
    };

    const initPointLight = () => {
        const pointLight1 = new THREE.PointLight(0xffffff, 0.1);
        pointLight1.position.set(2, 3, 4);
        const pointLight2 = new THREE.PointLight(0xff0000, 2);
        pointLight2.position.set(1, 1, 1);

        const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);

        scene.add(pointLight1);
        scene.add(pointLight2);
        scene.add(pointLightHelper);
    };

    useEffect(() => {
        initScene();
    });

    return <div id='container'></div>;
};

export default CarExhibition;