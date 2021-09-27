import React, {useEffect} from 'react';
import * as THREE from 'three';

const ThreeDemo: React.FC = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerHeight / window.innerWidth,
        0.1,
        10
    );
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    useEffect(() => {
        const container = document.getElementById('container');
        container?.appendChild(renderer.domElement);
        animate();
    }, []);
    return <div id='container'></div>;
};

export default ThreeDemo;