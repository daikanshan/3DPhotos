//= require jquery
//= require texiao/ring/three
//= require texiao/ring/dat.gui
//= require 3Dshapes/cube
//= require 3Dshapes/sphere
function init(){
  $("body").append("<div id='WebGL-output'></div>");
  styleForOutput = {
    'margin': 0,
    'overflow': 'hidden'
  };
  $("#WebGL-output").css(styleForOutput);

  var scene,camera,ambientLight,pointLight,renderer;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45,
    window.innerWidth/window.innerHeight,
    0.1,1000);
  camera.position.set(-30,20,30);
  camera.lookAt(scene.position);


  ambientLight = new THREE.AmbientLight(0xc0c0c0);
  pointLight = new THREE.SpotLight(0xffffff,1.5);
  pointLight.position.set(-40,60,-10);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xeeeeee);
  renderer.setSize(window.innerWidth,window.innerHeight);

  for(var i in table_img_medium){

    var cubeSize = Math.ceil((Math.random() * 3));
    var geometry = new Cube(5,5,5,0,0,0,table_img_large[i%table_img_medium.length],true);
    // position the cube randomly in the scene
    geometry.position.x =Math.round((Math.random() * 40));
    geometry.position.y = -Math.round((Math.random() * 40));
    geometry.position.z = -Math.round((Math.random() * 40));
    geometry.number = i;
    scene.add(geometry);
    console.log(table_img[geometry.number]);
  }
  scene.add(ambientLight);
  scene.add(pointLight);

  $("#WebGL-output").append(renderer.domElement);
  render();

  function render() {
    scene.traverse(function (e) {
      if (e instanceof THREE.Mesh ) {
          // e.rotation.x += 0.02;
          e.rotation.y += 0.02;
          // e.rotation.z += 0.02;
      }
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    // renderer.setSize(window.innerWidth, window.innerHeight);

  }
}
window.onload = init;
