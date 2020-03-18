import Phaser from "phaser";
import Menu from "./scenes/1_Menu";
import Game from "./scenes/2_Game";
import Endgame from "./scenes/3_Endgame"; 


const config = {
  width:600,
  height:750,
  background:"black",
  scenes:[Menu,Game,Endgame]
};

const game = new Phaser.Game(config);

function preload() {

}

function create() {

}
