class Start extends Phaser.Scene {
    constructor() {
        super({ key: 'Start' });
    }

    preload() {
        
    }

    create() {
        this.add.text(50, 50, 'Start', { fill: '#dfdfdf', fontSize: '40px' });
        this.input.on('pointerdown', () => {
            this.scene.stop('Start');
            this.scene.start('1-1');
        });
    }

    update() {

    }
}