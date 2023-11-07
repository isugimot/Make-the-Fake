class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, 640, 500, 'starfield').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(0,0, 640, 500, 'starfield2').setOrigin(0,0);
        this.rocketSpeed = -300;
        this.rocketSpeedMax = -1500;
        this.bonusSpeed = -50;
        level = 0;
        Bpoint = 0;
        this.bonus;
        this.shake = false;
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

        this.bonusGroup = this.add.group({
            runChildUpdate: true
        });
        
        this.time.delayedCall(2500, () => {
            this.addRocket();
            this.addBonus();
        });

        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });

        
        cursors = this.input.keyboard.createCursorKeys();
        this.score = this.add.bitmapText(0, 20, 'gem', level).setOrigin(0, 0.5);
    }

    addRocket(){
        let speedVariance = Phaser.Math.Between(0, 50);
        let rocket = new Rocket(this, this.rocketSpeed - speedVariance);
        let rocket2;
        if(this.hard == true){
            rocket2 = new Rocket(this, this.rocketSpeed - speedVariance);
        }
        this.rocketGroup.add(rocket);
    }

    addBonus(){
        this.bonus = new Bonus(this, this.bonusSpeed - Phaser.Math.Between(-10, 10));
    }

    update(){
        this.score.text = level;
        this.starfield.tilePositionX += this.rocketSpeed/2;
        this.starfield2.tilePositionX += 3;
        this.starfield2.tilePositionY -= 4;
        if(!this.player.destroyed){
            if(cursors.up.isDown){
                this.player.body.velocity.y -= playerVelocity;
            } else if(cursors.down.isDown){
                this.player.body.velocity.y += playerVelocity;
            }
            this.physics.world.collide(this.player, this.rocketGroup, this.playerCollision, null, this);
            this.physics.world.collide(this.player, this.bonus, this.bonusPoint, null, this);
        }
    }

    levelBump(){
        level++;
        if(this.shake == true){
            this.cameras.main.shake(1000, 0.005);
        }
        if(level % 5 == 0) {
            if(this.rocketSpeed >= this.rocketSpeedMax){
                this.rocketSpeed -= 25;
                this.bgm.rate += 0.01;
            }
        }
        if(level == 50){
            this.shake = true;
        }
        if(level == 100){
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
        this.sound.play('death');
        this.player.destroy();
        this.cameras.main.flash(2000);
        this.time.delayedCall(2000, () => {this.scene.start('EndScene');});
    }

    bonusPoint(){
        Bpoint += 10;
        this.sound.play('bonus');
        this.bonus.destroy();
        this.addBonus();
    }
}