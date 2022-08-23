//Importación de Modulos/Clase

import Aguila from "./Animales/Aguila.js";
import Leon from "./Animales/Leon.js";
import Lobo from "./Animales/Lobo.js";
import Oso from "./Animales/Oso.js";
import Serpiente from "./Animales/Serpiente.js";

//Declaración de Asincronía para todo las funciones
(async function () {
  let answ = await fetch("animales.json");
  let { animales: Animales } = await answ.json();

  //Seleccionando // Elementos DOM from HTML

  let AnimalNombre = document.getElementById("animal");
  let AnimalEdad = document.getElementById("edad");
  let AnimalComentarios = document.getElementById("comentarios");
  let VisualizacionAnimal = document.getElementById("preview");
  let IngresarAnimal = document.getElementById("btnRegistrar");
  let ContenedorAnimales = document.getElementById("Animales");
  let Play = document.getElementById("player");
  /* Guardamos el arreglo de los animales */
  let TarjetaAnimal = [];

 
 
  /* Creamos sección para recorrer animal, y hacer match de imagen-sonido, y agregarlo al HTML  como tarjeta y modal de la misma*/
  function mostrar() {
    ContenedorAnimales.innerHTML = "";
    TarjetaAnimal.forEach((animal) => {
      let Contenedor = document.createElement("div");
      let img = document.createElement("img");
      let BloqueSonido = document.createElement("button");

      Contenedor.classList.add("card", "p-1");
      Contenedor.style.width = "10rem";

      img.setAttribute("src", `assets/imgs/${animal.Img}`);
      img.classList.add(
        "img-fluid",
        "cursor",
        "d-flex",
        "justify-content-center"
      );
      img.addEventListener("click", function () {
        $("#exampleModal").modal("toggle");
        let modalBody = document.getElementById("modal-body");
        modalBody.innerHTML = `
        
          <img src="./assets/imgs/${animal.Img}"  class="img-modal rounded mx-auto  d-block p-4" style="width: 10rem"  />
        
        <center><strong>Animal: </strong>${animal.Nombre}</center>
        <center><strong>Edad: </strong>${animal.Edad}</center>
        <center><strong>Comentarios: </strong>${animal.Comentarios}</center>`;
      });

      //agregamos evento sonido

      BloqueSonido.classList.add("card-body", "card-boton", "p-0");
      BloqueSonido.innerHTML = `<img src="./assets/imgs/audio.svg" style="width: 30px"/>`;

      BloqueSonido.addEventListener("click", () => {
        if (animal.Nombre === "Leon") {
          animal.Rugir(Play);
        } else if (animal.Nombre === "Lobo") {
          animal.Aullar(Play);
        } else if (animal.Nombre === "Oso") {
          animal.Gruñir(Play);
        } else if (animal.Nombre === "Serpiente") {
          animal.Siseo(Play);
        } else if (animal.Nombre === "Aguila") {
          animal.Chillar(Play);
        }
      });

      Contenedor.appendChild(img);
      Contenedor.appendChild(BloqueSonido);

      ContenedorAnimales.appendChild(Contenedor);
    });
  }
  //Evento seleccionar de la lsita y hacer match
  AnimalNombre.addEventListener("change", function () {
    let EleccionAnimal = AnimalNombre.value;
    let RetornoAnimal = Animales.find(
      (animal) => animal.name === EleccionAnimal
    );
    VisualizacionAnimal.style.backgroundImage = `url(../assets/imgs/${RetornoAnimal.imagen})`;
  });

  /* Agregar elementos ingresados en HTML DOM */
  IngresarAnimal.addEventListener("click", function () {
    let nombreAnimal = AnimalNombre.value;
    let edadAnimal = AnimalEdad.value;
    let comentariosAnimal = AnimalComentarios.value;

    //verificar si todo fue elegido
    (function (verificar) {
      if (
        comentariosAnimal.length === 0 ||
        nombreAnimal == "Selección un animal" ||
        edadAnimal == "Selección rango Edad"
      ) {
        alert("Rellenar todos los campos es obligatorio");
      } else {
        let RetornoAnimal = Animales.find(
          (animal) => animal.name === nombreAnimal
        );
        /* Arreglo datos */
        let data = [
          nombreAnimal,
          edadAnimal,
          RetornoAnimal.imagen,
          comentariosAnimal,
          RetornoAnimal.sonido,
        ];
        /* Pusheo de selección con los data input formulario */
        switch (nombreAnimal) {
          case "Leon":
            TarjetaAnimal.push(new Leon(...data));
            break;
          case "Lobo":
            TarjetaAnimal.push(new Lobo(...data));
            break;
          case "Oso":
            TarjetaAnimal.push(new Oso(...data));
            break;
          case "Aguila":
            TarjetaAnimal.push(new Aguila(...data));
            break;
          case "Serpiente":
            TarjetaAnimal.push(new Serpiente(...data));
            break;
        }

        //resetear registrar animal

        let Opciones = document.querySelectorAll("option");
        Opciones.forEach(
          (option) => (option.selected = option.defaultSelected)
        );

        $("#comentarios").val("");
        VisualizacionAnimal.removeAttribute("src");

        mostrar();
      }
    })();
  });
})();
