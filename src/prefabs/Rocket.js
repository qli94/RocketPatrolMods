// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, keyL, keyR) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track rocket's firing status
        this.horizMoveSpeed = 10;
        this.moveSpeed = 15;         // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket')  // add rocket sfx
        this.keyLft = keyL;
        this.keyRht = keyR;
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(this.keyLft.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.horizMoveSpeed;
            } else if (this.keyRht.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.horizMoveSpeed;
            }
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}

