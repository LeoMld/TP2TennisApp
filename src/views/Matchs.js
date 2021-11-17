import { useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import Container from "../components/Container";
import { useSelector, useDispatch } from "react-redux";
import Title from "../components/Title";
import matchService from "../services/MatchService";
import { CircularProgress, Grid, IconButton } from "@mui/material";
import { update } from "../reduxSlice/matchsSlice";
import { useHistory } from "react-router-dom";

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
    console.log("aqui");
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
      {matchs && matchs.length !== 0 ? (
        matchs.map((match, index) => {
          return (
            <div
              onClick={() => history.push(`/matchs/${index}`)}
              style={{ "border-style": "solid", "border-color": "white" }}
            >
              <Grid container alignItems={"center"} spacing={2}>
                <Grid mr={8} item>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item>
                      <p>{match.joueur1.nom}</p>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item>
                      <p>{match.joueur2.nom}</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    {match.pointage.jeu[2] && (
                      <Grid item>
                        <p>{match.pointage.jeu[2][0]}</p>
                      </Grid>
                    )}
                    {match.pointage.jeu[1] && (
                      <Grid item x>
                        <p>{match.pointage.jeu[1][0]}</p>
                      </Grid>
                    )}
                    {match.pointage.jeu[0] && (
                      <Grid item>
                        <p>{match.pointage.jeu[0][0]}</p>
                      </Grid>
                    )}
                  </Grid>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    {match.pointage.jeu[2] && (
                      <Grid item>
                        <p>{match.pointage.jeu[2][1]}</p>
                      </Grid>
                    )}
                    {match.pointage.jeu[1] && (
                      <Grid item>
                        <p>{match.pointage.jeu[1][1]}</p>
                      </Grid>
                    )}
                    {match.pointage.jeu[0] && (
                      <Grid item>
                        <p>{match.pointage.jeu[0][1]}</p>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          );
        })
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}

export default Matchs;
