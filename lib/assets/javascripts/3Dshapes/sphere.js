/**
 * Created by dks on 16-3-1.
 */
function Sphere(r,w,h,position_x,position_y,position_z,img_url,castShadow){

    var geometry = new THREE.SphereGeometry(r,w,h);

    var texture = new THREE.TextureLoader().load(img_url);
    var material = new THREE.MeshPhongMaterial({map:texture});

    var sphere = new THREE.Mesh(geometry,material);

    sphere.position.x = position_x;
    sphere.position.y = position_y;
    sphere.position.z = position_z;

    sphere.castShadow = castShadow;

    return sphere;
}
