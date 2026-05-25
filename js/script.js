window.addEventListener("load",()=>{

  const loader = document.getElementById("loader");

  if(loader){
    loader.style.display = "none";
  }

});

// SMOOTH SCROLL

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

  anchor.addEventListener("click",function(e){

    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if(target){

      target.scrollIntoView({
        behavior:"smooth"
      });

    }

  });

});

// REGISTER SERVICE WORKER

if("serviceWorker" in navigator){

  window.addEventListener("load",()=>{

    navigator.serviceWorker
    .register("sw.js")
    .then(()=>{
      console.log("SW Registered");
    })
    .catch(err=>{
      console.log(err);
    });

  });

}

// LOADING INTRO

window.addEventListener("load", () => {
  const intro = document.getElementById("introLoader");

  if (intro) {
    setTimeout(() => {
      intro.style.display = "none";
    }, 2600);
  }
});