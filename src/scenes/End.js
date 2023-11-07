class End extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    create(){
        console.log(localStorage.getItem('hiscore'))
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            if(level > storedScore){
                localStorage.setItem('hiscore', level.toString());
                highScore = level;
                newHighScore = true;
            } else {
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        }else {
            highScore = level;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }
        if(newHighScore) {
            this.add.bitmapText(centerX, centerY - 100, 'gem', 'New Hi-Score', 32).setOrigin(0.5);
        }
        this.add.bitmapText(centerX, centerY, 'gem', 'Score: ' + level, 48).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + 100, 'gem', 'Best Score: '+ highScore, 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + 200, 'gem', 'Press UP ARROW to Restart', 36).setOrigin (0.5);
        
        cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            this.scene.start('PlayScene');
        }
    }
}