import styled from "styled-components";
import Spacer from "./Spacer";
import Text from "./Text";
import Picture from "../media/player.png";

function Player(props) {
  return (
    <CompContainer>
      <img src={Picture} alt="Player" />
      <Spacer height="10px" />
      <Text>{props.name}</Text>
    </CompContainer>
  );
}

export default Player;

const CompContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    width: 120px;
    height: 120px;
  }
`;
