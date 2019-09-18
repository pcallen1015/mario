class World1_1 extends World {
    constructor() {
        super('1-1');
    }

    create() {
        super.create();

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
}