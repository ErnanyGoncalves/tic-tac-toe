// Spritesheets
// https://www.codeandweb.com/free-sprite-sheet-packer
// http://free-tex-packer.com/app/

// Removedor de fundo
// https://www.remove.bg/pt-br


// generateFrameNames
// https://photonstorm.github.io/phaser3-docs/Phaser.Types.Animations.html#.GenerateFrameNames__anchor
// https://phaser.discourse.group/t/texture-atlas-anim-issue-with-generateframenumbers/1264/2   
// Acredito que generateFrameNames pega pelo json os "nomes dos arquivos" que compõe o spridesheet e gera os frames



// Passar informação ao iniciar uma cena
// https://photonstorm.github.io/phaser3-docs/Phaser.Scenes.SceneManager.html#start__anchor


import Phaser from "phaser";

import Menu from "./scenes/Menu";
import TTT from "./scenes/TTT";
import Endgame from "./scenes/Endgame";


const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 750,
  backgroundColor: "0x000000",
  scene: [Menu, TTT, Endgame]
};

const game = new Phaser.Game(config);
