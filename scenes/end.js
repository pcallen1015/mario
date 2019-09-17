class End extends Phaser.Scene {
    constructor() {
        super({ key: 'End' });
    }

    preload() {
        
    }

    create() {
        this.add.text(50, 50, 'Game Over', { fill: '#ffffff', fontSize: '40px' });
    }

    update() {

    }
}