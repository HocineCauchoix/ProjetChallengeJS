let btnMenu = document.getElementById('btn-menu');
let menu = document.getElementById('menu');

btnMenu.onclick = () =>{
    btnMenu.classList.toggle('fa-times');
    menu.classList.toggle('active')
}

var tab=document.querySelectorAll(".card");
var fleche1=document.querySelector(".img-svg1");
var fleche2=document.querySelector(".img-svg2");
var slide=document.querySelector(".slide");
var indice_element_active=1;
function augmenter(variable){
    variable.style="z-index:2;transform:scale(1.2);width:calc(2*100%)";
}
function diminuer(varaible) {
    varaible.style="z-index:1;transform:scale(1);";
}
window.onload=()=>{
    augmenter(tab[indice_element_active]);
}

fleche1.onclick=()=>{
   if(indice_element_active!=1){
    diminuer(tab[indice_element_active]);
    augmenter(tab[indice_element_active-1]);
    slide.scrollBy(-210,0);
    indice_element_active=indice_element_active-1;
   }
}

fleche2.onclick=()=>{
    if(indice_element_active!=9){
     diminuer(tab[indice_element_active]);
     augmenter(tab[indice_element_active+1]);
     slide.scrollBy(210,0);
     indice_element_active=indice_element_active+1;
    }
}

var tab1=document.querySelectorAll(".card1");

tab1.forEach(function(element) {
    element.addEventListener("click", function() {
      // Naviguer vers la page HTML souhaitée
      window.location.href = "PierrePapierCiseau/index.html";
    });
  });


