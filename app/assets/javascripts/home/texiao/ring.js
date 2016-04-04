//= require jquery
//= require texiao/ring/three
//= require texiao/ring/dat.gui
//= require 3Dshapes/cube
//= require 3Dshapes/sphere
//= require 3Dshapes/line
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
  camera.position.set(-500,40,-50);
  camera.lookAt(new THREE.Vector3(10, 0, 0));


  ambientLight = new THREE.AmbientLight(0xc0c0c0);
  pointLight = new THREE.SpotLight(0xffffff,1.5);
  pointLight.position.set(-40,60,-10);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xeeeeee);
  renderer.setSize(window.innerWidth,window.innerHeight);

  var vector = new THREE.Vector3();
  for(var i =0; i<100; i++ ){
		var phi = i * 0.175 + Math.PI;

		var object = new THREE.Object3D();
    var cubeSize = Math.ceil((Math.random() * 5)+10);
    var geometry = new Cube(cubeSize,cubeSize,cubeSize,0,0,0,table_img_large[i%table_img_medium.length],true);
    var geometry_line = new Line();
    // console.log(geometry_line);
    // position the cube randomly in the scene
    position_x = 180 * Math.sin( phi );
    position_y = - ( i * 2 ) + 90;
    position_z = 180 * Math.cos( phi );

    geometry_line.position.x = geometry.position.x = position_x;
    geometry_line.position.y = position_y + 100;
    geometry.position.y = position_y;
    geometry_line.position.z = geometry.position.z = position_z;
    // geometry_line.rotation.z = -Math.PI;
    geometry_line.typeName = 'line'

		vector.x = position_x * 2;
		vector.y = position_y;
		vector.z = position_z * 2;
		object.lookAt( vector );


    scene.add(geometry);
    scene.add(geometry_line);
  }
  scene.add(ambientLight);
  scene.add(pointLight);

  $("#WebGL-output").append(renderer.domElement);

  render();

  function render() {
    scene.traverse(function (e) {
      if (e instanceof THREE.Mesh && e.typeName!='line' ) {
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
