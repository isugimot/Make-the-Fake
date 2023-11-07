// Ichiro Sugimoto
// Space Runner
// Around 25 hours spent on this project?

// One thing that I did technically interesting was 
//making an item which boosted the score. I did look beyond the class
//examples to try learning something new, mostly around on how to
//create an original texture atlas.

// I think that I did fairely well with the visual style, and 
//I'm particularly proud on the rocket sprite with the texture atlas.
//Something I tried with the endless runner form is having the number
//rockets double after a set amount of time.



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
let rocketHeight = 20;
let rocketWidth = 50;
let level;
let Bpoint;
let highScore;
let newHighScore = false;
let cursors;
