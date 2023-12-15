class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        //Adding the sprites and texts.
        game.canTweenFlag = true;
        game.spaceDown = false;
        game.whistleFlag = true;
        strike = 0;
        this.field = this.add.tileSprite(0, 0, 640, 500, 'field').setOrigin(0, 0);
        this.score = this.add.bitmapText(0, 20, 'gem', 'Player ' + side + ': ' + point).setOrigin(0, 0.5);
        if(side == 1){
            this.score.tint = (0xff0000)
        } else if (side == 2){
            this.score.tint = (0x0000ff)
        }
        this.bat = this.physics.add.sprite(centerX - 75, centerY * 1.5, 'bat').setOrigin(0, 0.5);
        this.hitter = this.add.sprite(centerX - 50, centerY*1.5, 'Hitter').setScale(4);
        this.bat.angle = 90;
        this.bat.setImmovable();

        this.ballGroup = this.add.group({
            runChildUpdate: true
        });

        this.time.delayedCall(2500, () => {
            this.addBall();
        });
        this.pitcher = this.add.sprite(centerX, centerY/3 + 50, 'Pitcher').setScale(4);

        //Change the face of the characters depending on who's round it is and which character was chosen.
        if(skin == 1 && side == 1){
            this.head1 = this.add.sprite(centerX - 47, centerY*1.45, 'Face1')
            this.head2 = this.add.sprite(centerX, centerY/3 + 40, 'Face2')
        }else if(skin == 1 && side == 2){
            this.head2 = this.add.sprite(centerX - 47, centerY*1.45, 'Face2')
            this.head1 = this.add.sprite(centerX, centerY/3 + 40, 'Face1')
        }else if(skin == 2 && side == 1){
            this.head2 = this.add.sprite(centerX - 47, centerY*1.45, 'Face2')
            this.head1 = this.add.sprite(centerX, centerY/3 + 40, 'Face1')
        }else if(skin == 2 && side == 2){
            this.head1 = this.add.sprite(centerX - 47, centerY*1.45, 'Face1')
            this.head2 = this.add.sprite(centerX, centerY/3 + 40, 'Face2')
        }

        cursors = this.input.keyboard.createCursorKeys();
    }

    addBall(){
        //Adding a ball with a random type.
        let speedVariance = Phaser.Math.Between(0, 50);
        let random = Math.floor(Math.random() *4);
        let ball = new Ball(this, ballVelocity + speedVariance, random);
        this.ballGroup.add(ball);
        this.sound.play('throw');
    }

    update(){
        //Checking the larger of the two points
        pointMax = Math.max(point, point2);
        //Check which side is currently playing.
        if(side == 1){
            this.score.text = 'Player ' + side + ': ' + point;
        } else if(side == 2){
            this.score.text = 'Player ' + side + ': ' + point2;
        }

        if(strike < 3){
            //Press space to swing the bat and hit the ball.
            if(cursors.space.isDown && game.canTweenFlag == true && game.spaceDown == false){
                game.spaceDown = true;
                game.canTweenFlag = false;
                this.tweens.add({
                    targets: this.bat,
                    x: centerX,
                    angle: 0,
                    duration: 50,
                    onComplete: function(){game.canTweenFlag = true;}
                })
            } else if(game.canTweenFlag){
                game.canTweenFlag = false;
                this.tweens.add({
                    targets: this.bat,
                    delay: 100,
                    x: centerX - 75,
                    angle: 90,
                    duration: 100,
                    onComplete: function(){game.canTweenFlag = true;}
                })
            } else if(!cursors.space.isDown){
                game.spaceDown = false;
            }
            this.physics.world.collide(this.bat, this.ballGroup, this.ballCollision, null, this);

        } else if (strike == 3){
            //Change side if thereare 3 strikes. It should be 9 strikes in the real baseball, but I felt that it will be too long as a game.
            if(game.whistleFlag == true){
                this.sound.play('whistle');
                game.whistleFlag = false;
            }
            this.ballGroup.clear();
            this.bat.destroy();
            //Clearing and destroying ball and bat so that there will be no more motion.
            this.add.bitmapText(centerX, centerY, 'gem', 'PRESS UP TO CHANGE SIDE', 24).setOrigin(0.5);
            if(Phaser.Input.Keyboard.JustDown(cursors.up)){
                if(side == 1){
                    side = 2
                } else if(side == 2){
                    side = 1
                }
                this.scene.start('PlayScene')
            };
        }
        if (pointMax == 5){
            //The original scene on the Jojo anime ended ad 5:4, so the first player to reach 5 points will win.
            if(game.whistleFlag == true){
                this.sound.play('last');
                game.whistleFlag = false;
            }
            this.ballGroup.clear();
            this.bat.destroy();
            this.cameras.main.flash(1000);
            this.time.delayedCall(1000, () => {this.cameras.main.flash(1000)});
            this.time.delayedCall(2000, () => {this.scene.start('EndScene')});
        }
    }

    //Just a simple code that makes some sound.
    ballCollision(){
        this.sound.play('hit');
    }

}