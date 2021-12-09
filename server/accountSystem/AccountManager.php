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
    public $errorAccount = array("errorUsername" => false,"errorEmail" => false,"errorPassword" => false);

    #region magical functions
    function __construct() {
        /*========We set the database we will access==========*/
        $this->db_name = "tardium";
    }

    public function __toString(): string
    {
        // TODO: Implement __toString() method.
        return "{username: ". $this->username . ", email:" . $this->email . ",password: ". $this->password ."}";
    }
    #endregion

    #region user GETTERS AND SETTERS
    
    /**
     * @return null if empty
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param string $username
     */
    public function setUsername(string $username): void
    {
        if($username === "")
        {
            $this->errorAccount['errorUsername'] = true;
            return;
        }
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
     * @return null
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        if(($email === "") || (false === filter_var($email, FILTER_VALIDATE_EMAIL)))
        {
            $this->errorAccount['errorEmail'] = true;
            return;
        }
        $this->email = $email;
    }

    /**
     * @return null
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param string $password
     */
    public function setPassword(string $password): void
    {
        if(($password === "") || (strlen($password) <= 6))
        {
            $this->errorAccount['errorPassword'] = true;
            return;
        }
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
    #endregion

    public function select(): array
    {
        // TODO: Implement select() method.
        /*========We select the account we want==========*/
        $this->query="SELECT * FROM accounts WHERE email='{$this->email}';";
        $this->multiple_query();
        return $this->rows;
    }

    public function selectById(): array
    {
        $this->query="SELECT * FROM accounts WHERE id_user='{$this->uid}';";
        $this->multiple_query();
        return $this->rows;
    }

    public function insert(): array
    {
        $passwordHashed = password_hash($this->password, PASSWORD_DEFAULT);
        $this->query="INSERT INTO accounts (id_user, username, email, password) VALUES('{$this->uid}', '{$this->username}', '{$this->email}', '{$passwordHashed}');";
        $this->single_query();
        return $this->allOk;
    }

    public function update()
    {
        // TODO: Implement selectAll() method.
    }

    public function delete()
    {
        // TODO: Implement delete() method.
        $this->query="DELETE FROM accounts WHERE email='{$this->email}'";
        $this->single_query();
    }

}