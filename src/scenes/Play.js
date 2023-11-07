class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        this.rocketSpeed = -300;
        this.rocketSpeedMax = -1500;
        level = 0;
        this.hard = false;

        this.bgm = this.sound.add('loopBGM', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        });
        this.bgm.play();

        this.player = this.physics.add.sprite(2*centerX/3, centerY, 'player').setOrigin(0.5);
        this.player.setCollideWorldBounds(true);
        this.player.setImmovable();
        this.player.setMaxVelocity(0, 600);
        this.player.destroyed = false;
        
        this.rocketGroup = this.add.group({
            runChildUpdate: true
        });
        this.time.delayedCall(2500, () => {
            this.addRocket();
        });

        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });
        cursors = this.input.keyboard.createCursorKeys();
        
    }

    addRocket(){
        let speedVariance = Phaser.Math.Between(0, 50);
        let rocket = new Rocket(this, this.rocketSpeed - speedVariance);
        this.rocketGroup.add(rocket);
    }

    update(){
        if(!this.player.destroyed){
            if(cursors.up.isDown){
                this.player.body.velocity.y -= playerVelocity;
            } else if(cursors.down.isDown){
                this.player.body.velocity.y += playerVelocity;
            }
            this.physics.world.collide(this.player, this.rocketGroup, this.playerCollision, null, this);

        }
    }

    levelBump(){
        level++;
        if(level % 5 == 0) {
            if(this.rocketSpeed >= this.rocketSpeedMax){
                this.rocketSpeed -= 25;
                this.bgm.rate += 0.01;
            }
        }
        if(level == 50){
            this.player.scaleY = 0.75;
        }
        if(level == 100){
            this.player.scaleY = 0.5;
            this.hard = true;
        }
    }

    playerCollision() {
        this.player.destroyed = true;
        this.difficultyTimer.destroy();
        this.tweens.add({
            targets: this.bgm,
            volume: 0,
            ease: 'Linear',
            duration: 2000,
        });

        this.player.destroy();
        this.time.delayedCall(2000, () => {this.scene.start('EndScene');});
    }

}