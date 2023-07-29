import * as THREE from 'three';

var Ab1 = 0;//Área da base
var Alt1 = 0;//Área lateral total
var At1 = 0;//Área total
var Vt1 = 0;//Volume total

//var outLabel_1 = document.querySelector("#idOutLabel_1");
//var outLabel_2 = document.querySelector("#idOutLabel_2");
//var outLabel_3 = document.querySelector("#idOutLabel_3");
//var outLabel_4 = document.querySelector("#idOutLabel_4");

const d3_viewer_1 = document.querySelector("#idD3_viewer_1");

var rangeInp_1 = document.querySelector("#idRange_1");
var rangeInp_2 = document.querySelector("#idRange_2");
var rangeInp_3 = document.querySelector("#idRange_3");

var lb_1 = document.querySelector("#idLabel_1");
var lb_2 = document.querySelector("#idLabel_2");
var lb_3 = document.querySelector("#idLabel_3");

const scene_1 = new THREE.Scene();
scene_1.background = new THREE.Color("rgb(16, 17, 22)");
var camera_1 = new THREE.PerspectiveCamera( 75, d3_viewer_1.clientWidth / d3_viewer_1.clientHeight, 0.1, 1000 );

const renderer_1 = new THREE.WebGLRenderer();
renderer_1.setSize(d3_viewer_1.clientWidth, d3_viewer_1.clientHeight);

d3_viewer_1.appendChild(renderer_1.domElement);
//document.body.appendChild( renderer_1.domElement );

const divisor_1 = 50;
const divisor_2 = 1;

var n1 = 1000;
var r1 = parseFloat(rangeInp_1.value) / divisor_1;
var h1 = parseFloat(rangeInp_2.value) / divisor_1;
var th1 = (parseFloat(rangeInp_3.value) / 180) * Math.PI;

lb_1.textContent = "Raio: r = " + r1.toString() + ";";
lb_2.textContent = "Altura: h = " + h1.toString() + ";";

const l_cylinder_material_1 = new THREE.LineBasicMaterial({color: 0xffffff});
const mesh_cylinder_material = new THREE.MeshBasicMaterial({color: 0xffffff});
mesh_cylinder_material.transparent = true;
mesh_cylinder_material.opacity = 0.2;

const height_material_1 = new THREE.LineBasicMaterial({color: 0xff0000});

const radius_material_1 = new THREE.LineBasicMaterial({color: 0x00ff00});

var s_ang1 = (Math.PI / 2) * (4 / 12);//1: (4 / 12); 0.5: (8 / 12); 0.24: (10 / 12);

var ang1 = (Math.PI / 2) + s_ang1;
var ang2 = (Math.PI / 2) + s_ang1 / 2;

var rotationLados_1 = 0;
var rotationLados_1_1 = 0;
var rotationLados_2 = ang1;
var rotationLados_2_1 = 0;

var cylinder_geometry_1 = new THREE.CylinderGeometry(r1, r1, h1, n1, 0, false, 0, th1);
var cylinder_edges_1 = new THREE.EdgesGeometry(cylinder_geometry_1); 
//const cylinder_lines_1 = new THREE.Mesh(cylinder_geometry_1, mesh_cylinder_material);
var cylinder_lines_1 = new THREE.LineSegments(cylinder_edges_1, new THREE.LineBasicMaterial( { color: 0xffffff } ) );

scene_1.add(cylinder_lines_1);

var l_cylinder_points_1 = [];
l_cylinder_points_1.push(new THREE.Vector3(0, h1 / 2, r1));
l_cylinder_points_1.push(new THREE.Vector3(0, -h1 / 2, r1));
var l_cylinder_geometry_1 = new THREE.BufferGeometry().setFromPoints(l_cylinder_points_1);
var l_cylinder_line_1 = new THREE.Line(l_cylinder_geometry_1, l_cylinder_material_1);

scene_1.add(l_cylinder_line_1);

var l_cylinder_points_2 = [];
l_cylinder_points_2.push(new THREE.Vector3(-0, h1 / 2, -r1));
l_cylinder_points_2.push(new THREE.Vector3(-0, -h1 / 2, -r1));
var l_cylinder_geometry_2 = new THREE.BufferGeometry().setFromPoints(l_cylinder_points_2);
var l_cylinder_line_2 = new THREE.Line(l_cylinder_geometry_2, l_cylinder_material_1);

scene_1.add(l_cylinder_line_2);

var height_points_1 = [];
height_points_1.push(new THREE.Vector3(0, h1 / 2, 0));
height_points_1.push(new THREE.Vector3(0, -h1 / 2, 0));
var height_geometry_1 = new THREE.BufferGeometry().setFromPoints(height_points_1);
var height_line_1 = new THREE.Line(height_geometry_1, height_material_1);

scene_1.add(height_line_1);

