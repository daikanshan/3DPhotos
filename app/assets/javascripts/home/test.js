// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require three.min
//= require dat.gui
//= require axes
//= require stats
//= require 3Dshapes/cube
//= require 3Dshapes/plane
//= require 3Dshapes/sphere
var cube = null,
    scene = null,
    camera = null,
    stats = null,
    plane = null,
    renderer = null,
    spotLight = null,
    sphere = null;

var controls = new function(){
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
    this.numberOfObjects = 0;

    this.positionX = 20;
    this.positionY = 4;
    this.positionZ = 2;

    this.scale = 1;

    this.removeLast = function(){
        var allObject = scene.children;
        var index = scene.children.length - 1;
        if (allObject[index] instanceof THREE.Mesh){
            scene.remove(allObject[index]);
            this.numberOfObjects = scene.children.length;
        }

    };
    this.addSphere = function(){
        var sphereR = Math.ceil(Math.random()*4);
        var sphereColor = Math.random()*0xffffff;
        var geometry = new THREE.SphereGeometry(sphereR,42,42);
        var material = new THREE.MeshLambertMaterial({color:sphereColor});
        var sphere = new THREE.Mesh(geometry,material);
        sphere.castShadow = true;
        sphere.name = 'sphere-'+scene.children.length;
        sphere.position.set(
            -20 + Math.round(Math.random()*60),
            Math.round(Math.random()*5),
            -10 + Math.round(Math.random()*20)
        );
        scene.add(sphere);
        this.numberOfObjects = scene.children.length;
    };

    this.addCube = function(){
        var cubeSize = Math.ceil((Math.random()*3));
        var cubeColor = Math.random()*0xffffff;
        var geometry = new THREE.CubeGeometry(cubeSize,cubeSize,cubeSize);
        var material = new THREE.MeshLambertMaterial({color:cubeColor});
        var cube = new THREE.Mesh(geometry,material);
        cube.castShadow = true;
        cube.name = "cube-"+scene.children.length;
        cube.position.x = -30 + Math.round(Math.random() * 60);
        cube.position.y = Math.round(Math.random()*5);
        cube.position.z = -20 + Math.round(Math.random() * 20);
        scene.add(cube);
        this.numberOfObjects = scene.children.length;
    }
};

$(document).ready(function(){

    stats = initStats();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45
        ,window.innerWidth/window.innerHeight
        ,0.1,1000);



    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE,1.0);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMapEnabled = true;



//            new Axes(scene,100);

    cube = new Cube(4,4,4,-4,3,0);
    plane = new Plane(60,20,1,1,15,0,0);
    sphere = new Sphere(4,42,42,20,4,2);

//            scene.add(cube);
//            scene.add(plane);
    scene.add(sphere);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(new THREE.Vector3(20,4,2));

    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,60,-10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    ambientLight = new THREE.AmbientLight(0xffffff,0.5);
    scene.add(ambientLight);
    $("#WebGL-output").append(renderer.domElement);

    var gui = new dat.GUI();
    guiScale = gui.addFolder('scale');
    guiScale.add(controls,'scale',0,5);

    guiCamera = gui.addFolder("camera");
    guiCamera.add(controls,'positionX',0,40);
    guiCamera.add(controls,'positionY',-20,20);
    guiCamera.add(controls,'positionZ',-20,20);

    gui.add(controls,'rotationSpeed',-0.2,0.2);
    gui.add(controls,'bouncingSpeed',-0.2,0.2);
    gui.add(controls,'addCube');
    gui.add(controls,'removeLast');
    gui.add(controls,'numberOfObjects').listen();

    renderScene();

});
var step = 0;
function renderScene(){
    stats.update();

    scene.traverse(function(e){
        if(e instanceof THREE.Mesh && e != plane && e!= sphere){
            e.rotation.x += controls.rotationSpeed;
            e.rotation.y += controls.rotationSpeed;
            e.rotation.z += controls.rotationSpeed;
        }
    });

    sphere.scale.set(controls.scale,controls.scale,controls.scale);

    step += controls.bouncingSpeed;

    sphere.rotation.y +=Math.sin(controls.rotationSpeed);

    sphere.position.x = 20+(10*(Math.cos(step)));
    sphere.position.y = 2+(10*Math.abs(Math.sin(step)));
//            var scale = 4*Math.abs(Math.sin(step))+1;
//            sphere.scale.set(scale,scale,scale);

    camera.lookAt(new THREE.Vector3(controls.positionX,controls.positionY,controls.positionZ));

//            scene.fog = new THREE.FogExp2(0xffffff,0.015);
    requestAnimationFrame(function(){renderScene()});

    renderer.render(scene,camera);
}
function initStats(){
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    $("#Stats-output").append(stats.domElement);
    return stats;

}