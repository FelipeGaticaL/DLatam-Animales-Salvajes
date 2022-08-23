import Animal from "../animal.js";

export class Lobo extends Animal {
    Aullar() {
      player.src = `./assets/sounds/${this.Sonido}`;
      player.load();
      player.play();
    }
  }

export default Lobo