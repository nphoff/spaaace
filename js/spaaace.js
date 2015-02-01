//Example three.js scene
(function() {
    var Game = function() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        this.keyboarder = new Keyboarder();

        //Keeping track of frames
        this.requestId;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var geometry = new THREE.DodecahedronGeometry(3, 1);
        var green_material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        green_material.wireframe = true;
        var cube = new THREE.Mesh( geometry, green_material );
        this.scene.add( cube );


        this.camera.position.z = 5;

        var tick = function () {
            this.requestId = requestAnimationFrame(tick);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            this.update();

            this.renderer.render(this.scene, this.camera);
        }.bind(this);

        tick();
    };

    Game.prototype = {
        update : function() {
            if (this.keyboarder.isDown(this.keyboarder.KEYS.GENERAL.ESC)) {
                //break from the game loop, stop the laptop toaster.
                window.cancelAnimationFrame(this.requestId);
                this.requestId = undefined;
                throw "Exiting because received ESC";
            }
            if (this.keyboarder.isDown(this.keyboarder.KEYS.GENERAL.ENTER)) {
                //Manual debugging, hit enter :)
                this.keyboarder.keyUp[this.keyboarder.KEYS.GENERAL.ENTER];
                debugger;
            }
        },
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

        this.keyUp = function(keyCode) {
            keyState[keyCode] = false;
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
