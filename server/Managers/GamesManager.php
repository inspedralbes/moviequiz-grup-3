<?php
require_once(__DIR__."/../DBConnection.php");

class GamesManager extends DBConnection
{
    private $addToYears = array(-15 , -10 , -5 , -2  , 2 , 5 , 10 ,15);
    #region magical functions
    public function  __construct()
    {
        $this->db_name = "a19albchavas_tardium";
    }
    #endregion
    public function select(): array
    {
        // TODO: Implement select() method.
        $this->query="SELECT * FROM movies ORDER BY RAND() LIMIT 5;";
        $this->multiple_query();
        return $this->rows;
    }

    public function insert()
    {
        // TODO: Implement insert() method.
    }

    public function delete()
    {
        // TODO: Implement delete() method.
    }

    public function update()
    {
        // TODO: Implement update() method.
    }

    public function CreateGame(): array
    {
        $data = $this->select();
        $result = array();
        for ($i = 0; $i < count($data) ;$i++)
        {
            array_push($result, [
                "title" => $data[$i]["title"],
                "poster" => $data[$i]["img_path"],
                "answers" => $this->GenerateYears($data[$i]["year"])
            ]);
        }
        return array($result);
    }

    private function GenerateYears($data)
    {
        shuffle($this->addToYears);
        $rightPos = rand(0, 4);
        $ans = array();
        for ($i = 0; $i < 5; $i++)
        {
            if ($i == $rightPos)
            {
                array_push($ans, intval($data));
            }
            else
            {
                array_push($ans, $data + $this->addToYears[$i]);
            }
        }
        return $ans;
    }
}