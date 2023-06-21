// Carregando uma malha de triangulos em Three.js

import * as THREE from 'three';

import { OBJLoader } from '../../Assets/scripts/three.js/examples/jsm/loaders/OBJLoader.js';

const 	rendSize = new THREE.Vector2();

var scene, 
	renderer, 
	camera;
let object;

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = 
	rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	// camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	camera = new THREE.PerspectiveCamera( 1, window.innerWidth / window.innerHeight, 5, 1000 );
	camera.position.z = 250;
	const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );

	const pointLight = new THREE.PointLight( 0x000, 0.8 );
	camera.add( pointLight );
	scene.add( camera );
	
	function loadModel() {

		object.traverse( function ( child ) {

			if ( child.isMesh ) child.material.map = texture;

		} );

		object.position.y = 0;
		object.name = "malha";

		const axis = new THREE.AxesHelper(10.0);
		object.add(axis);	
		scene.add( object );

	}
	const manager = new THREE.LoadingManager( loadModel );


	const textureLoader = new THREE.TextureLoader( manager );
	const texture = textureLoader.load( '../../Assets/Models/OBJ/dice.png' );
	// texture.colorSpace = THREE.SRGBColorSpace;

	function onProgress( xhr ) {

		if ( xhr.lengthComputable ) {

			const percentComplete = xhr.loaded / xhr.total * 100;
			console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

		}

	}

	function onError() {
		console.log( 'error')

	}

	const loader = new OBJLoader( manager );
	loader.load( '../../Assets/Models/OBJ/dice.obj', function ( obj ) {

		object = obj;

	}, onProgress, onError );

	requestAnimationFrame(animate);
	}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function loadMesh(loadedMesh) {
	var material = new THREE.MeshBasicMaterial(	{	vertexColors 	: 0x0, 
													wireframe 		: true
												} );

	loadedMesh.children.forEach(function (child) {
		child.material = material;
		});

	loadedMesh.name = "malha";
	scene.add(loadedMesh);

	const axis = new THREE.AxesHelper(100.0);
	loadedMesh.add(axis);	
	};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function animate(time) {

	var obj = scene.getObjectByName("malha");

	if (obj) {
		obj.rotation.x = time * 0.00001;
		obj.rotation.y = time * 0.0001;
		obj.rotation.z = time * 0.0005;
		}

	renderer.clear();
	renderer.render(scene, camera);

	requestAnimationFrame(animate);		
}


/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
