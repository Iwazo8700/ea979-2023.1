// Hello World em Three.js

import * as THREE from 'three';

function main() {

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(1.0, 0.8, 1.0));
	renderer.setSize(window.innerWidth/2, window.innerHeight);

	document.getElementById("threejs-canvas").appendChild(renderer.domElement);
	document.getElementById("output-text").innerHTML += " (<i>release " + THREE.REVISION + "</i>)";	

	var camera 	= new THREE.Camera();
	var scene 	= new THREE.Scene();

	renderer.render(scene, camera);
};

main()
