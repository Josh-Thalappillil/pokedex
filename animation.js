function loadingCompletion() {
    const loadingDiv = document.getElementById("loading-div");
    loadingDiv.classList.add("hideLoading");
  
    setTimeout(function () {
      loadingDiv.classList.replace("hideLoading", "hide");
      document.body.style.overflow = "unset";
    }, 500);
  
    renderedList = pokemonList;
  
    renderPokedex();
  }
  
  window.addEventListener("scroll", function () {
    addNewScrollPokemon();
  });
  
  function slideInSelectedPokemon() {
    const placeholder = document.getElementById("selected-pokemon-placeholder");
    const container = document.getElementById("selected-pokemon-container");
  
    placeholder.classList.add("hide");
    container.classList.add("slide-in");
    container.classList.remove("slide-out");
  }
  
  function slideOutSelectedPokemon() {
    const container = document.getElementById("selected-pokemon-container");
  
    container.classList.remove("slide-in");
    container.classList.add("slide-out");
  }
  
  function setupResponsiveBackground(types) {
    const responsiveBackground = document.getElementById("selected-pokemon-responsive-background");
  
    responsiveBackground.style.background = pokemonTypes[types[0]].colour;
  }
  
  function openPokemonResponsiveInfo() {
    const container = document.getElementById("selected-pokemon-container");
    const closeButton = document.getElementById("selected-pokemon-responsive-close");
    const responsiveBackground = document.getElementById("selected-pokemon-responsive-background");
  
    container.classList.remove("hide");
    container.style.display = "flex";
    closeButton.classList.remove("hide");
    responsiveBackground.classList.remove("hide");
  
    // Smooth transition for background opacity
    responsiveBackground.style.opacity = 0;
    setTimeout(function () {
      responsiveBackground.style.opacity = 1;
    }, 20);
  
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
  }
  
  function closePokemonInfo() {
    const container = document.getElementById("selected-pokemon-container");
    const closeButton = document.getElementById("selected-pokemon-responsive-close");
    const responsiveBackground = document.getElementById("selected-pokemon-responsive-background");
  
    setTimeout(function () {
      container.classList.add("hide");
      closeButton.classList.add("hide");
      responsiveBackground.classList.add("hide");
    }, 350);
  
    // Smooth transition for background opacity
    responsiveBackground.style.opacity = 1;
    setTimeout(function () {
      responsiveBackground.style.opacity = 0;
    }, 10);
  
    document.getElementsByTagName("html")[0].style.overflow = "unset";
  
    slideOutSelectedPokemon();
  }
  
  window.addEventListener("resize", function () {
    const container = document.getElementById("selected-pokemon-container");
  
    if (container.classList.contains("slide-out")) {
      container.classList.replace("slide-out", "slide-in");
    }
  
    if (window.innerWidth > 1100) {
      document.getElementsByTagName("html")[0].style.overflow = "unset";
    }
  });
