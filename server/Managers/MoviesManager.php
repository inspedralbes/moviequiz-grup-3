<?php
require_once(__DIR__."/../DBConnection.php");
if ( session_id() === '' ) session_start();
class MoviesManager extends DBConnection{

    private $mid = null;
    private $title = null;
    private $year = null;
    private $img_path = null;
    private $rating = null;
    private $comment = null;

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

    /**
     * @return null
     */
    public function getComment()
    {
        return $this->comment;
    }

    /**
     * @param null $comment
     */
    public function setComment($comment): void
    {
        $this->comment = $comment;
    }
    #endregion

    /////////SQL FUNCTIONS///////////////////////////////////////////////////////////////////////////////////////////////
    public function selectMyMovies()
    {
        $this->query="SELECT * FROM movies WHERE id_movie in (
            SELECT id_movie FROM feedbacks WHERE id_user='{$_SESSION['uid']}');";
        $this->multiple_query();
        return $this->rows;
    }
    public function selectAllMovies()
    {
        // TODO: Implement selectAll() method.
        /*========We select the account we want==========*/
        $this->query="SELECT * FROM movies;";
        $this->multiple_query();
        return $this->rows;
    }
    public function selectCarrusel()
    {
        // TODO: Implement selectAll() method.
        /*========We select the account we want==========*/
        $this->query="SELECT img_path FROM movies ORDER BY rating DESC LIMIT 10;";
        $this->multiple_query();
        return $this->rows;
    }
    public function select()
    {
        // TODO: Implement select() method.
        /*========We select the account we want==========*/
        $this->query="SELECT * FROM movies WHERE id_movie='{$this->mid}';";
        $this->multiple_query();
        return $this->rows;
    }

    public function selectFeedback()
    {
        $this->query="SELECT * FROM feedbacks WHERE id_movie='{$this->mid}' AND id_user='{$_SESSION['uid']}';";
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
        $this->query="INSERT INTO feedbacks (id_movie, id_user) VALUES('{$this->mid}', '{$_SESSION['uid']}');";
        $this->single_query();
    }
    public function updateFeedback()
    {
        // TODO: Implement update() method.
        $this->query="UPDATE feedbacks 
        SET rating='{$this->rating}', comment='{$this->comment}'
        WHERE id_user='{$_SESSION['uid']}' AND id_movie='{$this->mid}';";
        $this->single_query();
    }
    public function updateAverageRating()
    {
        $this->query="UPDATE movies 
        SET rating=(SELECT AVG(rating) FROM feedbacks WHERE id_movie='{$this->mid}' AND rating IS NOT NULL)
        WHERE id_movie='{$this->mid}';";
        $this->single_query();
    }
    public function update()
    {
        // TODO: Implement update() method.
    }

    public function delete()
    {
        // TODO: Implement delete() method.
        $this->query="DELETE FROM feedbacks WHERE id_movie='{$this->mid}' AND id_user='{$_SESSION['uid']}';";
        $this->single_query();
    }

    public function GetMovies()
    {
        // TODO: Implement GetMovies() method.
        $this->select();
    }

    public function AddMovie()
    {
        // TODO: Implement AddMovie() method.
        $data = $this->select();
        if ($data == null)
        {
            $this->insert();
            $this->insertFeedback();
            return array("info" => "Insertar en movies y en feedbacks");
        }
        else{
            $feedback = $this->selectFeedback();
            if($feedback == null)
            {
                $this->insertFeedback();
                return array("info" => "Insertar solo en feedbacks");
            }
        }
    }
    public function RemoveMovie()
    {
        $this->delete();
        $this->updateAverageRating();
        return array("info" => "Fuera de favoritos");
    }

    public function UpdateMovieFeedback()
    {
        $this->updateFeedback();
        if($this->rating != null)
        {
            $this->updateAverageRating();
        }
        return array("allok" => true);
    }
}

?>