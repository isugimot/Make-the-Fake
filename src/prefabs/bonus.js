class Bonus extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, game.config.width + 20, Phaser.Math.Between(10, game.config.height - 10), 'bonus');
        
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();

    }

    update() {
        if(this.x < - this.width){
            this.parentScene.addRocket(this.parent, this.velocity);
            this.destroy;
        }
    }
}