import styled from "styled-components";
import Player from "./Player";
import Spacer from "./Spacer";
import Text from "./Text";

function MatchHeader(props) {
  const match = props.match;
  const flexStyle = { display: "flex" };
  const small = "12px";
  return (
    <CompContainer>
      <Text fontSize={small} color="GREY">
        {match.date_debut}
      </Text>
      <Spacer height="10px" />
      <Text fontSize={small} color="GREY">
        {match.heure_debut}
      </Text>
      <Spacer height="20px" />
      <div style={flexStyle}>
        <Player name={match.joueur1.prenom + " " + match.joueur1.nom} />
        <MatchState>
          {match.pointage.final ? (
            <Text fontSize="42px" fontWeight="bold">
              {match.pointage.manches[0]} : {match.pointage.manches[1]}
            </Text>
          ) : (
            <Text fontSize="42px" fontWeight="bold">
              {match.pointage.jeu[match.pointage.jeu.length - 1][0]} :{" "}
              {match.pointage.jeu[match.pointage.jeu.length - 1][1]}
            </Text>
          )}
          <Spacer height="10px" />
          {match.pointage.final && <Text fontWeight="bold">Match terminé</Text>}
        </MatchState>
        <Player name={match.joueur2.prenom + " " + match.joueur2.nom} />
      </div>
      <Spacer height="10px" />
      <Text fontSize={small}>0 h 57 min 5 sec</Text>
    </CompContainer>
  );
}

export default MatchHeader;

const CompContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const MatchState = styled.div`
  display: flex;
  width: 140px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
