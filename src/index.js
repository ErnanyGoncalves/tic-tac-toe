import Phaser from "phaser";

import Menu from "./scenes/Menu";
import TTT from "./scenes/TTT";
import Endgame from "./scenes/Endgame"; 


const config = {
  type: Phaser.AUTO,
  width:600,
  height:750,
  backgroundColor:"0x000000",
  scene:[Menu,TTT,Endgame]
};

const game = new Phaser.Game(config);