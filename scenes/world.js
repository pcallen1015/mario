class World extends Phaser.Scene {

    constructor(key) {
        super({ key });
    }

    preload() {
        this.load.spritesheet('overworld', '../../assets/backgrounds/Overworld.png', { frameWidth: 768, frameHeight: 240 });
        this.load.spritesheet('tiles', '../../assets/tiles/tiles.png', { frameWidth: gameState.cellWidth, frameHeight: gameState.cellHeight });
        this.load.spritesheet('mario', '../../assets/players/mario_small.png', { frameWidth: gameState.cellWidth, frameHeight: gameState.cellHeight });
        this.load.spritesheet('item_overworld', '../../assets/blocks/item_overworld.png', { frameWidth: gameState.cellWidth, frameHeight: gameState.cellHeight });
        this.load.spritesheet('brick', '../../assets/blocks/bricks_ow.png', { frameWidth: gameState.cellWidth, frameHeight: gameState.cellHeight });
    }

    create() {
        // Initialize the controller
        gameState.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.updateMario();
    }

    updateMario() {
        // Determine Mario's pace
        const pace = gameState.marioWalkVelocity * (gameState.cursors.shift.isDown ? 2 : 1);

        // Reset jumping flag when Mario touches the ground
        if (gameState.mario.body.touching.down) {
            gameState.mario.jumping = false;
            gameState.mario.airborne = false;
        } else {
            gameState.mario.airborne = true;
        }

        // Walking/running direction
        if (gameState.cursors.right.isDown) {
            gameState.mario.setVelocityX(pace);
            gameState.mario.flipX = false;
        } else if (gameState.cursors.left.isDown) {
            gameState.mario.setVelocityX(-1 * pace);
            gameState.mario.flipX = true
        } else {
            gameState.mario.setVelocityX(0);
        }

        // Enable jumping, only if Mario is on the ground
        if (gameState.cursors.up.isDown && !gameState.mario.jumping) {
            gameState.mario.setVelocityY(-1 * gameState.marioJumpVelocity);
            gameState.mario.jumping = true;
        }

        // Handle player animation
        if (gameState.mario.jumping) {
            gameState.mario.anims.play('mario_jump', true);
        } else if (gameState.cursors.right.isDown || gameState.cursors.left.isDown) {
            if (gameState.mario.airborne) gameState.mario.anims.stop();
            else gameState.mario.anims.play('mario_run', true);
        } else {
            gameState.mario.anims.play('mario_idle', true);
        }
    }
}