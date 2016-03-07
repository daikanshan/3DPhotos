/**
 * Created by dks on 16-3-1.
 */
function Plane(width,height,widthSegments,heightSegments,x,y,z){
    var geometry = new THREE.PlaneGeometry(width,height,widthSegments,heightSegments);
    var material = new THREE.MeshLambertMaterial({color:0xcccccc});
    var plane = new THREE.Mesh(geometry,material);
    plane.position.x = x;
    plane.position.y = y;
    plane.position.z = z;
    plane.rotation.x = -0.5*Math.PI;
    plane.receiveShadow = true;
    return plane;
}