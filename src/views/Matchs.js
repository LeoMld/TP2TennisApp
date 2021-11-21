import {useEffect, useState} from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import Container from "../components/Container";
import { useSelector, useDispatch } from "react-redux";
import Title from "../components/Title";
import matchService from "../services/MatchService";
import {Alert, CircularProgress, IconButton} from "@mui/material";
import { update } from "../reduxSlice/matchsSlice";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ScoreBoard from "../components/ScoreBoard";
const SUCCESS = 1;
const FAILURE = -1;

function Matchs() {
    const matchs = useSelector((state) => state.matchs.value);
    const [alert, setAlert] = useState(null);
    const dispatch = useDispatch();
  const history = useHistory();

  const updateMatchs = () => {
    matchService
      .getMatchs()
      .then((res) => {
        dispatch(update(res.data));
      })
      .catch((e) => {
          setAlert({
              state: FAILURE,
              message: "Mode hors ligne, désolé, impossible d'actualiser les données pour le moment.",
          });
      });
  };

  useEffect(() => {
    console.log(matchs);
  }, [matchs]);

  useEffect(() => {
    updateMatchs();
    const interval = setInterval(() => {
      updateMatchs();
    }, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Title>Matchs</Title>
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
      <IconButton
        color="primary"
        aria-label="Refresh"
        onClick={() => {
          updateMatchs();
        }}
      >
        <RefreshIcon />
      </IconButton>
      <MatchList>
        {matchs && matchs.length !== 0 ? (
          matchs.map((match, index) => {
            return (
              <button
                style={{ border: "none", padding: "0", backgroundColor: "transparent" }}
                key={index}
                onClick={() => history.push(`/match/${index}`)}
              >
                <ScoreBoard match={match} />
              </button>
            );
          })
        ) : (
          <CircularProgress />
        )}
      </MatchList>
    </Container>
  );
}

export default Matchs;

const MatchList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  span {
    :hover {
      cursor: pointer;
    }
  }
`;