var radius_points_1 = [];
radius_points_1.push(new THREE.Vector3(0, -h1 / 2, 0));
radius_points_1.push(new THREE.Vector3(0, -h1 / 2, r1));
var radius_geometry_1 = new THREE.BufferGeometry().setFromPoints(radius_points_1);
var radius_line_1 = new THREE.Line(radius_geometry_1, radius_material_1);

scene_1.add(radius_line_1);

var l_cylinder_points_3 = [];
l_cylinder_points_3.push(new THREE.Vector3(0, h1 / 2, r1));
l_cylinder_points_3.push(new THREE.Vector3(0, -h1 / 2, r1));
var l_cylinder_geometry_3 = new THREE.BufferGeometry().setFromPoints(l_cylinder_points_3);
var l_cylinder_line_3 = new THREE.Line(l_cylinder_geometry_3, l_cylinder_material_1);

//scene_1.add(l_cylinder_line_3);

var l_cylinder_points_4 = [];
l_cylinder_points_4.push(new THREE.Vector3(-0, h1 / 2, -r1));
l_cylinder_points_4.push(new THREE.Vector3(-0, -h1 / 2, -r1));
var l_cylinder_geometry_4 = new THREE.BufferGeometry().setFromPoints(l_cylinder_points_4);
var l_cylinder_line_4 = new THREE.Line(l_cylinder_geometry_4, l_cylinder_material_1);

//scene_1.add(l_cylinder_line_4);

//const axesHelper = new THREE.AxesHelper( 5 );
//scene_1.add(axesHelper);

var camera_radius_1 = 2;
var cameraRotationAngle_1 = Math.PI / 4 + s_ang1 / 2;//Em radianos;
var cameraRotationVelocity_1 = 0.005;//Em radianos;

var camera_xPosition = 0;
var camera_yPosition = 0.8;
var camera_zPosition = camera_radius_1;

camera_1.position.set(camera_xPosition, camera_yPosition, camera_zPosition);
camera_1.lookAt(0, 0, 0);

const rotateVelocity_1 = 0.005;

rangeInp_1.addEventListener("input", range_onChange_1);
rangeInp_2.addEventListener("input", range_onChange_2);
rangeInp_3.addEventListener("input", range_onChange_3);


function range_onChange_1(){
    r1 = parseFloat(rangeInp_1.value) / divisor_1;

    updateLabels_1();
    
    updateAng_1();
}

function range_onChange_2(){
    h1 = parseFloat(rangeInp_2.value) / divisor_1;

    updateLabels_1();
}

function range_onChange_3(){
    th1 = (parseFloat(rangeInp_3.value) / 180) * Math.PI;

    updateLabels_1();
}

function updateLabels_1(){
    lb_1.textContent = "Raio: r = " + r1.toString() + ";";
    lb_2.textContent = "Altura: h = " + h1.toString() + ";";
    lb_3.textContent = "Ângulo da seção: θ = " + ((th1 / Math.PI) * 180).toFixed(2).toString() + " deg;";
}

