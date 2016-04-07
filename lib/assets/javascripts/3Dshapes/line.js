
function Line(){

    var geometry = createMesh(new THREE.CylinderGeometry(0.5, 0.5, 1000));
    // var material = new THREE.MeshLambertMaterial({color:0x111111});
    // var line = new THREE.Mesh(geometry,material);
    // line.radiusTop = 1;
    // line.radiusBottom = 1;
    // line.height = 8;
    function createMesh(geom) {
        // assign two materials
        var meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        var wireFrameMat = new THREE.MeshBasicMaterial();
        wireFrameMat.wireframe = false;

        // create a multimaterial
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

        return mesh;
    }
    return geometry;
}
