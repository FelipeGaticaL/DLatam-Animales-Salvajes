import Animal from "../animal.js";

class Aguila extends Animal {
    Chillar() {
      player.src = `./assets/sounds/${this.Sonido}`;
      player.load();
      player.play();
    }
  }
export default Aguila