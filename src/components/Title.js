import styled from "styled-components";

function Title(props) {
  return <CompContainer>{props.children}</CompContainer>;
}

export default Title;

const CompContainer = styled.h3`
  text-align: center;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
`;
