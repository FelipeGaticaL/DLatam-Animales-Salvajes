import Animal from "../animal.js";

class Serpiente extends Animal {
    Siseo() {
      player.src = `./assets/sounds/${this.Sonido}`;
      player.load();
      player.play();
    }
  }

export default Serpiente