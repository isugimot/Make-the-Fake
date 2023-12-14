class Write extends Phaser.Scene {
    constructor() {
        super('WriteScene');
    }

    create(){
        //Some codes I gave up on
        /*const Player = 1;
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
        });*/
        this.field = this.add.tileSprite(0, 0, 640, 500, 'field').setOrigin(0, 0);
        this.add.bitmapText(centerX, centerY - 150, 'gem', 'CHOOSE YOUR CHARACTER').setOrigin(0.5);
        this.Face1 = this.add.sprite(centerX/3, centerY, 'Face1').setScale(4).preFX.addGlow();
        this.Face2 = this.add.sprite(centerX*1.66, centerY, 'Face2').setScale(4).preFX.addGlow();
        this.Face2.active = false;
        this.add.bitmapText(centerX, centerY + 150, 'gem', 'LEFT OR RIGHT KEY TO CHOOSE').setOrigin(0.5).setTint(0x000000);
        this.add.bitmapText(centerX, centerY + 200, 'gem', 'PRESS UP TO PLAY BALL').setOrigin(0.5).setTint(0x000000);
        cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.left)){
            skin = 1;
            this.Face1.active = true;
            this.Face2.active = false;
        }else if(Phaser.Input.Keyboard.JustDown(cursors.right)){
            skin = 2
            this.Face1.active = false;
            this.Face2.active = true;
        }

        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            this.sound.play('start');
            this.cameras.main.flash(2000);
            this.time.delayedCall(2000, () => {this.scene.start('PlayScene')});
        }
    }
}