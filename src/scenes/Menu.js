class Menu extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }


    preload(){
        this.load.path = './assets/';
        this.load.audio('loopBGM', 'audio/loopBGM.mp3');

        this.load.audio('bonus', 'audio/bonus.mp3');
        this.load.audio('death', 'audio/death.mp3');
        this.load.audio('retry', 'audio/retry.mp3');
        this.load.audio('start', 'audio/start.mp3');

        this.load.image('player', 'img/player.png');
        this.load.image('bonus', 'img/bonus.png');
        this.load.image('starfield', 'img/starfield.png');
        this.load.image('starfield2', 'img/starfield2.png');
        this.load.spritesheet('missle', 'img/rocket.png', {frameWidth: 50, frameHeight: 20,startFrame: 0, endFrame: 3});
        this.load.bitmapFont('gem', 'font/gem.png', 'font/gem.xml');
    }


    create(){

        this.anims.create({
            key: 'rocket',
            frames: this.anims.generateFrameNumbers('missle', {
                start: 0,
                end: 3,
                first: 0
            }),
            frameRate: 30,
            repeat: -1
        });
        this.add.bitmapText(centerX, centerY, 'gem', 'SPACE RUNNER', 64).setOrigin(0.5).setTint(0xffff00);
        this.add.bitmapText(centerX, centerY+100, 'gem', 'PRESS UP ARROW TO START').setOrigin(0.5).setTint(0xffff00);
        this.add.bitmapText(centerX, centerY+150, 'gem', 'USE UP AND DOWN ARROW TO MOVE').setOrigin(0.5).setTint(0xffff00);
        this.add.bitmapText(centerX, centerY+200, 'gem', 'Music by Maksym Dudchyk from Pixabay, SE from Pixabay', 10).setOrigin(0.5).setTint(0xffff00);
        cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            this.sound.play('start');
            this.cameras.main.flash(2000);
            this.time.delayedCall(2000, () => {this.scene.start('PlayScene')});
        }
    }
}