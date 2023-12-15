class Menu extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }


    preload(){
        //Loading the assets
        this.load.path = './assets/';
        this.load.audio('BGM', 'audio/BGM.mp3');
        this.load.audio('hit', 'audio/hit.mp3');
        this.load.audio('catch', 'audio/catch.mp3');
        this.load.audio('throw', 'audio/Pitcher.mp3');
        this.load.audio('point', 'audio/point.mp3');
        this.load.audio('start', 'audio/click-124467.mp3');
        this.load.audio('whistle', 'audio/whistle.mp3');
        this.load.audio('over', 'audio/over.mp3');
        this.load.audio('last', 'audio/last.mp3');

        this.load.image('field', 'img/field.png');
        
        this.load.bitmapFont('gem', 'font/gem.png', 'font/gem.xml');

        this.load.image('dot', 'img/dot.png');
        this.load.image('ball', 'img/ball.png')
        this.load.image('bat', 'img/bat.png')
        this.load.image('Pitcher', 'img/pitcher.png')
        this.load.image('Hitter', 'img/hitter.png')
        this.load.image('Face1', 'img/Face1.png')
        this.load.image('Face2', 'img/Face2.png')
    }


    create(){
        //Setting values and texts
        skin = 1;
        strike = 0;
        point = 0;
        point2 = 0;
        side = 1;
        this.add.bitmapText(centerX, centerY, 'gem', 'OH! THAT\'S A BASEBALL!', 44).setOrigin(0.5).setTint(0xffff00);
        this.add.bitmapText(centerX, centerY+50, 'gem', 'FOR 2 PLAYER', 20).setOrigin(0.5).setTint(0xffff00);
        this.add.bitmapText(centerX, centerY+100, 'gem', 'PRESS UP ARROW TO START, SPACE TO SWING BAT', 28).setOrigin(0.5).setTint(0xffff00);
        this.add.bitmapText(centerX, centerY+150, 'gem', 'WARNING: THIS GAME IS NOT AN ACCURATE BASEBALL GAME.', 20).setOrigin(0.5).setTint(0xffffff);
        this.add.bitmapText(centerX, centerY+200, 'gem', 'Music by Music by u_4rz47emqxz from Pixabay', 10).setOrigin(0.5).setTint(0xffff00);
        cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            //Move on to the write scene.
            this.bgm = this.sound.add('BGM', {
                mute: false,
                volume: 1,
                rate: 1,
                loop: true
            });
            this.bgm.play();
            this.scene.start('WriteScene')
        }
    }
}