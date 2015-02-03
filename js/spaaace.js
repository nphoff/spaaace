//Example three.js scene
(function() {
    var Game = function() {
        this.player = new Player(this);
        this.universe = new Universe(this);
        this.keyboarder = new Keyboarder();

        //Keeping track of frames
        this.requestId;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        //var geometry = new THREE.BoxGeometry( 1, 1, 1 );

        var tick = function () {
            this.requestId = requestAnimationFrame(tick);


            this.update();

            this.renderer.render(this.universe.scene, this.player.camera);
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
            this.universe.update();
            this.player.update();
        },
    };

    var Player = function(game) {
        this.game = game;
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        this.movespeed = 0.1;
        this.camera.position.z = 10;
    };

    Player.prototype = {
        update : function() {
            if (this.game.keyboarder.isDown(this.game.keyboarder.KEYS.PLAYER.LEFT)) {
                this.camera.position.x -= this.movespeed;
            }
            if (this.game.keyboarder.isDown(this.game.keyboarder.KEYS.PLAYER.RIGHT)) {
                this.camera.position.x += this.movespeed;
            }
            if (this.game.keyboarder.isDown(this.game.keyboarder.KEYS.PLAYER.DOWN)) {
                this.camera.position.y -= this.movespeed;
            }
            if (this.game.keyboarder.isDown(this.game.keyboarder.KEYS.PLAYER.UP)) {
                this.camera.position.y += this.movespeed;
            }
            if (this.game.keyboarder.isDown(this.game.keyboarder.KEYS.PLAYER.IN)) {
                this.camera.position.z -= this.movespeed;
            }
            if (this.game.keyboarder.isDown(this.game.keyboarder.KEYS.PLAYER.OUT)) {
                this.camera.position.z += this.movespeed;
            }
        }
    };

    var Universe = function(game) {
        this.game = game;
        this.scene = new THREE.Scene();
        this.radius = 2000;

        this.planets = this.generatePlanets(0, 0, 0);
        this.scene.add(this.planets);
    };

    Universe.prototype = {
        update : function() {
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;
        },

        generatePlanets : function(x, y, z) {
            /* Okay.  So we have a position in space, given by x, y and z.
             * We have the radius of "things we're going to render" given by this.radius,
             * we need to fill in that space procedurally with a galaxy centered at the origin?
             * so.  What I need to do is generate a spiral centered at the origin and sample that
             * for the region of space that I'm actually generating.  Is there a simpler way to do that?
             * Is there a way to not just generate the whole galaxy?  Maybe generate it, and store it, then
             * just pick up the relevant geometry when I need to.  That's a good idea. There is a geometry
             * based hash map.
             * just kidding, generate the whole thing then optimize later if I have to. This shouldn't be
             * getting called ever, really.
             * still. generate it, then look up the stars
             */
            var geometry = new THREE.DodecahedronGeometry(3, 1);
            var green_material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            green_material.wireframe = true;
            this.cube = new THREE.Mesh( geometry, green_material );
            this.cube.position.x = 3;
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
            //P1 : arrow keys, and w and s for in and out.
            PLAYER: { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, IN: 87, OUT:83 },
        };

    };

    window.addEventListener('load', function() {
        new Game();
    });

})();
