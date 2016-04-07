//= require jquery
//= require texiao/ring/three
//= require texiao/ring/OrbitControls
//= require texiao/ring/dat.gui
//= require texiao/ring/sim
//= require 3Dshapes/cube
//= require 3Dshapes/sphere
//= require 3Dshapes/line
//= require stats

var container, stats;
var camera, scene, raycaster, renderer;
var mouse = new THREE.Vector2();
var radius = 500,theta = 0;
var frustumSize = 1000;
var showing_img = false;


function init() {
  container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.left = '0';
  document.body.appendChild(container);
  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(45,
    window.innerWidth / window.innerHeight,
    0.1, 3000);
  camera.position.set(-500, 40, -50);
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  orbitControls = new THREE.OrbitControls(camera);
  orbitControls.autoRotate = true;
  scene = new THREE.Scene();
  ambientLight = new THREE.AmbientLight(0xc0c0c0);
  pointLight = new THREE.SpotLight(0xffffff, 1.5);
  pointLight.position.set(-40, 60, -10);
  scene.add(ambientLight);
  scene.add(pointLight);

  var vector = new THREE.Vector3();
  for (var i = 0; i < 100; i++) {
    var phi = i * 0.2 + Math.PI;

    var object = new THREE.Object3D();
    var cubeSize = Math.ceil((Math.random() * 5) + 10);
    var geometry = new Cube(cubeSize, cubeSize, cubeSize, 0, 0, 0, table_img_large[i % table_img_medium.length], true);
    geometry.typeName = 'cube';
    geometry.imgIndex = i % table_img_medium.length;
    var geometry_line = new Line();
    // console.log(geometry_line);
    // position the cube randomly in the scene
    position_x = Math.random() * 500 * Math.sin(phi);
    position_y = -(i * 2) + 90;
    position_z = Math.random() * 500 * Math.cos(phi);

    geometry_line.position.x = geometry.position.x = position_x;
    geometry_line.position.y = position_y + 500;
    geometry.position.y = position_y;
    geometry_line.position.z = geometry.position.z = position_z;
    // geometry_line.rotation.z = -Math.PI;
    geometry_line.typeName = 'line'

    vector.x = position_x * 2;
    vector.y = position_y;
    vector.z = position_z * 2;
    object.lookAt(vector);


    scene.add(geometry);
    scene.add(geometry_line);
  }

  raycaster = new THREE.Raycaster();
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  document.addEventListener('click', onDocumentMouseClick, false);
  document.addEventListener('mousemove',onDocumentMouseMove,false);
  //
  window.addEventListener('resize', onWindowResize, false);

  render();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
function onDocumentMouseClick(event) {
  if(showing_img){
    showing_img = false;
    return;
  }
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( scene.children );
  if ( intersects.length > 0 && intersects[0].object.typeName == 'cube' ) {//成功选取
    // console.log(intersects[0]);
    showing_img = true;
    var image=new Image();
    show_img_div = document.createElement( 'div' );
    var show_img = document.createElement('img');
    show_img.src = table_img[intersects[0].object.imgIndex];
    image.src = table_img[intersects[0].object.imgIndex];
    var imgWidth=image.width;
    var imgHeight=image.height;
    show_img_div.appendChild(show_img);
    document.body.appendChild(show_img_div);
    show_img.style.zIndex = '99';
    show_img_div.style.position = "absolute";
    show_img_div.style.width = "100%";
    show_img_div.style.left = '0';
    show_img_div.style.right = '0';
    show_img_div.style.top = '0';
    show_img_div.style.bottom = '0';
    show_img_div.style.overflow = 'hidden';
    show_img_div.style.backgroundColor = "rgba(0,0,0,0.8)";
    show_img_div.style.textAlign = "center";
    show_img.style.width = window.innerHeight*imgWidth/imgHeight+"px";
    show_img.style.height = window.innerHeight+"px";
    show_img_div.addEventListener( 'click', function ( event ) {
      document.body.removeChild(show_img_div);
    },false)
  }
}
function render() {
  orbitControls.update();
  scene.traverse(function(e) {
    if (e instanceof THREE.Mesh && e.typeName == 'cube') {
      e.rotation.y -= 0.02;
    }
  });
  
  // var intersects = raycaster.intersectObjects( scene.children );
 //  if ( intersects.length > 0 && intersects[0].object.typeName == 'cube' ) {//成功选取
 //   intersects[0].object.scale.set(1.5,1.5,1.5)
 //  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
window.onload = init;