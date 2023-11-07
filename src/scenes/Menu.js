class Menu extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }


    preload(){
        this.load.path = './assets/';
        this.load.audio('loopBGM', 'audio/loopBGM.mp3');
        this.load.image('player', 'img/player.png');
        this.load.bitmapFont('gem', 'font/gem.png', 'font/gem.xml');
    }


    create(){
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }
        let title1 = this.add.bitmapText(centerX, centerY, 'gem', 'SPACE RUNNER', 64).setOrigin(0.5).setTint(0xffff00);
        let explanation = this.add.bitmapText(centerX, centerY+100, 'gem', 'PRESS UP ARROW TO START').setOrigin(0.5).setTint(0xffff00);
        let control = this.add.bitmapText(centerX, centerY+150, 'gem', 'USE UP AND DOWN ARROW TO MOVE').setOrigin(0.5).setTint(0xffff00);
        let citation = this.add.bitmapText(centerX, centerY+200, 'gem', 'Music by Maksym Dudchyk from Pixabay').setOrigin(0.5).setTint(0xffff00);
        cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            this.scene.start('PlayScene')
        }
    }
}