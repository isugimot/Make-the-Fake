class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        //Still an early prototype.
        this.field = this.add.tileSprite(0, 0, 640, 500, 'field').setOrigin(0, 0);
        this.score = this.add.bitmapText(0, 20, 'gem', point).setOrigin(0, 0.5);
        this.hitter = this.physics.add.sprite(centerX - 50, centerY * 1.5, 'hitter').setOrigin(0.5);
        this.hitter.setImmovable();

        this.ballGroup = this.add.group({
            runChildUpdate: true
        });

        this.time.delayedCall(2500, () => {
            this.addBall();
        });

        cursors = this.input.keyboard.createCursorKeys();
    }

    addBall(){
        let speedVariance = Phaser.Math.Between(0, 50);
        let ball = new Ball(this, ballVelocity + speedVariance);
        this.ballGroup.add(ball);
    }

    update(){
        this.score.text = point;

        if(strike < 3){
            //Still buggy and incomplete with the motion. The sprite for the pitcher and the hitter aren't made yet as well
            if(cursors.space.isDown){
                this.hitter.x = centerX;
            } else {
                this.hitter.x = centerX - 50;
            }
            this.physics.world.collide(this.hitter, this.ballGroup, this.ballCollision, null, this);

        } else if (strike == 3){
            round += 1;
            //Planning to make another play scene for the pitching side
            this.scene.start('Play2Scene')
        }
        if (round == 9){
            this.scene.start('EndScene')
        }
    }

    ballCollision(){
        point += 1;
        this.sound.play('hit');
    }

}