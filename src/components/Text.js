import styled from "styled-components";

function Text(props) {
  return (
    <CompContainer
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      color={props.color}
    >
      {props.children}
    </CompContainer>
  );
}

export default Text;

const CompContainer = styled.p`
  margin: 0;
  font-size: ${(props) => {
    return props.fontSize;
  }};
  font-weight: ${(props) => {
    return props.fontWeight;
  }};
  color: ${(props) => {
    return props.color;
  }};
`;
