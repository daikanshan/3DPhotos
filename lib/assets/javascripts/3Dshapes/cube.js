/**
 * Created by dks on 16-3-1.
 */
function Cube (length,width,height,position_x,position_y,position_z,img_url,castShadow){

    var geometry = new THREE.CubeGeometry(length,width,height);
    var texture = new THREE.TextureLoader().load(img_url);
    var material = new THREE.MeshPhongMaterial({map:texture});
    var cube = new THREE.Mesh(geometry,material);

    cube.position.set(position_x,position_y,position_z);

    cube.castShadow = castShadow;

    return cube;

}
