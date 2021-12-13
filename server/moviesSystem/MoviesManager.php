<?php
require_once(__DIR__."/../DBConnection.php");

class MoviesManager extends DBConnection{

    private $mid = null;
    private $title = null;
    private $year = null;
    private $img_path = null;
    private $rating = null;

    #region magical functions
    public function  __construct()
    {
        $this->db_name = "a19albchavas_tardium";
    }
    #endregion

    #region GETTERS AND SETTERS
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
    public function getimg_path()
    {
        return $this->img_path;
    }

    /**
     * @param null $img_path
     */
    public function setimg_path($img_path): void
    {
        $this->img_path = $img_path;
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
    #endregion


    public function selectAllMovies()
    {
        // TODO: Implement selectAll() method.
        /*========We select the account we want==========*/
        $this->query="SELECT * FROM movies;";
        $this->multiple_query();
        return $this->rows;
    }
/////////SQL FUNCTIONS///////////////////////////////////////////////////////////////////////////////////////////////
    public function select()
    {
        // TODO: Implement select() method.
        /*========We select the account we want==========*/
        $this->query="SELECT * FROM movies WHERE id_movie='{$this->mid}';";
        $this->multiple_query();
        return $this->rows;
    }

    public function insert()
    {
        // TODO: Implement insert() method.
        $this->query="INSERT INTO movies (id_movie, title, year, rating, img_path)
                            VALUES('{$this->mid}', '{$this->title}', '{$this->year}', '0', '{$this->img_path}');";
        $this->single_query();
    }

    public function insertFeedback()
    {
        // TODO: Implement insert() method.
        session_start();
        $this->query="INSERT INTO feedback (id_movie, id_user)
                            VALUES('{$this->mid}', '{$_SESSION['uid']}';";
        $this->single_query();
    }

    public function update()
    {
        // TODO: Implement update() method.
    }

    public function delete()
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