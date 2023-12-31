class End extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    create(){
        //Showing which side won.
        if(point > point2){
            this.add.bitmapText(centerX, centerY - 100, 'gem', 'PLAYER 1 WIN', 50).setOrigin(0.5);
            if(point2 == 0){
                this.called = this.add.bitmapText(centerX, centerY - 50, 'gem', 'CALLED GAME').setOrigin(0.5);

                this.emitter = this.add.particles(0, 0, 'dot', {
                    alpha: 0.1,
                    speed: 24,
                    lifespan: 1500,
                    quantity: 10,
                    scale: { start: 0.4, end: 0 },
                    emitZone: { type: 'edge', source: this.called.getBounds(), quantity: 42 },
                });
            }
        } else if (point < point2){
            this.add.bitmapText(centerX, centerY - 100, 'gem', 'PLAYER 2 WIN', 50).setOrigin(0.5);
            if(point == 0){
                this.called = this.add.bitmapText(centerX, centerY - 50, 'gem', 'CALLED GAME').setOrigin(0.5);

                this.emitter = this.add.particles(0, 0, 'dot', {
                    alpha: 0.1,
                    speed: 24,
                    lifespan: 1500,
                    quantity: 10,
                    scale: { start: 0.4, end: 0 },
                    emitZone: { type: 'edge', source: this.called.getBounds(), quantity: 42 },
                });

            }
        }
        //Showing the point and the text.
        this.sound.play('over');
        this.add.bitmapText(centerX, centerY, 'gem', point + ' : ' + point2, 48).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + 200, 'gem', 'Press UP ARROW to Restart', 36).setOrigin (0.5);
        
        cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            //Reset the value and restart
            strike = 0;
            point = 0;
            point2 = 0;
            pointMax = 0;
            skin = 1;
            side = 1;
            this.scene.start('WriteScene')
        }
    }
}