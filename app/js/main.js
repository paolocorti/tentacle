(function() {

var scene, camera, renderer, object;
var geometry, material, mesh;
var i, tentacle, _i, tentacles = [];
var PI180, materials = [], materialIndex, numNodes, headRadius, girth, reduction, frequency, count, segmentsX;
init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 100;

    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 100, 1000, 100 );

    spotLight.castShadow = true;

    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;

    spotLight.shadowCameraNear = 500;
    spotLight.shadowCameraFar = 4000;
    spotLight.shadowCameraFov = 30;

    scene.add( spotLight );

    mesh = createMesh();

    mesh.position = orbit(Math.PI * 2 * Math.random(), Math.PI * 2 * Math.random(), 100);
    mesh.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
}

function orbit(phi, theta, diameter) {
  var p;
  p = new THREE.Vector3();
  p.x = diameter * Math.sin(phi) * Math.cos(theta);
  p.z = diameter * Math.sin(phi) * Math.sin(theta);
  p.y = diameter * Math.cos(phi);
  return p;
};

function createMesh() {
  // materials.push(new THREE.MeshBasicMaterial({
  //   wireframe: true,
  //   color: 0xffffff
  // }));
  // materials.push(new THREE.MeshNormalMaterial());
  // materials.push(new THREE.MeshPhongMaterial({
  //   color: 0x333333
  // }));
  // materials.push(new THREE.MeshLambertMaterial({
  //   color: 0x333333
  // }));
  var PI180 = Math.PI / 180;

  var materials = [];

  var materialIndex = 1;

  var numNodes = 10;

  var headRadius = 18.0;

  var girth = 6.4;

  var reduction = 0;

  var frequency = 0.08;

  var count = 0;

  var segmentsX = 11;

  geometry = new THREE.CylinderGeometry(headRadius, 0, numNodes * 10, segmentsX - 1, numNodes - 1, true);
  return new THREE.Mesh(geometry,new THREE.MeshNormalMaterial());
};

function updateMesh() {
  var M_2PI, M_count_10, angle, i, j, ondulation, radius, vertice, vertices, _i, _j, _ref, _ref1;
  vertices = mesh.geometry.vertices;
  M_2PI = Math.PI * 2;
  M_count_10 = count / 10;
  for (i = _i = 0, _ref = numNodes; _i < _ref; i = _i += 1) {
    for (j = _j = 0, _ref1 = segmentsX; _j < _ref1; j = _j += 1) {
      vertice = vertices[i * segmentsX + j];
      console.log(vertice)
      if (vertice) {
        vertice.z = i * girth;
      }
      ondulation = Math.cos(i / (numNodes - 1) * M_2PI + count) * 10;
      radius = headRadius - headRadius * (1 - i / (numNodes - 1)) * reduction;
      angle = j / 10 * M_2PI + M_count_10;
      if (vertice) {

        vertice.y = Math.cos(angle) * radius + ondulation;
        vertice.x = Math.sin(angle) * radius + ondulation;
      }
    }
  }
  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;
  mesh.material = new THREE.MeshNormalMaterial();
};

function animate() {
  requestAnimationFrame( animate );
  // for (i = _i = 0; _i < 16; i = _i += 1) {
  //   tentacles[i].update();
  // }
  count += frequency;
  updateMesh();
  renderer.render( scene, camera );

}

})();
