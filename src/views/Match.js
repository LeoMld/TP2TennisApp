import { useParams } from "react-router";
import MatchService from "../services/MatchService";
import "../css/match.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Alert, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { update } from "../reduxSlice/matchsSlice";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
const SUCCESS = 1;
const FAILURE = -1;

const Match = () => {
  const { id } = useParams("id");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.id.value);
  const match = useSelector((state) => state.matchs.value[id]);
  const matchs = useSelector((state) => state.matchs.value);
  const [player, setPlayer] = useState(0);
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    refreshMatch();
  }, []);

  useEffect(() => {
    if (match && match.pointage) {
      const numberOfSets =
        match.pointage.manches[0] + match.pointage.manches[1];
      if (numberOfSets !== 0) {
        setDisabled(true);
      }
    }
  }, [match]);

  const refreshMatch = () => {
    MatchService.getMatch(id).then((res) => {
      console.log(res.data);
      const newMatches = matchs.map((m, index) => {
        if (index == id) {
          return res.data;
        }
        return m;
      });
      dispatch(update(newMatches));
    });
  };

  const enterBet = () => {
    MatchService.bet(id, { amount, player, userId })
      .then((res) => {
        const { amount, odds, playerBet, playerIndex } = res.data;
        const odd = playerIndex === 1 ? odds.odd1 : odds.odd2;
        setAlert({
          state: SUCCESS,
          message: `Your bet on ${playerBet} of ${amount}$CAD has been registered, the odd is ${odd}.`,
        });
      })
      .catch(() => {
        setAlert({
          state: FAILURE,
          message: "There was an error, please try again.",
        });
      });
    refreshMatch();
  };

  return (
    <Container>
      <Title>Match</Title>
      <IconButton
        color="primary"
        aria-label="Refresh"
        onClick={() => {
          refreshMatch();
        }}
      >
        <RefreshIcon />
      </IconButton>
      {match && (
        <div style={{ color: "white" }}>
          {alert &&
            (alert.state === SUCCESS ? (
              <Alert severity="success" onClose={() => setAlert(null)}>
                {alert.message}
              </Alert>
            ) : (
              <Alert severity="error" onClose={() => setAlert(null)}>
                {alert.message}
              </Alert>
            ))}
          <ScoreBoard match={match} />
          <div>
            <div>
              Côte{" "}
              <button
                onClick={() => {
                  if (player === 1) {
                    setPlayer(0);
                  } else {
                    setPlayer(1);
                  }
                }}
                style={player === 1 ? { color: "red" } : { color: "gray" }}
              >
                {match.odds.odd1}
              </button>
              -
              <button
                onClick={() => {
                  if (player === 2) {
                    setPlayer(0);
                  } else {
                    setPlayer(2);
                  }
                }}
                style={player === 2 ? { color: "red" } : { color: "gray" }}
              >
                {match.odds.odd2}
              </button>
            </div>
            <div>
              <input
                type="number"
                placeholder="enter your bet amount..."
                onChange={(e) => setAmount(e.currentTarget.value)}
              />
            </div>
            <div>
              <button onClick={enterBet} disabled={disabled}>
                Place your bet
              </button>
              {disabled && <p> Can't bet after first set is played</p>}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

const ScoreBoard = ({ match }) => {
  const getTennisScore = (gameScore) => {
    if (gameScore < 3) {
      return gameScore * 15;
    } else {
      return 40;
    }
  };

  return (
    <div class="scoreboard">
      <div class="scoreboard__player">
        <div class={match.serveur === 0 ? "player player--serve" : "player"}>
          <div class="player__rank">1</div>
          <div class="player__name">{match.joueur1.prenom}</div>
          <div class="player__surname">{match.joueur1.nom}</div>
          <div class="player__nationality">{match.joueur1.pays}</div>
        </div>
        <div class="set">
          {match.pointage.jeu.map((jeu) => (
            <div class="set__score">{jeu[0]}</div>
          ))}
        </div>
        <div class="game">
          <div class="game__score">
            {getTennisScore(match.pointage.echange[0])}
          </div>
        </div>
      </div>
      <div class="scoreboard__player">
        <div class={match.serveur === 1 ? "player player--serve" : "player"}>
          <div class="player__rank">2</div>
          <div class="player__name">{match.joueur2.prenom}</div>
          <div class="player__surname">{match.joueur2.nom}</div>
          <div class="player__nationality">{match.joueur2.pays}</div>
        </div>
        <div class="set">
          {match.pointage.jeu.map((jeu) => (
            <div class="set__score">{jeu[1]}</div>
          ))}
        </div>
        <div class="game">
          <div class="game__score">
            {getTennisScore(match.pointage.echange[1])}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Match;
