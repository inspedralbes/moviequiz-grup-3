<?php
require_once(__DIR__."/../DBConnection.php");

class MoviesManager extends DBConnection{

    private $mid = null;
    private $title = null;
    private $year = null;
    private $imgPath = null;
    private $rating = null;

    public function  __construct()
    {
        $this->db_name = "tardium";
    }

    /**
     * @return null
     */
    public function getMid()
    {
        return $this->mid;
    }

    /**
     * @param null $mid
     */
    public function setMid($mid): void
    {
        $this->mid = $mid;
    }

    /**
     * @return null
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param null $title
     */
    public function setTitle($title): void
    {
        $this->title = $title;
    }

    /**
     * @return null
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * @param null $year
     */
    public function setYear($year): void
    {
        $this->year = $year;
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

    /**
     * @return null
     */
    public function getRating()
    {
        return $this->rating;
    }

    /**
     * @param null $rating
     */
    public function setRating($rating): void
    {
        $this->rating = $rating;
    }

    protected function selectAll()
    {
        // TODO: Implement selectAll() method.
    }
/////////SQL FUNCTIONS///////////////////////////////////////////////////////////////////////////////////////////////
    protected function select()
    {
        // TODO: Implement select() method.
        /*========We select the account we want==========*/
        $this->query="SELECT * FROM movies;";
        $this->multiple_query();
        return $this->rows;
    }

    protected function insert()
    {
        // TODO: Implement insert() method.
        $this->query="INSERT INTO movies (id_movie, title, year, rating, imgPath)
                      VALUES('{$this->mid}', '{$this->title}', '{$this->year}', '0', '{$this->imgPath}');";
        $this->single_query();
    }

    protected function insertFeedback()
    {
        // TODO: Implement insert() method.
        session_start();
        $this->query="INSERT INTO feedback (id_movie, id_user)
                      VALUES('{$this->mid}', '{$_SESSION['uid']}';";
        $this->single_query();
    }

    protected function update()
    {
        // TODO: Implement update() method.
    }

    protected function delete()
    {
        // TODO: Implement delete() method.
    }

    public function GetMovies()
    {
        // TODO: Implement GetMovies() method.
        $this->select();
    }

    public function AddMovie()
    {
        // TODO: Implement AddMovie() method.
        //$this->select();
        try{
            $this->insert();
            $this->insertFeedback();
            return array("Error" => false);
        }
        catch (Exception $e)
        {
            return array("Error" => true);
        }

    }


}

?>