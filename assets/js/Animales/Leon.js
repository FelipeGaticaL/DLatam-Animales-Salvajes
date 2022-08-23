import Animal from "../animal.js";

class Leon extends Animal {
    Rugir() {
      player.src = `./assets/sounds/${this.Sonido}`;
      player.load();
      player.play();
    }
  }

export default Leon