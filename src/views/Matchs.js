import { useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import Container from "../components/Container";
import { useSelector, useDispatch } from "react-redux";
import Title from "../components/Title";
import matchService from "../services/MatchService";
import { CircularProgress, IconButton } from "@mui/material";
import { update } from "../reduxSlice/matchsSlice";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ScoreBoard from "../components/ScoreBoard";

function Matchs() {
  const matchs = useSelector((state) => state.matchs.value);
  const dispatch = useDispatch();
  const history = useHistory();

  const updateMatchs = () => {
    matchService
      .getMatchs()
      .then((res) => {
        dispatch(update(res.data));
      })
      .catch((e) => {
        console.error(e);
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
  }, []);

  return (
    <Container>
      <Title>Matchs</Title>
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
              <span onClick={() => history.push(`/matchs/${index}`)}>
                <ScoreBoard match={match} />
              </span>
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
