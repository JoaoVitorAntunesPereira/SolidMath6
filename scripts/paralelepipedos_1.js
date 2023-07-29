import * as THREE from 'three';

var Ab1 = 0;//Área da base
var Al1 = 0;//Área lateral (de cada face lateral)
var Alt1 = 0;//Área lateral total
var At1 = 0;//Área total
var Vt1 = 0;//Volume total
var nF1 = 0;//Número de faces
var nV1 = 0;//Número de vértices
var nA1 = 0;//Número de arestas

const d3_viewer_1 = document.querySelector("#idD3_viewer_1");

var rangeInp_1 = document.querySelector("#idRange_1");
var rangeInp_2 = document.querySelector("#idRange_2");
var rangeInp_3 = document.querySelector("#idRange_3");
var rangeInp_4 = document.querySelector("#idRange_4");
var rangeInp_5 = document.querySelector("#idRange_5");

var lb_1 = document.querySelector("#idLabel_1");
var lb_2 = document.querySelector("#idLabel_2");
var lb_3 = document.querySelector("#idLabel_3");
var lb_4 = document.querySelector("#idLabel_4");
var lb_5 = document.querySelector("#idLabel_5");

const scene_1 = new THREE.Scene();
scene_1.background = new THREE.Color("rgb(16, 17, 22)");
var camera_1 = new THREE.PerspectiveCamera( 75, d3_viewer_1.clientWidth / d3_viewer_1.clientHeight, 0.1, 1000 );

const renderer_1 = new THREE.WebGLRenderer();
renderer_1.setSize(d3_viewer_1.clientWidth, d3_viewer_1.clientHeight);

d3_viewer_1.appendChild(renderer_1.domElement);
//document.body.appendChild( renderer_1.domElement );

const divisor_1 = 50;
const divisor_2 = 1;

var n1 = parseFloat(rangeInp_1.value) / divisor_2;
var r1 = parseFloat(rangeInp_2.value) / divisor_1;
var h1 = parseFloat(rangeInp_3.value) / divisor_1;
var Lb1 = 2 * r1 * Math.sin(Math.PI / n1);
var ab = Math.sqrt(r1 ** 2 - (Lb1 / 2) ** 2);

lb_1.textContent = "Número de lados da base: n = " + n1.toString() + ";";
lb_2.textContent = "Raio da base: r = " + r1.toFixed(2).toString() + ";";
lb_3.textContent = "Altura: h = " + h1.toFixed(2).toString() + ";";
lb_4.textContent = "Lado da base: Lb = " + Lb1.toFixed(2).toString() + ";";
lb_5.textContent = "Apótema da base: ab = " + ab.toFixed(2).toString() + ";";

rangeInp_1.value = n1 * divisor_2;
rangeInp_2.value = r1 * divisor_1;
rangeInp_3.value = h1 * divisor_1;
rangeInp_4.value = Lb1 * divisor_1;
rangeInp_5.value = ab * divisor_1;

const height_material_1 = new THREE.LineBasicMaterial({color: 0xff0000});
const radius_material_1 = new THREE.LineBasicMaterial({color: 0x00ff00});
const ab_material_1 = new THREE.LineBasicMaterial({color: 0xffff00});
const lado_material_1 = new THREE.LineBasicMaterial({color: 0xff00ff});
const d1 = 0.01;

