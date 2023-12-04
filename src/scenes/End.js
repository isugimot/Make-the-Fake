class End extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    create(){
        this.totalS = point;
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
        if(point > point2){
            this.add.bitmapText(centerX, centerY - 200, 'gem', 'YOU WIN', 50).setOrigin(0.5);
        } else if (point < point2){
            this.add.bitmapText(centerX, centerY - 200, 'gem', 'YOU LOSE', 50).setOrigin(0.5);
        } else if (point == point2){
            this.add.bitmapText(centerX, centerY - 200, 'gem', 'DRAW', 50).setOrigin(0.5);
        }
        this.add.bitmapText(centerX, centerY, 'gem', 'Score: ' + this.totalS, 48).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + 100, 'gem', 'Best Score: '+ highScore, 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + 200, 'gem', 'Press UP ARROW to Restart', 36).setOrigin (0.5);
        
        cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            //Planning to jump to the WriteScene in the final product
            strike = 0;
            round = 1;
            point = 0;
            point2 = 0;
            this.scene.start('PlayScene')
        }
    }
}