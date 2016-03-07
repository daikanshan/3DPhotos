/**
 * Created by dks on 16-3-1.
 */
function Sphere(r,w,h,x,y,z){

    var geometry = new THREE.SphereGeometry(r,w,h);

    var texture = new THREE.TextureLoader().load("earth_surface_2048.jpg");
    var material = new THREE.MeshPhongMaterial({map:texture});

    var sphere = new THREE.Mesh(geometry,material);

    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;

    sphere.castShadow = true;

    return sphere;
}