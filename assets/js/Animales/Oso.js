import Animal from "../animal.js";

class Oso extends Animal {
    Gruñir() {
      player.src = `./assets/sounds/${this.Sonido}`;
      player.load();
      player.play();
    }
  }


export default Oso
  
  