function updateMainObject_1(){
    scene_1.remove(cylinder_lines_1);
    
    cylinder_geometry_1 = new THREE.CylinderGeometry(r1, r1, h1, n1, 0, false, 0, th1);
    //cylinder_lines_1.geometry.dispose();
    //cylinder_lines_1.geometry = new THREE.CylinderGeometry(r1, r1, h1, n1, 1, false, 0, th1);
    cylinder_edges_1 = new THREE.EdgesGeometry(cylinder_geometry_1);
    cylinder_lines_1 = new THREE.LineSegments(cylinder_edges_1, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 


    scene_1.add(cylinder_lines_1);
}

function updateLados_1(){
    //console.log(rotationLados_2);

    if(!(rotationLados_1 >= th1) && l_cylinder_line_1.parent === scene_1){
        scene_1.remove(l_cylinder_line_1);

        l_cylinder_points_1 = [];
        l_cylinder_points_1.push(new THREE.Vector3(0, h1 / 2, r1));
        l_cylinder_points_1.push(new THREE.Vector3(0, -h1 / 2, r1));
        l_cylinder_geometry_1 = new THREE.BufferGeometry().setFromPoints(l_cylinder_points_1);
        l_cylinder_line_1 = new THREE.Line(l_cylinder_geometry_1, l_cylinder_material_1);
    
        scene_1.add(l_cylinder_line_1);
    }
    else if(!(rotationLados_1 >= th1) && l_cylinder_line_1.parent !== scene_1){
        scene_1.add(l_cylinder_line_1);
    }
    else if(l_cylinder_line_1.parent === scene_1){
        scene_1.remove(l_cylinder_line_1);
    }

    if(!(rotationLados_2 >= th1)){
        scene_1.remove(l_cylinder_line_2);

        l_cylinder_points_2 = [];
        //l_cylinder_points_2.push(new THREE.Vector3(r1 * Math.sin(ang1), h1 / 2, r1 * Math.cos(ang1)));
        //l_cylinder_points_2.push(new THREE.Vector3(r1 * Math.sin(ang1), -h1 / 2, r1 * Math.cos(ang1)));
        l_cylinder_points_2.push(new THREE.Vector3(0, h1 / 2, r1));
        l_cylinder_points_2.push(new THREE.Vector3(0, -h1 / 2, r1));
        l_cylinder_geometry_2 = new THREE.BufferGeometry().setFromPoints(l_cylinder_points_2);
        l_cylinder_line_2 = new THREE.Line(l_cylinder_geometry_2, l_cylinder_material_1);

        scene_1.add(l_cylinder_line_2);
    }
    else if(!(rotationLados_2 >= th1) && l_cylinder_line_2.parent !== scene_1){
        scene_1.add(l_cylinder_line_2);
    }
    else if(l_cylinder_line_2.parent === scene_1){
        scene_1.remove(l_cylinder_line_2);
    }
}

function updateLados_2(){
    if(th1 < 2 * Math.PI){
        scene_1.remove(l_cylinder_line_3);
        scene_1.remove(l_cylinder_line_4);

        l_cylinder_points_3 = [];
        l_cylinder_points_3.push(new THREE.Vector3(0, h1 / 2, r1));
        l_cylinder_points_3.push(new THREE.Vector3(0, -h1 / 2, r1));
        l_cylinder_geometry_3 = new THREE.BufferGeometry().setFromPoints(l_cylinder_points_3);
        l_cylinder_line_3 = new THREE.Line(l_cylinder_geometry_3, l_cylinder_material_1);

        //scene_1.add(l_cylinder_line_3);

        l_cylinder_points_4 = [];
        l_cylinder_points_4.push(new THREE.Vector3(r1 * Math.sin(th1), h1 / 2, r1 * Math.cos(th1)));
        l_cylinder_points_4.push(new THREE.Vector3(r1 * Math.sin(th1), -h1 / 2, r1 * Math.cos(th1)));
        l_cylinder_geometry_4 = new THREE.BufferGeometry().setFromPoints(l_cylinder_points_4);
        l_cylinder_line_4 = new THREE.Line(l_cylinder_geometry_4, l_cylinder_material_1);

        scene_1.add(l_cylinder_line_3);
        scene_1.add(l_cylinder_line_4);
    }
    else if(l_cylinder_line_3.parent === scene_1){
        scene_1.remove(l_cylinder_line_3);
        scene_1.remove(l_cylinder_line_4);
    }
}

function updateAng_1(){
    s_ang1 = (Math.PI / 2) * (((4 * (1 / Math.cbrt(Math.sqrt(r1))))) / 12);//1: (4 / 12); 0.5: (8 / 12); 0.24: (10 / 12);
    //s_ang1 = (Math.PI / 2) * (4 / 12);//1: (8 / 12); 0.5: ();

    rotationLados_2 = cameraRotationAngle_1 + s_ang1 * 2 - rotationLados_2_1;
    rotationLados_1 = cameraRotationAngle_1 - s_ang1 * 2 - rotationLados_1_1;
    //console.log(4 * (1 / r1));
    
    ang1 = (Math.PI / 2) + s_ang1;

    ang2 = ang1 / 2;
}

function updateHeight_1(){
    scene_1.remove(height_line_1);

    height_points_1 = [];
    height_points_1.push(new THREE.Vector3(0, h1 / 2, 0));
    height_points_1.push(new THREE.Vector3(0, -h1 / 2, 0));
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

    radius_line_1.rotation.y = th1 / 2;

    scene_1.add(radius_line_1);
}

function updateCalculo_1(){
    Ab1 = (th1 / (2 * Math.PI)) * Math.PI * (r1 ** 2);//Área da base
    Alt1 = (th1 / (2 * Math.PI)) * 2 * Math.PI * r1 * h1;//Área lateral total
    At1 = 2 * Ab1 + Alt1;//Área total
    Vt1 = (th1 / (2 * Math.PI)) * Ab1 * h1;//Volume total
}

function showCalculo_1(){
    //outLabel_1.innerHTML = "Área da base: Ab = <s></s><frac1><num1>θ</num1><div class=\"bar_1\"></div><di1>360°</di1></frac1><s></s> ∙ π ∙ r<power_1>2</power_1><s></s>= <s></s><frac1><num1>" + ((th1 / (2 * Math.PI)) * 360).toFixed(0).toString() + "°</num1><div class=\"bar_1\"></div><di1>360°</di1></frac1><s></s> ∙ π ∙ " + r1.toFixed(2).toString() + "<power_1>2</power_1><s></s>= " + Ab1.toFixed(2).toString() + " (u.a)<power_1>2</power_1>;";
    //outLabel_2.innerHTML = "Área lateral total: Alt = <s></s><frac1><num1>θ</num1><div class=\"bar_1\"></div><di1>360°</di1></frac1><s></s> ∙ π ∙ r<power_1>2</power_1><s></s>= <s></s><frac1><num1>" + ((th1 / (2 * Math.PI)) * 360).toFixed(0).toString() + "°</num1><div class=\"bar_1\"></div><di1>360°</di1></frac1><s></s> ∙ π ∙ " + r1.toFixed(2).toString() + "<power_1>2</power_1><s></s>= " + Ab1.toFixed(2).toString() + " (u.a)<power_1>2</power_1>;";
    //outLabel_3.innerHTML = "Área total: At = 2 ∙ Ab + Alt = 2 ∙ " + Ab1.toFixed(2).toString() + " + " + Alt1.toFixed(2).toString() + " = " + At1.toFixed(2).toString();
    //outLabel_4.innerHTML = "Volume total: V = <s></s><frac1><num1>θ</num1><div class=\"bar_1\"></div><di1>360°</di1></frac1><s></s> ∙ π ∙ r<power_1>2</power_1><s></s>= <s></s><frac1><num1>" + ((th1 / (2 * Math.PI)) * 360).toFixed(0).toString() + "°</num1><div class=\"bar_1\"></div><di1>360°</di1></frac1><s></s> ∙ π ∙ " + r1.toFixed(2).toString() + "<power_1>2</power_1><s></s>= " + Ab1.toFixed(2).toString() + " (u.a)<power_1>2</power_1>;";

    try{
        let outTh1_1 = document.querySelectorAll("th1_1");
        let outR1_1 = document.querySelectorAll("r1_1");
        let outH1_1 = document.querySelectorAll("h1_1");

        let outAb1_1 = document.querySelectorAll("Ab1_1");
        let outAlt1_1 = document.querySelectorAll("Alt1_1");
        let outAt1_1 = document.querySelectorAll("At1_1");
        let outVt1_1 = document.querySelectorAll("Vt1_1");

        outTh1_1.forEach(element => {
            element.innerHTML = ((th1 / (2 * Math.PI)) * 360).toFixed(0).toString() + "°";
        });
    
        outR1_1.forEach(element => {
            element.innerHTML = r1.toFixed(2).toString();
        });

        outH1_1.forEach(element => {
            element.innerHTML = h1.toFixed(2).toString();
        });

        //////////////////////////////////////////////////////////////////////////////
    
        outAb1_1.forEach(element => {
            element.innerHTML = Ab1.toFixed(2).toString() + " (u.a)<power_1>2</power_1>";
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
    }
    catch(e){
        console.error(e.message);
    }
}

function rotateCamera_Circle_1(camera, radius1, cameraRotationVelocity1, cameraRotationAngle1){
    //x: A rotação deverá ser sobre o eixo x;
    //y: Será ignorado;
    //z: É o raio do círculo;

    //cameraRotationAngle_1 = Math.PI / 4 + s_ang1 / 2;

    //if(cameraRotationAngle1 >= Math.PI * 2){
    //    cameraRotationAngle1 =  0;
    //}

    if(rotationLados_1 >= Math.PI * 2){
        //rotationLados_1 = 0;
        rotationLados_1_1 += rotationLados_1;
    }

    if(rotationLados_2 >= Math.PI * 2){
        //rotationLados_2 = 0;
        //cameraRotationAngle1 -= rotationLados_2;

        rotationLados_2_1 += rotationLados_2;

        //console.log(rotationLados_2);
    }

    //if(cameraRotationAngle1 >= Math.PI){
    //    cameraRotationAngle1 = -Math.PI;
    //}

    cameraRotationAngle1 += cameraRotationVelocity1;

    camera.position.x = radius1 * Math.sin(cameraRotationAngle1);
    camera.position.z = radius1 * Math.cos(cameraRotationAngle1);

    camera.lookAt(0, 0, 0);

    return cameraRotationAngle1;
}

function rotateLados_1(){
    rotationLados_1 += cameraRotationVelocity_1;
    rotationLados_2 += cameraRotationVelocity_1;

    l_cylinder_line_1.rotation.y = rotationLados_1;
    l_cylinder_line_2.rotation.y = rotationLados_2;
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

    cameraRotationAngle_1 = rotateCamera_Circle_1(camera_1, camera_radius_1, cameraRotationVelocity_1, cameraRotationAngle_1);

    rezizeCamera_Render_1();

    updateMainObject_1();

    updateAng_1();

    updateHeight_1();

    updateRadius_1();

    updateLados_2();

    updateLados_1();

    rotateLados_1();

    updateCalculo_1();

    showCalculo_1();

	renderer_1.render(scene_1, camera_1);
}

animate();