import * as THREE from 'three';

const d3_viewer_1 = document.querySelector("#idD3_viewer_5");
var rangeInp_1 = document.querySelector("#idRange_5");

const scene_1 = new THREE.Scene();
scene_1.background = new THREE.Color("rgb(16, 17, 22)");
var camera_1 = new THREE.PerspectiveCamera( 75, d3_viewer_1.clientWidth / d3_viewer_1.clientHeight, 0.1, 1000 );

const renderer_1 = new THREE.WebGLRenderer();
renderer_1.setSize(d3_viewer_1.clientWidth, d3_viewer_1.clientHeight);

d3_viewer_1.appendChild(renderer_1.domElement);
//document.body.appendChild( renderer_1.domElement );

var lb_1 = document.querySelector("#idLabel_5");

const divisor_1 = 50;

var r1 = parseFloat(rangeInp_1.value) / divisor_1;

lb_1.textContent = "Raio: r = " + r1.toString() + ";";

const icos_geometry_1 = new THREE.IcosahedronGeometry(r1, 0); 
//const icos_edges_1 = new THREE.EdgesGeometry(icos_geometry_1); 
const icos_lines_1 = new THREE.Mesh(icos_geometry_1, new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));
//const icos_lines_1 = new THREE.LineSegments(icos_geometry_1, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 
scene_1.add(icos_lines_1);

var camera_radius_1 = 2;
var cameraRotationAngle_1 = 0;//Em radianos;
var cameraRotationVelocity_1 = 0.005;//Em radianos;

var camera_xPosition = 0;
var camera_yPosition = 0;
var camera_zPosition = camera_radius_1;

camera_1.position.set(camera_xPosition, camera_yPosition, camera_zPosition);
camera_1.lookAt(0, 0, 0)

/* camera_1.position.set(0, -0.3, 2);
camera_1.lookAt(0, -0.3, 0); */

/* const points_1 = [];
points_1.push(new THREE.Vector3(-5, 0, 0));
points_1.push(new THREE.Vector3(5, 0, 0));
points_1.push(new THREE.Vector3(0, 5, 0));
const geometry = THREE.BufferGeometry().setFromPoints(points_1);
//const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xffffff})); */

/*camera_1 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera_1.position.set( 0, 0, 100 );
camera_1.lookAt( 0, 0, 0 ); */

rangeInp_1.addEventListener("input", range_onChange_1);

function range_onChange_1(){
    r1 = parseFloat(rangeInp_1.value) / divisor_1;
    lb_1.textContent = "Raio: r = " + r1.toString() + ";";
}

function rotateCamera_Circle_1(camera, radius1, cameraRotationVelocity1, cameraRotationAngle1){
    //x: A rotação deverá ser sobre o eixo x;
    //y: Será ignorado;
    //z: É o raio do círculo;

    cameraRotationAngle1 += cameraRotationVelocity1;

    camera.position.x = radius1 * Math.sin(cameraRotationAngle1);
    camera.position.z = radius1 * Math.cos(cameraRotationAngle1);

    camera.lookAt(0, 0, 0);

    return cameraRotationAngle1;
}

function rezizeCamera_Render_1(){
    camera_xPosition = camera_1.position.x;
    camera_yPosition = camera_1.position.y;
    camera_zPosition = camera_1.position.z;

    camera_1 = new THREE.PerspectiveCamera(75, d3_viewer_1.clientWidth / d3_viewer_1.clientHeight, 0.1, 1000 );
    camera_1.position.x = camera_xPosition;
    camera_1.position.y = camera_yPosition;
    camera_1.position.z = camera_zPosition;
    camera_1.lookAt(0, 0, 0);

    renderer_1.setSize(d3_viewer_1.clientWidth, d3_viewer_1.clientHeight);
}

function animate() {
	requestAnimationFrame(animate);

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
    //cube.rotation.x = 0.5;

    //icos_lines_1.rotation.x = 0.12;
    //icos_lines_1.rotation.y -= 0.005;
    //line.rotation.y = 0;

    cameraRotationAngle_1 = rotateCamera_Circle_1(camera_1, camera_radius_1, cameraRotationVelocity_1, cameraRotationAngle_1);

    icos_lines_1.rotation.z = 0.5;

    icos_lines_1.geometry.dispose();
    icos_lines_1.geometry = new THREE.IcosahedronGeometry(r1);

    //icos_geometry_1 = new THREE.IcosahedronGeometry(r1, 0); 
    //icos_edges_1 = new THREE.EdgesGeometry(icos_geometry_1); 
    //icos_lines_1 = new THREE.LineSegments(icos_edges_1, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 
    //scene_1.add(icos_lines_1);

    rezizeCamera_Render_1();

	renderer_1.render(scene_1, camera_1);
}

animate();