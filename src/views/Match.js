import { useParams } from "react-router";
import styled from "styled-components";
import MatchService from "../services/MatchService";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Alert, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { update } from "../reduxSlice/matchsSlice";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import Container from "../components/Container";
import ScoreBoard from "../components/ScoreBoard";
import MatchHeader from "../components/MatchHeader";
import Spacer from "../components/Spacer";
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
      const numberOfSets = match.pointage.manches[0] + match.pointage.manches[1];
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
        <MatchContainer>
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
          <MatchHeader match={match} />
          <Spacer height="20px" />
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
        </MatchContainer>
      )}
    </Container>
  );
};

export default Match;

const MatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
