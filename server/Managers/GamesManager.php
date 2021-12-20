<?php
require_once(__DIR__."/../DBConnection.php");
if ( session_id() === '' ) session_start();
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

    //      SELECT A SINGLE MOVIE       //
    public function selectMovieYears($movies_id): array
    {
        $this->query="SELECT year FROM movies WHERE id_movie='{$movies_id[0]}'
        UNION ALL
        SELECT year FROM movies WHERE id_movie='{$movies_id[1]}'
        UNION ALL
        SELECT year FROM movies WHERE id_movie='{$movies_id[2]}'
        UNION ALL
        SELECT year FROM movies WHERE id_movie='{$movies_id[3]}'
        UNION ALL
        SELECT year FROM movies WHERE id_movie='{$movies_id[4]}';";
        $this->multiple_query();
        return $this->rows;
    }

    //      SELECT ALL USER'S GAMES     //
    public function selectUserGames(): array
    {
        $this->query="SELECT * FROM games WHERE id_user='{$_SESSION['uid']}';";
        $this->multiple_query();
        return $this->rows;
    }

    //      SELECT SINGLE GAME     //
    public function selectGame(): array
    {
        $this->query="SELECT * FROM games WHERE id_user='{$_SESSION['uid']}' AND games_json='{$this->games}';";
        $this->multiple_query();
        return $this->rows;
    }

    //      INSERT GAMES' JSON INTO GAMES' TABLE     //
    public function insert()
    {
        $name = json_decode($this->results, true);
        $this->query="INSERT INTO games (id_user, name, games_json, results_json)
        VALUES('{$_SESSION['uid']}', '{$name['name']}', '{$this->games}', '{$this->results}');";
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
    public function updateScore($id_game, $results)
    {
        // TODO: Implement update() method.
        $this->query="UPDATE games 
        SET results_json = '{$results}'
        WHERE id_game='{$id_game}';";
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
                "id_movie" => $data[$i]["id_movie"],
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
        $score = 0;

        //      CALCULATE THE SCORE     //
        $tmp_games = json_decode($this->games, true);
        $tmp_results = json_decode($this->results, true);
        $ids = array();
        for ($i=0; $i < count($tmp_games); $i++)
        {
            array_push($ids, $tmp_games[$i]["id_movie"]);
        }
        $goodYears = $this->selectMovieYears($ids);
        for ($i=0; $i < count($tmp_games); $i++)
        {
            if($tmp_results['pressed'][$i] == $goodYears[$i]["year"])
            {
                $score++;
            }
        }
        $game = json_decode(implode($this->selectGame()), true);
        if(!empty($game))
        {
            //      UPDATE SCORE IN THE DATABASE      //
            $this->updateScore($game["id_game"], $results_json);
        }
        else
        {
            //      INSERT NEW GAME     //
            $this->insert();
        }
        return array("score" => $score);
    }

    public function PlayExistingGame()
    {
        //before button
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