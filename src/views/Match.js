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
import Text from "../components/Text";
const SUCCESS = 1;
const FAILURE = -1;

const Match = () => {
  const { id } = useParams("id");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.id.value);
  const match = useSelector((state) => state.matchs.value[id]);
  const matchs = useSelector((state) => state.matchs.value);
  const [player, setPlayer] = useState(0);
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    refreshMatch();
    // eslint-disable-next-line
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
        // eslint-disable-next-line
        if (index == id) {
          return res.data;
        }
        return m;
      });
      dispatch(update(newMatches));
    });
  };

  const enterBet = () => {
    if (amount <= 0) {
      setAlert({
        state: FAILURE,
        message: "Veuillez entrer un montant supérieur à 0$CAD s'il vous plaît.",
      });
    } else {
      MatchService.bet(id, { amount, player, userId })
        .then((res) => {
          const { amount, odds, playerBet, playerIndex } = res.data;
          const odd = playerIndex === 1 ? odds.odd1 : odds.odd2;
          setAlert({
            state: SUCCESS,
            message: `Votre paris sur ${playerBet} de ${amount}$CAD coté à ${odd}, a bien été enregistré.`,
          });
        })
        .catch(() => {
          setAlert({
            state: FAILURE,
            message: "Une erreur est survenue, veuillez réessayer",
          });
        });
    }

    refreshMatch();
    setAmount(0);
  };

  function handlePlayerChoice(choice) {
    if (player === choice) {
      setPlayer(0);
    } else {
      setPlayer(choice);
    }
  }

  function gainSimulation() {
    let odd = 0;
    switch (player) {
      case 1:
        odd = match.odds.odd1;
        break;
      case 2:
        odd = match.odds.odd2;
        break;
      default:
        break;
    }
    return Math.ceil(odd * amount * 100) / 100; //Arrondi au centième
  }

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
          <div style={{ position: "absolute" }}>
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
          </div>
          <MatchHeader match={match} />
          <Spacer height="20px" />

          <Text fontWeight="500">Contestations restantes</Text>
          <div
            style={{
              display: "flex",
              "justify-content": "space-between",
              width: "300px",
            }}
          >
            <Text>{3 - match.contestation[0]}</Text>
            <Text>{3 - match.contestation[1]}</Text>
          </div>
          <Spacer height="20px" />

          <ScoreBoard match={match} />
          <Spacer height="20px" />

          <Spacer height="10px" />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text>Je paris sur </Text>
            <Spacer width="10px" />
            <ChoiceButton onClick={() => handlePlayerChoice(1)} active={player === 1}>
              {match.joueur1.prenom} {match.joueur1.nom} - {match.odds.odd1}
            </ChoiceButton>
            <Spacer width="20px" />
            <ChoiceButton onClick={() => handlePlayerChoice(2)} active={player === 2}>
              {match.joueur2.prenom} {match.joueur2.nom} - {match.odds.odd2}
            </ChoiceButton>
          </div>
          <Spacer height="10px" />
          <div style={{ display: "flex", alignItems: "center" }}>
            <BetInput
              type="number"
              placeholder="Enter your bet amount..."
              value={amount}
              disabled={disabled}
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
            <Spacer width="10px" />
            <BetButton
              onClick={enterBet}
              disabled={disabled}
              //title={disabled && "Parier n'est plus permis après la première manche."}
            >
              Parier
            </BetButton>
            <Spacer width="10px" />
            <Text>Simulation du gain : {gainSimulation()}</Text>
          </div>
          <Spacer height="10px" />
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

const ChoiceButton = styled.button`
  padding: 8px;
  background-color: ${(props) => {
    return props.active ? "#62c000" : "#FFFFFF";
  }};
  color: ${(props) => {
    return props.active ? "#FFFFFF" : "#000000";
  }};
  border: none;
  border-radius: 2px;
  :hover {
    cursor: pointer;
  }
`;

const BetInput = styled.input`
  padding: 8px;
  width: 60px;
`;

const BetButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 2px;
  :hover {
    cursor: pointer;
  }
`;
