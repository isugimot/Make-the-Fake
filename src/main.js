// Ichiro Sugimoto
// Oh! That's a Baseball
// Used components: Physics systems, timers, text objects, tween manager, pipeline FX, particle effects


'use strict';

let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 500,
    width: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Write, Play, End ]
}

let game = new Phaser.Game(config);

let centerX = game.config.width/2;
let centerY = game.config.height/2;
let gameX = game.config.width;
let gameY = game.config.height;
let skin = 1;
let strike = 0;
let side = 1;
let point = 0;
let point2 = 0;
let pointMax = 0;
let ballVelocity = 300;
let ballHeight = 20;
let ballWidth = 20;
let cursors;
