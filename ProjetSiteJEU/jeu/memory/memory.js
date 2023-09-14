// 12 images = 2 x 6 images 
var a = [1,2,3,4,5,6,1,2,3,4,5,6]
    .map( p => [p,Math.random()]) // Placement random 
    .sort( (a,b) => a[1]-b[1] )
    .map( p => p[0] )

var pics = document.getElementsByTagName('img'); //selectionne les images
var eltscore = document.getElementById('score');
var score = 0;
var step = 1;
var p1, p2;
var timer = null;

for(let i=0; i<pics.length; i++){ // boucle pour apparition des images 
    pics[i].src2 = 'memory/pics/spr' + a[i] + '.png';
}

document.addEventListener('click',function(e){
    switch(step){
        case 1: // premier click
            if (e.target.tagName == 'IMG'){
                e.target.src = e.target.src2;
                p1 = e.target;
                step = 2;
            }
            break;
        case 2: // deuxieme click
            if (e.target.tagName == 'IMG'){
                e.target.src =  e.target.src2;
                p2 = e.target;
                step = 3;
            }  
            timer = setTimeout(check, 1700);
            break;
        case 3:  // Comparaison/action en fonction
            clearTimeout(timer);
            check();
            break;
    }
});

function check(){ //fonction qui compare et fait l'action 
    if (p1.src2==p2.src2) {
        p1.replaceWith(document.createElement('span'))
        p2.replaceWith(document.createElement('span'))
        score += 50;
    }else{
       p2.src = p1.src = 'memory/pics/spr0.jpg';
       score = Math.max(0, score-30);
    }
    step = 1;
    eltscore.textContent = score;

    if (document.getElementsByTagName('img').length==0){
        eltscore.textContent = ' Bien joué vous avez gagné ! ';
    }
}
 
let restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", restartGame);

var refresh = window.getElementById('refresh');
refresh.addEventListener('click', location.reload(), false);











