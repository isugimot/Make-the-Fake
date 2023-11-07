class End extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    create(){
        this.totalS = level + Bpoint;
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            if(this.totalS > storedScore){
                localStorage.setItem('hiscore', this.totalS.toString());
                highScore = this.totalS;
                newHighScore = true;
            } else {
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        }else {
            highScore = this.totalS;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }
        if(newHighScore) {
            this.add.bitmapText(centerX, centerY - 100, 'gem', 'New Hi-Score', 32).setOrigin(0.5);
        }
        this.add.bitmapText(centerX, centerY, 'gem', 'Score: ' + this.totalS, 48).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + 100, 'gem', 'Best Score: '+ highScore, 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + 200, 'gem', 'Press UP ARROW to Restart', 36).setOrigin (0.5);
        
        cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            this.sound.play('retry');
            this.cameras.main.flash(500);
            this.time.delayedCall(1000, () => {this.cameras.main.flash(500);});
            this.time.delayedCall(1500, () => {this.cameras.main.flash(500);});
            this.time.delayedCall(3000, () => {this.scene.start('PlayScene');});
        }
    }
}