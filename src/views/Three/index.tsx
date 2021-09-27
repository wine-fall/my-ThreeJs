import React from 'react';
import * as Three from 'three';

const ThreeDemo: React.FC = () => {
    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(
        75,
        window.innerHeight / window.innerWidth,
        0.1,
        10
    );
    const renderer = new Three.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    return <div>
        {'renderer.domElement'}
    </div>;
};

export default ThreeDemo;