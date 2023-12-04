class Menu extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }


    preload(){
        this.load.path = './assets/';
        this.load.audio('BGM', 'audio/BGM.mp3')
        this.load.audio('hit', 'audio/hit.mp3')
        this.load.image('field', 'img/field.png');
        this.load.bitmapFont('gem', 'font/gem.png', 'font/gem.xml');
        this.load.image('dot', 'img/dot.png');
        this.load.image('ball', 'img/ball.png')
    }


    create(){
        strike = 0;
        round = 1;
        point = 0;
        point2 = 0;
        this.add.bitmapText(centerX, centerY, 'gem', 'OH! THAT\'S A BASEBALL!', 44).setOrigin(0.5).setTint(0xffff00);
        this.add.bitmapText(centerX, centerY+100, 'gem', 'PRESS UP ARROW TO START').setOrigin(0.5).setTint(0xffff00);
        this.add.bitmapText(centerX, centerY+150, 'gem', 'Most of the code is incomplete').setOrigin(0.5).setTint(0xffff00);
        this.add.bitmapText(centerX, centerY+200, 'gem', 'Music by Music by u_4rz47emqxz from Pixabay', 10).setOrigin(0.5).setTint(0xffff00);
        cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            //this.scene.start('WriteScene')
            //WriteScene is not working currently
            this.bgm = this.sound.add('BGM', {
                mute: false,
                volume: 1,
                rate: 1,
                loop: true
            });
            this.bgm.play();
            this.scene.start('PlayScene')
        }
    }
}