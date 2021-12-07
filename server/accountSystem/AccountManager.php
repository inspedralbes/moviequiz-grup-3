<?php
require_once(__DIR__."/../DBConnection.php");
require_once(__DIR__."/../IAccounts.php");

class AccountManager extends DBConnection {

    private $uid = null;
    private $username = null;
    private $email = null;
    private $password = null;
    private $score = null;
    private $img_path = null;

    function __construct() {
        /*========We set the database we will access==========*/
        $this->db_name = "tardium";
        if(isset($_SESSION["uid"]))
        {
            $this->setUid($_SESSION['uid']);
            $this->setUsername($_SESSION['username']);
            $this->setScore($_SESSION['score']);
            $this->setImgPath($_SESSION['imgPath']);
        }
    }
    public function __toString(): string
    {
        // TODO: Implement __toString() method.
        return "{username: ". $this->username . ", email:" . $this->email . ",password: ". $this->password ."}";
    }

    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @param string $username
     */
    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    /**
     * @return null
     */
    public function getUid()
    {
        return $this->uid;
    }

    /**
     * @param null $uid
     */
    public function setUid($uid): void
    {
        $this->uid = $uid;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @param string $password
     */
    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    /**
     * @return null
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * @param null $score
     */
    public function setScore($score): void
    {
        $this->score = $score;
    }

    /**
     * @return null
     */
    public function getImgPath()
    {
        return $this->imgPath;
    }

    /**
     * @param null $imgPath
     */
    public function setImgPath($imgPath): void
    {
        $this->imgPath = $imgPath;
    }

    protected function selectAll()
    {
        // TODO: Implement selectAll() method.
    }

    protected function select()
    {
        // TODO: Implement select() method.
        /*========We select the account we want==========*/
        $this->query="SELECT * FROM accounts WHERE email='{$this->email}';";
        $this->multiple_query();
        return $this->rows;
    }

    protected function insert()
    {
        $passwordHashed = password_hash($this->password, PASSWORD_DEFAULT);
        $this->query="INSERT INTO accounts (username, email, password)
                      VALUES('{$this->username}', '{$this->email}', '{$passwordHashed}');";
        $this->single_query();
    }

    protected function update()
    {
        // TODO: Implement selectAll() method.
    }

    protected function delete()
    {
        // TODO: Implement delete() method.
    }

    public function LogIn(){
        $data = $this->select();
        if (password_verify($this->password, $data[0]['password'])) {
            // TODO: Add info into a SESSION variable.
            session_start();
            $this->setUid($data[0]['id']);
            $this->setUsername($data[0]['username']);
            $this->setScore($data[0]['score']);
            $this->setImgPath($data[0]['imgPath']);
            $_SESSION["uid"] = $this->getUid();
            $_SESSION["username"] = $this->getUsername();
            $_SESSION["score"] = $this->getScore();
            $_SESSION["imgPath"] = $this->getImgPath();
            return $data;
        }
        else{
            return array("Correct"=>$data[0]['password'], "Sent"=>$this->password);
            //return array("Exito" => false);
        }
    }
    public function Register(){
        //$data = $this->select();
        $this->insert();
        return array("Error" => "???");
        /*if ($data == false) {

            return array("Error" => false);
        }
        else{
            return array("Error" => true);
        }*/
    }
    public function LogOut()
    {
        session_start();
        $_SESSION = array();
        session_destroy();
        //header('Location: login.html');
    }



}