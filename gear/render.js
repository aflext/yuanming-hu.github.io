// Generated by CoffeeScript 1.8.0
(function() {
  var RGB, binary_color, init, to_box2d_vectors, to_three_vectors, webGLStart;

  to_three_vectors = $.util.to_three_vectors;

  to_box2d_vectors = $.util.to_box2d_vectors;

  binary_color = $.util.binary_color;

  RGB = $.util.RGB;

  console.log(x);

  init = function() {};

  webGLStart = function() {
    var camera, composer, directionalLight, effect, fps, halfSize, height, i, light, margin, ratio, render, renderer, scene, size, start_time, stats, vec, welcome_scene, width;
    init();
    width = 100;
    height = width;
    halfSize = 32;
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-halfSize + 3, halfSize + 3, halfSize, -halfSize, -1000, 1000);
    camera.rotateY(Math.PI / 4);
    camera.updateMatrixWorld();
    camera.matrixAutoUpdate = true;
    vec = new THREE.Vector3(1, 0, 0);
    camera.rotateOnAxis(vec, -Math.PI / 180 * 40);
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    size = Math.min(window.innerHeight, window.innerWidth) - 10;
    renderer.setSize(size, size);
    renderer.setClearColor(binary_color([0.25, 0.8, 0.8]));
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    document.body.appendChild(renderer.domElement);
    margin = (window.innerWidth - window.innerHeight - 10) / 2;
    $(renderer.domElement).css({
      'margin-left': "" + margin + "px"
    });
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.001);
    directionalLight.position.set(0, 400, -800);
    directionalLight.castShadow = true;
    directionalLight.shadowDarkness = 0.3;
    directionalLight.shadowCameraRight = 25;
    directionalLight.shadowCameraLeft = -25;
    directionalLight.shadowCameraTop = 25;
    directionalLight.shadowCameraBottom = -25;
    directionalLight.shadowMapWidth = 2048 * 1;
    directionalLight.shadowMapHeight = 1024 * 1;
    scene.shadowLight = directionalLight;
    scene.add(directionalLight);
    directionalLight = new THREE.DirectionalLight(0xffff88, 0.4);
    directionalLight.position.set(400, 400, 0);
    scene.add(directionalLight);
    directionalLight = new THREE.DirectionalLight(0x8888ff, 0.4);
    directionalLight.position.set(-400, 400, 0);
    scene.add(directionalLight);
    light = new THREE.AmbientLight(binary_color((function() {
      var _i, _results;
      _results = [];
      for (i = _i = 0; _i < 3; i = ++_i) {
        _results.push(0.6);
      }
      return _results;
    })()));
    scene.add(light);
    welcome_scene = new $.GameScene(scene);
    start_time = Date.now();
    composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));
    effect = new THREE.ShaderPass(THREE.DarkCornerShader);
    effect.renderToScreen = true;
    composer.addPass(effect);
    ratio = 1;
    composer.setSize(window.innerWidth * ratio, window.innerHeight * ratio);
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    window.stats_window = stats;
    render = function() {
      var t;
      fps += 1;
      stats.update();
      requestAnimationFrame(render);
      t = Date.now() - start_time;
      welcome_scene.update(t, $.util.keyCode);
      return composer.render();
    };
    render();
    return fps = 0;
  };

  $('body').ready(function() {
    webGLStart();
    $('body').keyup(function(event) {
      return $.util.keyCode[String.fromCharCode(event.keyCode)] = false;
    });
    return $('body').keydown(function(event) {
      $.util.keyCode[String.fromCharCode(event.keyCode)] = true;
      if (String.fromCharCode(event.keyCode) === 'x') {
        return stats_window.opacity(0);
      }
    });
  });

}).call(this);

//# sourceMappingURL=render.js.map
