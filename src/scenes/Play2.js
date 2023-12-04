class Play2 extends Phaser.Scene {
    constructor() {
        super('Play2Scene');
    }

    create() {
        this.field = this.add.tileSprite(0, 0, 640, 500, 'field').setOrigin(0, 0);

        this.add.bitmapText(centerX, centerY, 'gem', 'PRESS UP ARROW, STILL WORKING ON HERE!', 28).setOrigin(0.5);
        cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            this.scene.start('EndScene')
        }
    }
}