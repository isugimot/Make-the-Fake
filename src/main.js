// Ichiro Sugimoto
// Space Runner
//
//

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
    scene: [ Menu, Play, End ]
}

let game = new Phaser.Game(config);

let centerX = game.config.width/2;
let centerY = game.config.height/2;
let gameX = game.config.width;
let gameY = game.config.height;
let playerVelocity = 50;
let rocketHeight = 50;
let rocketWidth = 100;
let level;
let highScore;
let newHighScore = false;
let cursors;
