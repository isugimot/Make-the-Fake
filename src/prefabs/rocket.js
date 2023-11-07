class Rocket extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, game.config.width + rocketWidth, Phaser.Math.Between(rocketHeight/2, game.config.height - rocketHeight/2), 'missle', 0);
        
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.newRocket = true;

        this.anims.play('rocket');
    }

    update() {
        if(this.newRocket && this.x < centerX) {
            this.parentScene.addRocket(this.parent, this.velocity);
            this.newRocket = false;
        }
        if(this.x < - this.width){
            this.destroy();
        }
    }
}