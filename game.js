const gameState = {
    cellWidth: 16,
    cellHeight: 16,
    scale: 2
};

const config = {
    width: 800,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 750 }
        }
    },
    scene: [World1_1]
};

const game = new Phaser.Game(config);