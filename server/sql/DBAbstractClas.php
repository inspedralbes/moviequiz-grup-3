<?php

abstract class DBAbstractClass {

    //
    private static $db_host = "localhost";
    private static $db_user = "root";
    private static $db_pass = "";

    protected $db_name;
    
    protected $query;

    protected $rows=array();

    private $conn;

    abstract protected function selectAll();
    abstract protected function select();
    abstract protected function insert();
    //abstract protected function update();
    abstract protected function delete();

    private function open_conn() {
    $this->conn = new mysqli (self::$db_host, self::$db_user, self::$db_pass, $this->db_name);
    }

    private function close_conn() {
    $this->conn->close();
    }

    protected function single_query() {
        $this->open_conn();
        $this->conn->query($this->query);
        $this->close_conn();
    }

    protected function multiple_query() {
        $this->open_conn();
        $result = $this->conn->query($this->query);
        for ($i=0;$i<$result->num_rows;$i++)
            $this->rows[$i]=$result->fetch_assoc();
        $result->close();
        $this->close_conn();
    }
}

?>