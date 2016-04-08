// once everything is loaded, we run our Three.js stuff.
function init() {
    $("body").append("<div id='WebGL-output'></div>");
    styleForOutput = {
      'top':'0px',
      'left': '0px',
      'right': '0px',
      'bottom': '0px',
      'z-index': '-10',
      'position': 'fixed',
      'margin': 0,
      'overflow': 'hidden',
      'filter':'alpha(opacity=100)',
      '-moz-opacity':'0.4',
      '-khtml-opacity': '0.4',
      'opacity': '0.4'
    };
    $("#WebGL-output").css(styleForOutput);
   // var stats = initStats();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);

    // create a render and set the size
    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    // position and point the camera to the center of the scene
    camera.position.x = 20;
    camera.position.y = 50;
    camera.position.z = 110;
    camera.lookAt(new THREE.Vector3(10, -30, -20));

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);
    var system1;
    var cloud;

    var controls = new function () {
        this.size = 4;
        this.transparent = true;
        this.opacity = 0.6;
        this.color = 0xffffff;

        this.sizeAttenuation = true;

        this.redraw = function () {
            scene.remove(scene.getObjectByName("particles1"));
            scene.remove(scene.getObjectByName("particles2"));

            createPointCloud(controls.size, controls.transparent, controls.opacity, controls.sizeAttenuation, controls.color);
        };
    };

    controls.redraw();

    render();


    function createPointCloud(size, transparent, opacity, sizeAttenuation, color) {

        var texture = THREE.ImageUtils.loadTexture("/assets/textures/particles/raindrop-3.png");
        var geom = new THREE.Geometry();

        var material = new THREE.ParticleBasicMaterial({
            size: size,
            transparent: transparent,
            opacity: opacity,
            map: texture,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: sizeAttenuation,
            color: color
        });


        var range = 200;
        for (var i = 0; i < 1000; i++) {
            var particle = new THREE.Vector3(
                    Math.random() * range - range / 2,
                    Math.random() * range,
                    Math.random() * range - range / 2);
            particle.velocityY = 0.1 + Math.random() / 5;
            particle.velocityX = (Math.random() - 0.5) / 3;
            geom.vertices.push(particle);
        }

        cloud = new THREE.ParticleSystem(geom, material);
        cloud.sortParticles = true;

        scene.add(cloud);
    }

    function render() {
        var vertices = cloud.geometry.vertices;
        vertices.forEach(function (v) {
            v.y = v.y - (v.velocityY);
            v.x = v.x - (v.velocityX);

            if (v.y <= 0) v.y = 10;
            if (v.x <= -200 || v.x >= 100) v.velocityX = v.velocityX * -1;
        });

        requestAnimationFrame(render);
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.render(scene, camera);
    }

}
window.onload = init;
