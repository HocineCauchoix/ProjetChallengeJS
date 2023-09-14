<?php
    include 'GestionDatabase.php';
    ?>
<?php
 session_start(); 
 if($_SESSION["autoriser"]!="oui"){
    header("location:PageConnexion.php");
    exit();
 }
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
    <title>Document</title>
</head>
<div class="header">
    <i id="btn-menu"class="fa-solid fa-bars"></i>
        <div class="container">
            <img src="NeonLogoGamingZone.jpg" alt="">
            <div id="menu" class="nav-links" >
                <a class="active" href="#">Home</a>
                <a href="#">about</a>
                <a href="#">service</a>
                <a href="#">Reseau</a>
                <a href="Deconnexion.php">Deconnexion</a>
                <div class="soc-links">
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                </div>
            </div>
        </div>
   </div>
   <main>
        <div class="ensemble-fleche">
            <img src="img/fleche-gauche.svg" class="img-svg1">
            <div class="slide">
                <a class="card cardX" href=""></a>
                <a class="card card1" href="jeu/2048/2048.html"></a>
                <a class="card card2" href="jeu/snake/snake.html"></a>
                <a class="card card3" href="memory.html"></a>
                <a class="card card4" href="jeu/puissance4/puissance4.html"></a>
                <div class="card card5" href="#2048.html"></div>
                <div class="card card6" href="#2048.html"></div>
                <div class="card cardX" href="#2048.html"></div>
            </div>
            <img src="img/fleche-droite.svg" class="img-svg2">
        </div>
   </main>
    
   <footer>

    
   </footer>
   <script type="module" src="menu.js"></script>
</body>
</html>