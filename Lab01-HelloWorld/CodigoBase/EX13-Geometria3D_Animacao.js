import * as THREE from 'three';

import { GUI } from '../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js';

const gui = new GUI();
const clock = new THREE.Clock();
const rendSize = new THREE.Vector2();

var controls,
	scene,
	camera,
	renderer,
	animeID,
	objMesh;

var oldTime = 0;

function main() {
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	rendSize.x = rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.8;
	renderer.setSize(rendSize.x, rendSize.y);
	document.body.appendChild(renderer.domElement);
	window.addEventListener('resize', onWindowResize);
	scene = new THREE.Scene();
	initGUI();
	camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0);
	objMesh = new THREE.Mesh(
		new THREE.TorusKnotGeometry(0.5, 0.2),
		new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
	);
	objMesh.name = "TorusKnot_anime";
	objMesh.visible = true;
	scene.add(objMesh);
	renderer.clear();
	renderer.render(scene, camera);
}

function initGUI() {
	controls = {
		TorusKnot_anime: false
	};
	gui.add(controls, "TorusKnot_anime").onChange(rotate);
	gui.open();
};

function rotate(value) {
	if (value) {
		animeID = requestAnimationFrame(anime);
	} else {
		cancelAnimationFrame(animeID);
		renderer.clear();
		renderer.render(scene, camera);
		oldTime = 0;
	}
}

function anime() {
	const delta = clock.getDelta();
	oldTime += delta;

	if (oldTime > 0.025) {
		objMesh.rotateX(-1 * Math.PI / 180.0);
		objMesh.rotateY(1 * Math.PI / 180.0);
		objMesh.rotateZ(-1 * Math.PI / 180.0);
		objMesh.updateMatrix();
		renderer.clear();
		renderer.render(scene, camera);
		oldTime = 0;
	}

	animeID = requestAnimationFrame(anime);
}

function onWindowResize() {
	let minDim = Math.min(window.innerWidth, window.innerHeight);
	renderer.setSize(minDim * 0.8, minDim * 0.8);
	renderer.clear();
	renderer.render(scene, camera);
}

main();

