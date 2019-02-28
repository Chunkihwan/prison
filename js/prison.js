var renderer, scene, camera, controls, outside;
var WIDTH, HEIGHT; 
var mesh, mesh2;

stageResize();
init();

function init(){
	renderer = new THREE.WebGLRenderer({ antialias : true});
	renderer.setSize( WIDTH, HEIGHT );
	renderer.setPixelRatio( window.devicePixelRatio );
	document.body.appendChild( renderer.domElement );
	renderer.setClearColor(0x000000);
	
	camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, .1, 1000); 

	scene = new THREE.Scene();
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	//  horizontally angle control
	controls.minAzimuthAngle = -Math.PI / 4;
	controls.maxAzimuthAngle = Math.PI / 4;
	// vertical angle control
	controls.minPolarAngle = Math.PI / 2;
	controls.maxPolarAngle = -Math.PI / 2;

	controls.enableZoom = true;
	controls.minDistance = 60;
	controls.maxDistance = 80;
	controls.update();

	spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 140, 300, 100 );
	spotLight.intensity = .6;
	spotLight.angle = 2;
	scene.add( spotLight );
	
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	scene.add( directionalLight );
	
	var _HemisphereLight = new THREE.HemisphereLight( 0xffffff, 0x000000 , .8 );
	_HemisphereLight.position.set(100, -150, -40);
	scene.add(_HemisphereLight);
	
	outside = new THREE.Group();
	var imageLoader = new THREE.TextureLoader();	
	imageLoader.load("https://ucarecdn.com/a7f91b3f-a1e3-4118-bf1f-59e1262d2fbb/universe2_low_3.jpg", function(data){
		var material_univ  = new THREE.MeshBasicMaterial({
				map  : data
				,side  : THREE.BackSide
		})
		var geometry_univ  = new THREE.SphereGeometry(400, 32, 32);
		outside_mesh  = new THREE.Mesh(geometry_univ, material_univ);
		outside.add( outside_mesh );
		scene.add(outside);
	})
	
	var prison = new THREE.Group();
	var material = new THREE.MeshPhongMaterial( { color: 0x222222 } );
	
	var znum = -30;
	var ynum = 10;
	
	var geom_box_left  = new THREE.BoxGeometry(6, 1000, 500);
	mesh_box_left  = new THREE.Mesh(geom_box_left, material);
	mesh_box_left.position.set(-250, ynum, 200);
	prison.add( mesh_box_left );
	
	var geom_box_right  = new THREE.BoxGeometry(6, 1000, 500);
	mesh_box_right  = new THREE.Mesh(geom_box_right, material);
	mesh_box_right.position.set(250, ynum, 200);
	prison.add( mesh_box_right );
	
	var geom_top  = new THREE.BoxGeometry(500, 150, 6);
	mesh  = new THREE.Mesh(geom_top, material);
	mesh.position.set(0, 100 + ynum, znum);
	prison.add( mesh );
	
	
	var geom_bottom  = new THREE.BoxGeometry(500, 250, 6);
	mesh2  = new THREE.Mesh(geom_bottom, material);
	mesh2.position.set(0, -150 + ynum, znum);
	prison.add( mesh2 );
	
	var geom_side  = new THREE.BoxGeometry(200, 50, 6);
	mesh_left  = new THREE.Mesh(geom_side, material);
	mesh_left.position.set(150, ynum, znum);
	prison.add( mesh_left );
	
	mesh_right  = new THREE.Mesh(geom_side, material);
	mesh_right.position.set(-150, ynum , znum);
	prison.add( mesh_right );
	
	
	var cylinderGeometry = new THREE.CylinderGeometry( 2, 2, 50, 15 );
	
	for(var i=0; i<4; i++){
		var cylinder = new THREE.Mesh( cylinderGeometry, material );
		cylinder.position.x = i * 20 - 30;
		cylinder.position.z = znum;
		cylinder.position.y = ynum;
		prison.add( cylinder );
	}
	scene.add( prison );
	render();
}


function render() {
	outside.rotation.y -= 0.0002;
	controls.update();
  renderer.render( scene, camera );
  requestAnimationFrame( render );
}

window.addEventListener( 'resize', stageResize );

function stageResize() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
	
    if(renderer != undefined){
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
				camera.updateProjectionMatrix();
    }
}
