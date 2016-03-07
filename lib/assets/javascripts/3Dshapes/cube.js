/**
 * Created by dks on 16-3-1.
 */
function Cube (a,b,h,x,y,z){

    var geometry = new THREE.CubeGeometry(a,b,h);
    var texture = new THREE.TextureLoader().load("water0hk.jpg");
    var material = new THREE.MeshPhongMaterial({map:texture});
    var cube = new THREE.Mesh(geometry,material);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    cube.castShadow = true;

    return cube;

}