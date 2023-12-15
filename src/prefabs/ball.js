class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, type){
        //Set the position where the ball is thrown and also set some of the values
        super(scene, game.config.width/2, game.config.height/3, 'ball', 0);
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        //Checks what type of ball to throw
        if(type == 0){
            this.parentScene.physics.moveTo(this, centerX, centerY*1.5, this.velocity, 300);
        }
        else if(type == 1){
            this.setVelocityY(velocity);
            this.setVelocityX(velocity);
            this.parentScene.time.delayedCall(150, () => {
                this.parentScene.physics.moveTo(this, centerX, centerY*1.5, this.velocity, 300);
            });

        }
        else if(type == 2){
            this.setVelocityY(velocity);
            this.setVelocityX(-velocity);
            this.parentScene.time.delayedCall(150, () => {
                this.parentScene.physics.moveTo(this, centerX, centerY*1.5, this.velocity, 300);
            });
        }
        else if(type == 3){
            this.setVelocityY(velocity * 4);
            this.parentScene.time.delayedCall(80, () => {
                this.setVelocityY(velocity);
            });
        }
        //Set bounce so the ball can be hit
        this.body.setBounce(20, 20);
    }

    update(){
        //Check if the ball wasn't or was hit by the bat.
        if(this.y > game.config.height){
            this.destroy();
            strike += 1;
            this.parentScene.sound.play('catch');
            if(strike < 3){
                this.parentScene.time.delayedCall(2500, () => {
                    this.parentScene.addBall(this.parent, this.velocity);
                });
            }
        }
        if(this.y < 0 || this.x < 0 || this.x > game.config.width){
            this.destroy();
            this.parentScene.sound.play('point');
            if(side == 1){
                point += 1;
            } else if(side == 2){
                point2 += 1;
            }
            if(strike < 3){
                this.parentScene.time.delayedCall(2500, () => {
                    this.parentScene.addBall(this.parent, this.velocity);
                });
            }
        }
    }
}