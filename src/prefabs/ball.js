class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity){
        super(scene, game.config.width/2, game.config.height/3, 'ball', 0);
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityY(velocity);
        this.body.setBounce(20, 20);
    }

    update(){
        if(this.y > game.config.height){
            this.destroy();
            strike += 1;
            this.parentScene.time.delayedCall(2500, () => {
                this.parentScene.addBall(this.parent, this.velocity);
            });
        }
        if(this.y < 0 || this.x < 0 || this.x > game.config.width){
            this.destroy();
            this.parentScene.time.delayedCall(2500, () => {
                this.parentScene.addBall(this.parent, this.velocity);
            });
        }
    }
}