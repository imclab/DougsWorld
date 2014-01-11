(function() {
  var World,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  FW.World = World = (function() {
    function World() {
      this.animate = __bind(this.animate, this);
      var light1, light2,
        _this = this;
      FW.clock = new THREE.Clock();
      this.SCREEN_WIDTH = window.innerWidth;
      this.SCREEN_HEIGHT = window.innerHeight;
      this.camFar = 200000;
      FW.width = 10000;
      FW.camera = new THREE.PerspectiveCamera(45.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, 10, 2750);
      this.controls = new THREE.OrbitControls(FW.camera);
      FW.scene = new THREE.Scene();
      FW.Renderer = new THREE.WebGLRenderer();
      FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
      document.body.appendChild(FW.Renderer.domElement);
      light1 = new THREE.DirectionalLight(0xffffff, 0.5);
      light1.position.set(1, 1, 1);
      FW.scene.add(light1);
      light2 = new THREE.DirectionalLight(0xffffff, 1.5);
      light2.position.set(0, -1, 0);
      FW.scene.add(light2);
      this.generateNodes();
      window.addEventListener("resize", (function() {
        return _this.onWindowResize();
      }), false);
    }

    World.prototype.onWindowResize = function(event) {
      this.SCREEN_WIDTH = window.innerWidth;
      this.SCREEN_HEIGHT = window.innerHeight;
      FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
      FW.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
      return FW.camera.updateProjectionMatrix();
    };

    World.prototype.animate = function() {
      var delta, time;
      requestAnimationFrame(this.animate);
      delta = FW.clock.getDelta();
      time = Date.now();
      this.controls.update();
      return this.render();
    };

    World.prototype.render = function() {
      var delta;
      delta = FW.clock.getDelta();
      return FW.Renderer.render(FW.scene, FW.camera);
    };

    World.prototype.generateNodes = function() {
      var ab, ax, ay, az, bx, byy, bz, cb, chunkSize, color, colors, cx, cy, cz, d, d2, geometry, i, material, mesh, n, n2, normals, nx, ny, nz, offset, offsets, pA, pB, pC, positions, q, triangles, vx, vy, vz, x, y, z, _i, _j, _k, _ref, _ref1;
      triangles = 2;
      geometry = new THREE.BufferGeometry();
      geometry.addAttribute('index', Uint16Array, triangles * 3, 1);
      geometry.addAttribute('position', Float32Array, triangles * 3, 3);
      geometry.addAttribute('normal', Float32Array, triangles * 3, 3);
      geometry.addAttribute('color', Float32Array, triangles * 3, 3);
      chunkSize = 6;
      q = geometry.attributes.index.array;
      for (i = _i = 0, _ref = q.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        q[i] = i;
      }
      positions = geometry.attributes.position.array;
      normals = geometry.attributes.normal.array;
      colors = geometry.attributes.color.array;
      color = new THREE.Color();
      n = 800;
      n2 = n / 2;
      d = 1000;
      d2 = d / 2;
      pA = new THREE.Vector3();
      pB = new THREE.Vector3();
      pC = new THREE.Vector3();
      cb = new THREE.Vector3();
      ab = new THREE.Vector3();
      for (i = _j = 0, _ref1 = positions.length; _j < _ref1; i = _j += 9) {
        x = 0;
        y = 0;
        z = 0;
        ax = x + Math.random() * d - d2;
        ay = y + Math.random() * d - d2;
        az = z + Math.random() * d - d2;
        bx = x + Math.random() * d - d2;
        byy = y + Math.random() * d - d2;
        bz = z + Math.random() * d - d2;
        cx = x + Math.random() * d - d2;
        cy = y + Math.random() * d - d2;
        cz = z + Math.random() * d - d2;
        positions[i] = ax;
        positions[i + 1] = ay;
        positions[i + 2] = az;
        positions[i + 3] = bx;
        positions[i + 4] = byy;
        positions[i + 5] = bz;
        positions[i + 6] = cx;
        positions[i + 7] = cy;
        positions[i + 8] = cz;
        pA.set(ax, ay, az);
        pB.set(bx, byy, bz);
        pC.set(cx, cy, cz);
        cb.subVectors(pC, pB);
        ab.subVectors(pA, pB);
        cb.cross(ab);
        cb.normalize();
        nx = cb.x;
        ny = cb.y;
        nz = cb.z;
        normals[i] = nx;
        normals[i + 1] = ny;
        normals[i + 2] = nz;
        normals[i + 3] = nx;
        normals[i + 4] = ny;
        normals[i + 5] = nz;
        normals[i + 6] = nx;
        normals[i + 7] = ny;
        normals[i + 8] = nz;
        vx = (x / n) + 0.9;
        vy = (y / n) + 0.1;
        vz = (z / n) + 0.9;
        color.setRGB(vx, vy, vz);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
        colors[i + 3] = color.r;
        colors[i + 4] = color.g;
        colors[i + 5] = color.b;
        colors[i + 6] = color.r;
        colors[i + 7] = color.g;
        colors[i + 8] = color.b;
      }
      geometry.offsets = [];
      offsets = triangles / chunkSize;
      for (i = _k = 0; 0 <= offsets ? _k < offsets : _k > offsets; i = 0 <= offsets ? ++_k : --_k) {
        offset = {
          start: i * chunkSize * 3,
          index: i * chunkSize * 3,
          count: Math.min(triangles - (i * chunkSize), chunkSize) * 3
        };
        geometry.offsets.push(offset);
      }
      geometry.computeBoundingSphere();
      material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        ambient: 0xaaaaaa,
        specular: 0xffffff,
        shininess: 250,
        side: THREE.DoubleSide,
        vertexColors: THREE.VertexColors
      });
      mesh = new THREE.Mesh(geometry, material);
      return FW.scene.add(mesh);
    };

    return World;

  })();

}).call(this);
