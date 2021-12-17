<?php
require_once(__DIR__."/../DBConnection.php");
session_start();
class GamesManager extends DBConnection
{
    
    //      ARRAY FOR CREATING YEARS' ARRAY     //
    private $addToYears = array(-15 , -10 , -5 , -2  , 2 , 5 , 10 ,15);

    #region magical functions
    public function  __construct()
    {
        $this->db_name = "a19albchavas_tardium";
    }
    #endregion
    
    //      SELECT ALL FROM MOVIES RANDOMIZED       //
    public function select(): array
    {
        $this->query="SELECT * FROM movies ORDER BY RAND() LIMIT 5;";
        $this->multiple_query();
        return $this->rows;
    }

    //      INSERT GAMES' JSON INTO GAMES' TABLE     //
    public function insert()
    {
        //$this->query="INSERT INTO games (id_user, games_json, results_json) VALUES('$_SESSION['uid']', '{$games}', {$results});";
        //$this->single_query();
    }

    //      DELETE A GAME FROM GAMES TABLE      //      unused now
    public function delete()
    {
        // TODO: Implement delete() method.
    }

    //      UPDATE SMTH FROM A GAME     //      unused now (and ever(?))
    public function update()
    {
        // TODO: Implement update() method.
    }


    //      FUNCTION THAT CREATES A GAME AND SENDS IT TO JS      //
    public function CreateGame(): array
    {
        $data = $this->select();
        $result = array();
        for ($i = 0; $i < count($data); $i++)
        {
            array_push($result, [
                "title" => $data[$i]["title"],
                "poster" => $data[$i]["img_path"],
                "years" => $this->GenerateYears($data[$i]["year"])
            ]);
        }
        return array($result);
    }


    //      FUNCTION THAT INSERT THE GAME DATA INTO GAMES' TABLE    //
    public function InsertGame($games_json, $results_json): array
    {
        $games = json_decode($games_json);
        $results = $results_json;
        //$this->insert($games, $results);
        //return array("inserted" => true);
        return array("games_json" => $games, "results_json" => $results);
    }


    //      FUNCTION THAT GENERATES THE ANSWERS' ARRAY      //
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