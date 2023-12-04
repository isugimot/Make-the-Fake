class Write extends Phaser.Scene {
    constructor() {
        super('WriteScene');
    }

    create(){
        const Player = 1;
        const Mode = 1;
        const Area1 = this.add.renderTexture(64, 64, 128, 128).setInteractive().setDepth(1001);
        this.add.graphics().fillStyle(0x000000).lineStyle(1, 0xffffff).fillRect(0, 0, 128, 128).strokeRect(0, 0, 128, 128).setDepth(1000);

        Area1.on('keydown_SPACE', function (Area1){
            //Don't know how to reset or to move out from create
            Area1.clear();
        })

        Area1.on('pointerdown', function (pointer){
            Area1.draw('dot', pointer.x - 8, pointer.y - 8);
        });
        Area1.on('pointermove', function (pointer){
            if (pointer.isDown){
                Area1.draw('dot', pointer.x - 8, pointer.y - 8);
            }
        });
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            this.scene.start('PlayScene')
        }
    }
}