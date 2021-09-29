import React, {useEffect} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import normalMap from '@/assets/textures/normalMap.png';
import * as dat from 'dat.gui';

import './index.css';

const CarExhibition: React.FC = () => {

    const initScene = (): void => {
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
        initPointLight(scene);
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            sphere.rotation.y = .5 * elapsedTime;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);

        };

        animate();
    };

    const initPointLight = (scene: THREE.Scene) => {
        const pointLight1 = new THREE.PointLight(0xffffff, 0.1);
        pointLight1.position.set(2, 3, 4);

        const pointLight2 = new THREE.PointLight(0xff0000, 2);
        pointLight2.position.set(-1.58, 1.59, 0.34);
        pointLight2.intensity = 2.14;

        const pointLight3 = new THREE.PointLight(0xa4ff, 2);
        pointLight3.position.set(1, -0.92, 0.4);
        pointLight3.intensity = 2.1;

        const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);
        const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1);
        const gui = new dat.GUI();

        scene.add(pointLight1);
        scene.add(pointLight2);
        scene.add(pointLight3);
        scene.add(pointLightHelper2);
        scene.add(pointLightHelper3);
        
        const ligthFolder1 = gui.addFolder('ligthFolder1');
        ligthFolder1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01);
        ligthFolder1.add(pointLight2.position, 'x').min(-3).max(3).step(0.01);
        ligthFolder1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
        ligthFolder1.add(pointLight2, 'intensity').min(0).max(10).step(0.01);

        const ligthFolder2 = gui.addFolder('ligthFolder2');
        ligthFolder2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01);
        ligthFolder2.add(pointLight3.position, 'x').min(-3).max(3).step(0.01);
        ligthFolder2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01);
        ligthFolder2.add(pointLight3, 'intensity').min(0).max(10).step(0.01);

        // change the color

        const pointLight3ColorObj = {
            color: 0xff0000
        };
        ligthFolder2.addColor(pointLight3ColorObj, 'color')
            .onChange(() => {
                pointLight3.color.set(pointLight3ColorObj.color);
            });
    };

    useEffect(() => {
        initScene();
    });

    return <div id='container'></div>;
};

export default CarExhibition;