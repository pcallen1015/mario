class World1_1 extends Phaser.Scene {
    constructor() {
        super({ key: '1-1' });
    }

    preload() {
        this.load.spritesheet('overworld', '../../assets/backgrounds/Overworld.png', { frameWidth: 768, frameHeight: 240 });
        this.load.spritesheet('tiles', '../../assets/tiles/tiles.png', { frameWidth: gameState.cellWidth, frameHeight: gameState.cellHeight });
        this.load.spritesheet('mario', '../../assets/players/mario_small.png', { frameWidth: gameState.cellWidth, frameHeight: gameState.cellHeight });
        this.load.spritesheet('item_overworld', '../../assets/blocks/item_overworld.png', { frameWidth: gameState.cellWidth, frameHeight: gameState.cellHeight });
        this.load.spritesheet('brick', '../../assets/blocks/bricks_ow.png', { frameWidth: gameState.cellWidth, frameHeight: gameState.cellHeight });
    }

    create() {
        gameState.cursors = this.input.keyboard.createCursorKeys();

        // Background
        gameState.background = this.add.image(0, 0, 'overworld').setOrigin(0, 0).setScale(gameState.scale);

        // Mario
        gameState.mario = this.physics.add.sprite(32, 300, 'mario', 0).setOrigin(0, 0).setScale(gameState.scale);

        // Ground tiles
        gameState.tiles = this.physics.add.staticGroup();
        for (let c = 0; c <= 768 / gameState.cellWidth; c++) {
            gameState.tiles.create(c * gameState.cellWidth * gameState.scale, 416, 'tiles', 0).setOrigin(0,0).setScale(gameState.scale).refreshBody();
            gameState.tiles.create(c * gameState.cellWidth * gameState.scale, 448, 'tiles', 0).setOrigin(0,0).setScale(gameState.scale).refreshBody();
        }

        // Item blocks
        const itemBlocks = [
            { x: 16, y: 9 },
            { x: 21, y: 9 },
            { x: 22, y: 5 },
            { x: 23, y: 9 },
        ];
        gameState.blocks = this.physics.add.staticGroup();
        itemBlocks.forEach(block => {
            gameState.blocks.create(block.x * gameState.cellWidth * gameState.scale, block.y * gameState.cellHeight * gameState.scale, 'item_overworld', 0).setOrigin(0, 0).setScale(gameState.scale).refreshBody();
        });

        this.anims.create({
            key: 'item_block_shimmer',
            frames: this.anims.generateFrameNumbers('item_overworld', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1,
            yoyo: true,
        });        

        gameState.blocks.playAnimation('item_block_shimmer', true);

        // Bricks
        const bricks = [
            { x: 20, y: 9 },
            { x: 22, y: 9 },
            { x: 24, y: 9 },
        ];
        gameState.bricks = this.physics.add.staticGroup();
        bricks.forEach(brick => {
            gameState.bricks.create(brick.x * gameState.cellWidth * gameState.scale, brick.y * gameState.cellHeight * gameState.scale, 'brick', 0).setOrigin(0, 0).setScale(gameState.scale).refreshBody();
        });

        // Setup collisions
        gameState.mario.setCollideWorldBounds(true);
        this.physics.add.collider(gameState.mario, gameState.tiles);
        this.physics.add.collider(gameState.mario, gameState.blocks);
        this.physics.add.collider(gameState.mario, gameState.bricks);

        // Setup animations
        this.anims.create({
            key: 'mario_idle',
            frames: this.anims.generateFrameNumbers('mario', { start: 0, end: 0 }),
            frameRate: 0,
            repeat: -1
        });

        this.anims.create({
            key: 'mario_run',
            frames: this.anims.generateFrameNumbers('mario', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });

        this.anims.create({
            key: 'mario_jump',
            frames: this.anims.generateFrameNumbers('mario', { start: 5, end: 5 }),
            frameRate: 0,
            repeat: -1
        });
    }

    update() {

        let v = 200;
        if (gameState.cursors.shift.isDown) {
            v *= 2;
        } else {
            v = 200;
        }

        // Reset jumping flag when Mario touches the ground
        if (gameState.mario.body.touching.down) {
            gameState.mario.jumping = false;
            gameState.mario.airborne = false;
        } else {
            gameState.mario.airborne = true;
        }

        // Walking/running direction
        if (gameState.cursors.right.isDown) {
            gameState.mario.setVelocityX(v);
            gameState.mario.flipX = false;
        } else if (gameState.cursors.left.isDown) {
            gameState.mario.setVelocityX(-1 * v);
            gameState.mario.flipX = true
        } else {
            gameState.mario.setVelocityX(0);
        }

        // Enable jumping, only if Mario is on the ground
        if (gameState.cursors.up.isDown && !gameState.mario.jumping) {
            gameState.mario.setVelocityY(-1 * 500);
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