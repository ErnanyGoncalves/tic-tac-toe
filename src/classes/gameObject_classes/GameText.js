export default class GameText extends Phaser.GameObjects.Text{
    constructor(scene,x,y,text,style,visibility){
        super(scene,x,y,text,style,visibility);
        scene.add.existing(this);
        this.visible = visibility;
    }

    // WIP
    toggleStatus(){
        this.visible = !this.visible;
    }

}