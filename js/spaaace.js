//Example three.js scene
(function() {
    var Game = function() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var green_material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, green_material );
        this.scene.add( cube );

        this.camera.position.z = 5;

        var tick = function () {
            requestAnimationFrame(tick);

            cube.rotation.x += 0.1;
            cube.rotation.y += 0.1;

            this.renderer.render(this.scene, this.camera);
        }.bind(this);

        tick();
    };

    var Keyboarder = function() {
        var keyState = {};

        window.addEventListener('keydown', function(e) {
            keyState[e.keyCode] = true;
        });

        window.addEventListener('keyup', function(e) {
            keyState[e.keyCode] = false;
        });

        this.isDown = function(keyCode) {
            return keyState[keyCode] === true;
        };

        this.KEYS = {
            GENERAL: { SPACE: 32, ESC: 27, ENTER: 13 },
            //P1 : arrow keys.
            P1: { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40 },
            //P2 : WASD
            P2: { LEFT: 65, RIGHT: 68, UP: 87, DOWN: 83 },
            //P3 : IJKL
            P3: { LEFT: 74, RIGHT: 76, UP: 73, DOWN: 75 },
            //P4 : GVBN
            P4: { LEFT: 86, RIGHT: 78, UP: 71, DOWN: 66}
        };

    };

    window.addEventListener('load', function() {
        new Game();
    });

})();
