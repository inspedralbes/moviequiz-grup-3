<?php
require_once(__DIR__."/../DBConnection.php");
session_start();
class GamesManager extends DBConnection
{
    private $gameInDb = null;
    private $games = null;
    private $results = null;
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
    //      SELECT SINGLE GAME     //
    public function selectGame(): array
    {
        $this->query="SELECT * FROM games 
        WHERE id_user='{$_SESSION['uid']}' AND games_json='{$this->games}';";
        $this->multiple_query();
        return $this->rows;
    }

    //      INSERT GAMES' JSON INTO GAMES' TABLE     //
    public function insert()
    {
        $this->query="INSERT INTO games (id_user, games_json, results_json)
        VALUES('{$_SESSION['uid']}', '{$this->games}', '{$this->results}');";
        $this->single_query();
    }

    //      DELETE A GAME FROM GAMES TABLE      //      unused now
    public function delete()
    {
        // TODO: Implement delete() method.
    }

    //      UPDATE FROM A GAME     //       unused now
    public function update()
    {
        // TODO: Implement update() method.
    }

    //      UPDATE FROM A GAME     //
    public function updateScore($id_game)
    {
        // TODO: Implement update() method.
        $this->query="UPDATE games 
        SET results_json = 
        WHERE id_user='{$id_game}';";
        $this->single_query();
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
        $this->games = $games_json;
        $this->results = $results_json;
        $game = $this->selectGame();
        if($game =! null)
        {
            //      UPDATE SCORE FROM THE DATABASE      //
            $this->updateScore($game["id_game"]);
            // USED FOR DEBUGGING
            return array("id_game" => $game["id_game"]);
            // USED FOR DEBUGGING
        }
        else
        {
            //      INSERT NEW GAME     //
            $this->insert();
            //return array("inserted" => true);

            // USED FOR DEBUGGING
            $this->games = json_decode($games_json);
            $this->results = json_decode($results_json);
            return array("games_json" => $this->games, "results_json" => $this->results);
            // USED FOR DEBUGGING
        }
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