// Desenhando objetos gráficos 3D do Three.JS

import * as THREE from 'three';

import { GUI } from '../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js';

const 	gui 		= new GUI();
const 	rendSize 	= new THREE.Vector2();
const clock = new THREE.Clock();

var 	controls, 
		scene,
		camera,
		renderer,
		animeID,
		objMesh,
		curObj;

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function main() {

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	rendSize.x = 
	rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.8;
	renderer.setSize(rendSize.x, rendSize.y);
	document.body.appendChild(renderer.domElement);
	window.addEventListener ( 'resize', onWindowResize 	);
	scene 	= new THREE.Scene();
	initGUI();
	camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );

	var axis = new THREE.AxesHelper(0.8);
    axis.name = "eixos";
    scene.add(axis);

	objMesh = new THREE.Mesh 	( 	new THREE.TetrahedronGeometry(), 
										new THREE.MeshBasicMaterial({color:0xff0000, wireframe:true })
									); 
	objMesh.name 	= "tetraedro";
	objMesh.visible = true;
	objMesh.rotateY(60.0 * Math.PI / 180.0); 
	objMesh.updateMatrix();
	scene.add( objMesh );
	curObj = objMesh;
	
	objMesh = new THREE.Mesh 	( 	new THREE.TorusGeometry(0.5, 0.3, 30, 30), 
									new THREE.MeshBasicMaterial({color:0x00ff00, wireframe:false })
								); 
	objMesh.name 	= "toro";
	objMesh.visible = false;
	scene.add( objMesh );
	
	objMesh = new THREE.Mesh 	( 	new THREE.TorusKnotGeometry(0.5, 0.2), 
										new THREE.MeshBasicMaterial({color:0x0000ff, wireframe:true })
									); 
	objMesh.name 	= "TorusKnot";
	objMesh.visible = false;
	objMesh.rotateX(270.0 * Math.PI / 180.0); 
	objMesh.rotateY(30.0 * Math.PI / 180.0); 
	objMesh.updateMatrix();
	scene.add( objMesh );

	renderer.clear();
	renderer.render(scene, camera);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function initGUI() {

	var controls = 	{	Forma3D : "Tetraedro",
						animation: false
					};

	gui.add( controls, 'Forma3D', [ 	
		"Tetraedro", 
										"Toro", 
										"TorusKnot" ] ).onChange(changeObj);
	gui.add( controls, 'animation').onChange(animation);
	gui.open();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function changeObj(val) { 

	switch (val) {
		case "Tetraedro"	: 	curObj = scene.getObjectByName("tetraedro");
								curObj.visible							 	= true;
								scene.getObjectByName("toro").visible 		= false;
								scene.getObjectByName("TorusKnot").visible 	= false;
								break;
		case "Toro"			:  	curObj = scene.getObjectByName("toro");
								curObj.visible							 	= true;
								scene.getObjectByName("tetraedro").visible 	= false;
								scene.getObjectByName("TorusKnot").visible 	= false;
								break;
		case "TorusKnot"	:  	curObj = scene.getObjectByName("TorusKnot");
		// curObj.rotateX(50 * Math.PI / 180.0)
								curObj.visible							 	= true;
								scene.getObjectByName("tetraedro").visible 	= false;
								scene.getObjectByName("toro").visible 		= false;
								break;
		}

	renderer.clear();
	renderer.render(scene, camera);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function animation(value) {

	if (value) 
		animeID = requestAnimationFrame(anime);
	else {
		cancelAnimationFrame(animeID);
		renderer.clear();
		renderer.render(scene, camera);	
		oldTime = 0;
		}
}

function anime() {

	const delta = clock.getDelta();
	curObj.rotateX(10*delta * Math.PI / 180.0); 
	curObj.rotateY(10*delta * Math.PI / 180.0); 
	curObj.rotateZ(10*delta * Math.PI / 180.0); 
	curObj.updateMatrix();
	renderer.clear();
	renderer.render(scene, camera);	
	animeID = requestAnimationFrame(anime);
}


function onWindowResize() {

	let minDim = Math.min(window.innerWidth, window.innerHeight);

	renderer.setSize(minDim*0.8, minDim*0.8);

	renderer.clear();
	renderer.render(scene, camera);
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //

main();
