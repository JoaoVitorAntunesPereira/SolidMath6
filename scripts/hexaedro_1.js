import * as THREE from 'three';

const d3_viewer_1 = document.querySelector("#idD3_viewer_2");
var rangeInp_1 = document.querySelector("#idRange_2");

const scene_1 = new THREE.Scene();
scene_1.background = new THREE.Color("rgb(16, 17, 22)");
var camera_1 = new THREE.PerspectiveCamera( 75, d3_viewer_1.clientWidth / d3_viewer_1.clientHeight, 0.1, 1000 );

const renderer_1 = new THREE.WebGLRenderer();
renderer_1.setSize(d3_viewer_1.clientWidth, d3_viewer_1.clientHeight);

d3_viewer_1.appendChild(renderer_1.domElement);
//document.body.appendChild( renderer_1.domElement );

var lb_2 = document.querySelector("#idLabel_2");

const divisor_1 = 50;

var r1 = (parseFloat(rangeInp_1.value) / divisor_1) * Math.sqrt(2);
var r2 = parseFloat(rangeInp_1.value) / divisor_1;

lb_2.textContent = "Raio: r = " + r2.toString() + ";";

const lineBasicMaterial_1 = new THREE.LineBasicMaterial({color: 0xffffff});

var hexa_geometry_1 = new THREE.BoxGeometry(r1, r1, r1); 
var hexa_edges_1 = new THREE.EdgesGeometry(hexa_geometry_1); 
//const hexa_mesh_1 = new THREE.Mesh(hexa_geometry_1, new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));
var hexa_lines_1 = new THREE.LineSegments(hexa_geometry_1, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 

//const axesHelper = new THREE.AxesHelper( 5 );
//hexa_mesh_1.add( axesHelper );

scene_1.add(hexa_lines_1);

var camera_radius_1 = 2;
var cameraRotationAngle_1 = 0;//Em radianos;
var cameraRotationVelocity_1 = 0.005;//Em radianos;

var camera_xPosition = 0;
var camera_yPosition = 0;
var camera_zPosition = camera_radius_1;

camera_1.position.set(camera_xPosition, camera_yPosition, camera_zPosition);
camera_1.lookAt(0, 0, 0);

const rotateVelocity_1 = 0.005;

rangeInp_1.addEventListener("input", range_onChange_1);

function range_onChange_1(){
    r1 = (parseFloat(rangeInp_1.value) / divisor_1) * Math.sqrt(2);
    r2 = parseFloat(rangeInp_1.value) / divisor_1;
    lb_2.textContent = "Raio: r = " + r2.toString() + ";";
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

    scene_1.remove(hexa_lines_1);

    //hexa_mesh_1.rotation.y -= 0.005;

    //hexa_mesh_1.rotation.x += -0.005;

    cameraRotationAngle_1 = rotateCamera_Circle_1(camera_1, camera_radius_1, cameraRotationVelocity_1, cameraRotationAngle_1);

    //console.log(hexa_mesh_1.rotation.x);

    //hexa_mesh_1.position.applyEuler(new THREE.Euler(hexa_mesh_1.rotation.x, hexa_mesh_1.rotation.y + rotateVelocity_1, hexa_mesh_1.rotation.z), "XYZ");

    //hexa_mesh_1.geometry.dispose();
    //hexa_mesh_1.geometry = new THREE.BoxGeometry(r1, r1, r1);

    hexa_geometry_1 = new THREE.BoxGeometry(r1, r1, r1);
    hexa_edges_1 = new THREE.EdgesGeometry(hexa_geometry_1);
    hexa_lines_1 = new THREE.LineSegments(hexa_edges_1, lineBasicMaterial_1);

    rezizeCamera_Render_1();

    scene_1.add(hexa_lines_1);

	renderer_1.render(scene_1, camera_1);
}

animate();