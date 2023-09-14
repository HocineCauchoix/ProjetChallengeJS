<?php
    include 'GestionDatabase.php';
    ?>
<?php session_start(); 
    @$lpassword=$_POST["lpassword"];
    @$lpseudo=$_POST["lpseudo"];
    @$lemail=$_POST["lemail"];
    @$formlogin=$_POST["formlogin"];
    if(isset($formlogin)){
        $q = $db->prepare("SELECT * FROM user WHERE email = :email");
        $q->execute(['email' => $lemail]);
        $result = $q->fetch();

        $q = $db->prepare("SELECT * FROM user WHERE pseudo = :pseudo");
        $q->execute(['pseudo' => $lpseudo]);
        $result1 = $q->fetch();


        if($result == true &&  $result1 == true)
        {
            if(password_verify($lpassword,  $result['password']))
            {
                $_SESSION["autoriser"] ="oui";
                header("Location:Acceuil.php");
            }
        }    
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
   echo  '<link rel="stylesheet" href="index.css">';
    ?>
    <title>Document</title>
</head>
<body>
    
<div class="container">
    <nav>
        <a href="#" class="logo">Jeu</a>
        <ul>
            <li><a href="#">Lien 1</a></li>
            <li><a href="#">Lien 2</a></li>
            <li><a href="#">Lien 3</a></li>
            <li><a href="#">Lien 4</a></li>
            <li>
                <button class="btn" id="displayForm">Se connecter</button>
            </li>
        </ul>
    </nav>

    <section>
        <div class="sec-container">
            <div class="form-wrapper">
                <div class="card">
                    <div class="card-header">
                        <div id="forLogin" class="form-header active">Se connecter</div>
                        <div id="forRegister" class="form-header">S'inscrire</div>
                    </div>
                    <div class="card-body" id="formContainer">
                        <form method="post" id="loginForm">
                            <input type="pseudo" name="lpseudo" id="lpseudo" placeholder="Votre Pseudo" class="form-control" />
                            <input type="email" name="lemail" id="lemail" placeholder="Votre Email" class="form-control" />
                            <input type="password" name="lpassword" id="lpassword" placeholder="Votre mot de passe" class="form-control" />
                            <input type="submit" name="formlogin" id="formlogin" value="Connexion" class="formButton">
                        </form>
                        <form method="post" id="registerForm" class="toggleForm">
                            <input type="pseudo" name="pseudo" id="pseudo" placeholder="Votre Pseudo" class="form-control" />
                            <input type="email" name="email" id="email" placeholder="Votre Email" class="form-control" />
                            <input type="password" name="password" id="password" placeholder="Votre mot de passe" class="form-control" />
                            <input type="password" name="cpassword" id="cpassword" placeholder="Confirmer votre mot de passe" class="form-control" />
                            <input type="submit" name="formsend" id="formsend" value="Enregistrer" class= "formButton">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>


<script type="module" src="index.js"></script>

</body>
</html>
         

