<?php

    define('HOST', 'localhost');
    define('DB_NAME', 'projetsitejeu');
    define('USER','root');
    define('PASS','');

    try{
        $db = new PDO("mysql:host=" . HOST . ";dbname=" . DB_NAME, USER, PASS);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e){
        echo $e;
    }
    
if(isset($_POST['formsend'])){
   
   extract($_POST);

   if(!empty($password) && !empty($cpassword) && !empty($email) && !empty($pseudo)){
       $pseudo = htmlspecialchars($_POST['pseudo']);
       $email = htmlspecialchars($_POST['email']);
       if ($password == $cpassword){
           $options = [
               'cost' => 12,
           ];

           $hashpass = password_hash($password, PASSWORD_BCRYPT, $options);

           $c = $db->prepare("SELECT email FROM user WHERE email = :email");
           $c->execute(['email' => $email]);
           $result = $c->rowCount();

           if($result == 0) {
               $q = $db->prepare("INSERT INTO user(pseudo,email,password) VALUES(:pseudo,:email,:password)");
               $q->execute([
                   'pseudo' => $pseudo,
                   'email' => $email,
                   'password' => $hashpass
               ]);
               echo "Le compte a été créee";
           } else{
               echo "L'email a déja un compte éxistant";
           }

         
       }
       
   //    if(password_verify($password, $hashpass)) {
   //     echo "le mot de passe est le meme";
   //    } else {
   //     echo "le mot de passe n'est pas similaire";
   //    }
   }else{
       echo "Les champs ne sont pas tous remplis";
   }

}

if(isset($_POST['formlogin']))
{
    extract($_POST);

    if(!empty($lpseudo) && !empty($lemail)  && !empty($lpassword))
    {
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
                header("Location:Acceuil.php");
                $_SESSION['email'] = $result['email'];
                $_SESSION['pseudo'] = $result['pseudo'];
                $_SESSION['password'] = $result['password'];
            }
            else 
            {
                echo "le mot de passe est incorect";
                
            }
        }
        else 
        {
            echo "Un des champs saisi n'est pas bon";
        }

    }
    else 
    {
        echo "Veuiller completer l'ensemble des champs";
    }
}

?>


