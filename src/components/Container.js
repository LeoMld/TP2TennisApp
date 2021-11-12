import styled from "styled-components";

function Container(props) {
  return <CompContainer>{props.children}</CompContainer>;
}

export default Container;

const CompContainer = styled.div`
  width: 576px;
  margin: 0 auto 0 auto;
  color: #ffffff;
`;
