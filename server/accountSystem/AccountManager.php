<?php
require_once(__DIR__."/DBConnection.php");

class AccountManager extends DBConnection{

    private $username = "";
    private $email = "";
    private $password = "";

    function __construct() {
        /*========We set the database we will acces==========*/
        $this->db_name = "tardium";
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

    protected function selectAll()
    {
        // TODO: Implement selectAll() method.
    }

    protected function select()
    {
        // TODO: Implement select() method.
        /*========We select the account we want==========*/
        $this->query="SELECT * FROM accounts WHERE email='" .$this->email."'";
        $this->multiple_query();
        return $this->rows;
    }

    protected function insert()
    {
        // TODO: Implement insert() method.
    }

    protected function delete()
    {
        // TODO: Implement delete() method.
    }
    public function LogIn(){
        $data = $this->select();
        return $data;
    }
}
?>