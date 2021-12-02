<?php
    require_once(__DIR__. '/../sql/DBAbstractClas.php');
    class AccountSystem extends DBAbstractClass
    {
        //variables de entrada
        private $username = "";
        private $email = "";
        private $password = "";

        function __construct() {
            $this->db_name = "tardium";
        }
        
        function __toString() {
        echo "entro string <br>";
        return "(" . $this->id . ", " . $this->name . ", " . $this->edat . ", " .  
            $this->alcada . ")";
        }
        
        function __destruct() {
    
        }
        public function selectAll(){

        }
        /*============aaaaaa===============*/
        public function select($email="") {
            $this->query="SELECT * FROM accounts WHERE email=" .$email. ";";
            $this->multiple_query();
            return $this->rows;
        }
        public function insert(/*$email, $username, $password*/) {
            $this->query="INSERT INTO accounts VALUES (" . $email . "," . $username . "," . $password . ")";
            $this->single_query();
        }
        public function delete(){}


        public function LogIn($email="") {  
            /*============We check if the user exists===============*/
            $data = select($email);
            echo __toString();
            if($data != null)
            {
                /*============if exists we load the data===============*/
                $username = "$data->$name";
                $email = "$data->$email";
                $password = "$data->$pswd";
            }
            else
            {
                /*============if don't exists we send error===============*/
            }
            
        }
        public function Register($email="") {
            /*============We check if the user exists===============*/
            select($email);
            /*============If don't exists we don't create the account===============*/
        }
            
    }
?>