import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Text from "./Text";

function ScoreBoard(props) {
  const [matchStarted, setMatchStarted] = useState(false);
  const match = props.match;
  useEffect(() => {
    if (match.temps_partie !== 0) {
      setMatchStarted(true);
    }
  }, [match.temps_partie]);

  return (
    <MatchContainer final={match.pointage.final}>
      <MatchLine>
        <PlayerName>
          <Text>
            {match.joueur1.nom} ({match.joueur1.rang})
          </Text>
        </PlayerName>
        {matchStarted ? (
          <>
            <GamesScore>
              {match.pointage.jeu[0] && <Text>{match.pointage.jeu[0][0]}</Text>}
              {match.pointage.jeu[1] && <Text>{match.pointage.jeu[1][0]}</Text>}
              {match.pointage.jeu[2] && <Text>{match.pointage.jeu[2][0]}</Text>}
            </GamesScore>
            <PointScore>{match.pointage.echange[0] * 15}</PointScore>
            <ServiceDisplay>
              {match.serveur === 0 && match.pointage.final === false && (
                <img
                  src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/000000/external-tennis-sports-those-icons-lineal-color-those-icons.png"
                  alt="Server ball"
                />
              )}
            </ServiceDisplay>
          </>
        ) : (
          <Text color="GREY">{match.date_debut}</Text>
        )}
      </MatchLine>

      <MatchLine>
        <PlayerName>
          <Text>
            {match.joueur2.nom} ({match.joueur2.rang})
          </Text>
        </PlayerName>
        {matchStarted ? (
          <>
            <GamesScore>
              {match.pointage.jeu[0] && <Text>{match.pointage.jeu[0][1]}</Text>}{" "}
              {match.pointage.jeu[1] && <Text>{match.pointage.jeu[1][1]}</Text>}
              {match.pointage.jeu[2] && <Text>{match.pointage.jeu[2][1]}</Text>}
            </GamesScore>
            <PointScore>{match.pointage.echange[1] * 15}</PointScore>
            <ServiceDisplay>
              {match.serveur === 1 && match.pointage.final === false && (
                <img
                  src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/000000/external-tennis-sports-those-icons-lineal-color-those-icons.png"
                  alt="Server ball"
                />
              )}
            </ServiceDisplay>
          </>
        ) : (
          <Text color="GREY">{match.heure_debut}</Text>
        )}
      </MatchLine>
    </MatchContainer>
  );
}

export default ScoreBoard;

const MatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => {
    return props.final ? "GREY" : "WHITE";
  }};
  gap: 14px;
  background-color: #111213;
  border-radius: 8px;
  padding: 14px;
  width: 388px;
`;

const MatchLine = styled.div`
  display: flex;
`;

const GamesScore = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  width: 140px;
`;

const PlayerName = styled.div`
  width: 180px;
`;

const PointScore = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ServiceDisplay = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 15px;
    height: 15px;
  }
`;
