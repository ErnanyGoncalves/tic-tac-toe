export default class GamePiece extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,textureKey){
        super(scene,x,y,textureKey);
        scene.add.existing(this);
        this.play(`${textureKey}_clicked`);
    }

}