var paralel_geometry_1 = new THREE.CylinderGeometry(r1, r1, h1, n1/* , 0 */); 
var paralel_edges_1 = new THREE.EdgesGeometry(paralel_geometry_1); 
//const paralel_lines_1 = new THREE.Mesh(paralel_geometry_1, new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));
var paralel_lines_1 = new THREE.LineSegments(paralel_edges_1, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 

//const axesHelper = new THREE.AxesHelper( 5 );
//scene_1.add(axesHelper);

scene_1.add(paralel_lines_1);

var height_points_1 = [];
height_points_1.push(new THREE.Vector3(0, -h1 / 2, 0));
height_points_1.push(new THREE.Vector3(0, h1 / 2, 0));
var height_geometry_1 = new THREE.BufferGeometry().setFromPoints(height_points_1);
var height_line_1 = new THREE.Line(height_geometry_1, height_material_1);

scene_1.add(height_line_1);

//Raio sobre o eixo z

var radius_points_1 = [];
radius_points_1.push(new THREE.Vector3(0, -h1 / 2, 0));
radius_points_1.push(new THREE.Vector3(0, -h1 / 2, r1));
var radius_geometry_1 = new THREE.BufferGeometry().setFromPoints(radius_points_1);
var radius_line_1 = new THREE.Line(radius_geometry_1, radius_material_1);

scene_1.add(radius_line_1);

var ab_points_1 = [];
ab_points_1.push(new THREE.Vector3(0, -h1 / 2, 0));
ab_points_1.push(new THREE.Vector3(0, -h1 / 2, ab));
var ab_geometry_1 = new THREE.BufferGeometry().setFromPoints(ab_points_1);
var ab_line_1 = new THREE.Line(ab_geometry_1, ab_material_1);

ab_line_1.rotation.y = Math.PI / n1;

scene_1.add(ab_line_1);

var lado_points_1 = [];
lado_points_1.push(new THREE.Vector3(0, -h1 / 2, r1 + d1));
lado_points_1.push(new THREE.Vector3((r1 + d1) * Math.sin((2 * Math.PI) / n1), -h1 / 2, (r1 + d1) * Math.cos((2 * Math.PI) / n1)));
var lado_geometry_1 = new THREE.BufferGeometry().setFromPoints(lado_points_1);
var lado_line_1 = new THREE.Line(lado_geometry_1, lado_material_1);

scene_1.add(lado_line_1);

var lado_points_2 = [];
lado_points_2.push(new THREE.Vector3(0, -h1 / 2, r1 - d1));
lado_points_2.push(new THREE.Vector3((r1 - d1) * Math.sin((2 * Math.PI) / n1), -h1 / 2, (r1 - d1) * Math.cos((2 * Math.PI) / n1)));
var lado_geometry_2 = new THREE.BufferGeometry().setFromPoints(lado_points_2);
var lado_line_2 = new THREE.Line(lado_geometry_2, lado_material_1);

scene_1.add(lado_line_2);

var camera_radius_1 = 2;
var cameraRotationAngle_1 = 0;//Em radianos;
var cameraRotationVelocity_1 = 0.005;//Em radianos;

var camera_xPosition = 0;
var camera_yPosition = 0.9;
var camera_zPosition = camera_radius_1;

camera_1.position.set(camera_xPosition, camera_yPosition, camera_zPosition);
camera_1.lookAt(0, 0, 0);

rangeInp_1.addEventListener("input", range_onChange_1);
rangeInp_2.addEventListener("input", range_onChange_2);
rangeInp_3.addEventListener("input", range_onChange_3);
rangeInp_4.addEventListener("input", range_onChange_4);
rangeInp_5.addEventListener("input", range_onChange_5);

//No cálculo, é dada preferência ao raio

function range_onChange_1(){
    n1 = parseFloat(rangeInp_1.value) / divisor_2;
    lb_1.textContent = "Número de lados da base: n = " + n1.toString() + ";";

    Lb1 = 2 * r1 * Math.sin(Math.PI / n1);
    lb_4.textContent = "Lado da base: Lb = " + Lb1.toFixed(2).toString() + ";";
    rangeInp_4.value = parseInt(Lb1 * divisor_1);

    ab = Math.sqrt(r1 ** 2 - (Lb1 / 2) ** 2);
    lb_5.textContent = "Apótema da base: ab = " + ab.toFixed(2).toString() + ";";
    rangeInp_5.value = ab * divisor_1;
}

function range_onChange_2(){
    r1 = parseFloat(rangeInp_2.value) / divisor_1;
    lb_2.textContent = "Raio da base: r = " + r1.toString() + ";";

    Lb1 = 2 * r1 * Math.sin(Math.PI / n1);
    lb_4.textContent = "Lado da base: Lb = " + Lb1.toFixed(2).toString() + ";";
    rangeInp_4.value = parseInt(Lb1 * divisor_1);

    ab = Math.sqrt(r1 ** 2 - (Lb1 / 2) ** 2);
    lb_5.textContent = "Apótema da base: ab = " + ab.toFixed(2).toString() + ";";
    rangeInp_5.value = ab * divisor_1;
}

function range_onChange_3(){
    h1 = parseFloat(rangeInp_3.value) / divisor_1;
    lb_3.textContent = "Altura: h = " + h1.toFixed(2).toString() + ";";
}

function range_onChange_4(){
    Lb1 = parseFloat(rangeInp_4.value) / divisor_1;
    lb_4.textContent = "Lado da base: Lb = " + Lb1.toFixed(2).toString() + ";";

    r1 = Lb1 / (Math.sin(Math.PI / n1) * 2);
    lb_2.textContent = "Raio da base: r = " + r1.toFixed(2).toString() + ";";
    rangeInp_2.value = parseInt(r1 * divisor_1);

    ab = Math.sqrt(r1 ** 2 - (Lb1 / 2) ** 2);
    lb_5.textContent = "Apótema da base: ab = " + ab.toFixed(2).toString() + ";";
    rangeInp_5.value = ab * divisor_1;
}

function range_onChange_5(){
    ab = parseFloat(rangeInp_5.value) / divisor_1;
    lb_5.textContent = "Apótema da base: ab = " + ab.toFixed(2).toString() + ";";

    r1 = ab / Math.cos(Math.PI / n1);
    lb_2.textContent = "Raio da base: r = " + r1.toFixed(2).toString() + ";";
    rangeInp_2.value = parseInt(r1 * divisor_1);

    Lb1 = 2 * r1 * Math.sin(Math.PI / n1);
    lb_4.textContent = "Lado da base: Lb = " + Lb1.toFixed(2).toString() + ";";
    rangeInp_4.value = parseInt(Lb1 * divisor_1);
}

function updateMainObject_1(){
    scene_1.remove(paralel_lines_1);

    paralel_geometry_1 = new THREE.CylinderGeometry(r1, r1, h1, n1/* , 0 */); 
    paralel_edges_1 = new THREE.EdgesGeometry(paralel_geometry_1);
    paralel_lines_1 = new THREE.LineSegments(paralel_edges_1, new THREE.LineBasicMaterial( { color: 0xffffff } ) );

    scene_1.add(paralel_lines_1);
}

function updateHeight_1(){
    scene_1.remove(height_line_1);

    height_points_1 = [];
    height_points_1.push(new THREE.Vector3(0, -h1 / 2, 0));
    height_points_1.push(new THREE.Vector3(0, h1 / 2, 0));
    height_geometry_1 = new THREE.BufferGeometry().setFromPoints(height_points_1);
    height_line_1 = new THREE.Line(height_geometry_1, height_material_1);

    scene_1.add(height_line_1);
}

function updateRadius_1(){
    scene_1.remove(radius_line_1);

    radius_points_1 = [];
    radius_points_1.push(new THREE.Vector3(0, -h1 / 2, 0));
    radius_points_1.push(new THREE.Vector3(0, -h1 / 2, r1));
    radius_geometry_1 = new THREE.BufferGeometry().setFromPoints(radius_points_1);
    radius_line_1 = new THREE.Line(radius_geometry_1, radius_material_1);

    scene_1.add(radius_line_1);
}

function updateAb_1(){
    scene_1.remove(ab_line_1);

    ab_points_1 = [];
    ab_points_1.push(new THREE.Vector3(0, -h1 / 2, 0));
    ab_points_1.push(new THREE.Vector3(0, -h1 / 2, ab));
    ab_geometry_1 = new THREE.BufferGeometry().setFromPoints(ab_points_1);
    ab_line_1 = new THREE.Line(ab_geometry_1, ab_material_1);

    ab_line_1.rotation.y = Math.PI / n1;

    scene_1.add(ab_line_1);
}

function updateLado_1(){
    scene_1.remove(lado_line_2);

    scene_1.remove(lado_line_1);

    lado_points_1 = [];
    lado_points_1.push(new THREE.Vector3(0, -h1 / 2, r1 + d1));
    lado_points_1.push(new THREE.Vector3((r1 + d1) * Math.sin((2 * Math.PI) / n1), -h1 / 2, (r1 + d1) * Math.cos((2 * Math.PI) / n1)));
    lado_geometry_1 = new THREE.BufferGeometry().setFromPoints(lado_points_1);
    lado_line_1 = new THREE.Line(lado_geometry_1, lado_material_1);

    lado_points_2 = [];
    lado_points_2.push(new THREE.Vector3(0, -h1 / 2, r1 - d1));
    lado_points_2.push(new THREE.Vector3((r1 - d1) * Math.sin((2 * Math.PI) / n1), -h1 / 2, (r1 - d1) * Math.cos((2 * Math.PI) / n1)));
    lado_geometry_2 = new THREE.BufferGeometry().setFromPoints(lado_points_2);
    lado_line_2 = new THREE.Line(lado_geometry_2, lado_material_1);

    scene_1.add(lado_line_2);

    scene_1.add(lado_line_1);
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

function updateCalculos_1(){
    Ab1 = (1 / 2) * Lb1 * ab * n1;//Área da base
    Al1 = Lb1 * h1;//Área lateral (de cada face lateral)
    Alt1 = Al1 * n1;//Área lateral total
    At1 = 2 * Ab1 + Alt1;//Área total
    Vt1 = Ab1 * h1;//Volume total
    nF1 = n1 + 2;//Número de faces
    nV1 = n1 * 2;//Número de vértices
    nA1 = n1 * 3;//Número de arestas
}

function showCalculo_1(){
    try{
        let outN1_1 = document.querySelectorAll("n1_1");
        let outLb1_1 = document.querySelectorAll("Lb1_1");
        let outR1_1 = document.querySelectorAll("r1_1");
        let outH1_1 = document.querySelectorAll("h1_1");
        let outAb_1 = document.querySelectorAll("ab_1");
        //let outA1_1 = document.querySelectorAll("a1_1");

        let outAb1_1 = document.querySelectorAll("Ab1_1");
        let outAl1_1 = document.querySelectorAll("Al1_1");
        let outAlt1_1 = document.querySelectorAll("Alt1_1");
        let outAt1_1 = document.querySelectorAll("At1_1");
        let outVt1_1 = document.querySelectorAll("Vt1_1");

        let out_nF1_1 = document.querySelectorAll("nF1_1");
        let out_nV1_1 = document.querySelectorAll("nV1_1");
        let out_nA1_1 = document.querySelectorAll("nA1_1");

        outN1_1.forEach(element => {
            element.innerHTML = n1.toString();
        });

        outLb1_1.forEach(element => {
            element.innerHTML = Lb1.toFixed(2).toString();
        });
    
        outR1_1.forEach(element => {
            element.innerHTML = r1.toFixed(2).toString();
        });

        outH1_1.forEach(element => {
            element.innerHTML = h1.toFixed(2).toString();
        });

        outAb_1.forEach(element => {
            element.innerHTML = ab.toFixed(2).toString();
        });

        //outA1_1.forEach(element => {
        //    element.innerHTML = a1.toFixed(2).toString();
        //});

        //////////////////////////////////////////////////////////////////////////////
    
        outAb1_1.forEach(element => {
            element.innerHTML = Ab1.toFixed(2).toString() + " (u.a)<power_1>2</power_1>";
        });

        outAl1_1.forEach(element => {
            element.innerHTML = Al1.toFixed(2).toString() + " (u.a)<power_1>2</power_1>";
        });

        outAlt1_1.forEach(element => {
            element.innerHTML = Alt1.toFixed(2).toString() + " (u.a)<power_1>2</power_1>";
        });

        outAt1_1.forEach(element => {
            element.innerHTML = At1.toFixed(2).toString() + " (u.a)<power_1>2</power_1>";
        });

        outVt1_1.forEach(element => {
            element.innerHTML = Vt1.toFixed(2).toString() + " (u.a)<power_1>3</power_1>";
        });

        ////////////////////////////////////////////////////////////////////////////////

        out_nF1_1.forEach(element => {
            element.innerHTML = nF1.toString();
        });

        out_nV1_1.forEach(element => {
            element.innerHTML = nV1.toString();
        });

        out_nA1_1.forEach(element => {
            element.innerHTML = nA1.toString();
        });
    }
    catch(e){
        console.error(e.message);
    }
}

function animate() {
	requestAnimationFrame(animate);

    cameraRotationAngle_1 = rotateCamera_Circle_1(camera_1, camera_radius_1, cameraRotationVelocity_1, cameraRotationAngle_1);

    rezizeCamera_Render_1();//Sob alterações na resolução da tela

    //console.log(paralel_lines_1.rotation.x);

    //paralel_lines_1.position.applyEuler(new THREE.Euler(paralel_lines_1.rotation.x, paralel_lines_1.rotation.y + rotateVelocity_1, paralel_lines_1.rotation.z), "XYZ");

    //paralel_lines_1.geometry.dispose();
    //paralel_lines_1.geometry = new THREE.CylinderGeometry(r1, r1, h1, n1); 

    updateMainObject_1();

    updateHeight_1();

    updateRadius_1();

    updateAb_1();

    updateLado_1();

    updateCalculos_1();

    showCalculo_1();

	renderer_1.render(scene_1, camera_1);
}

animate();