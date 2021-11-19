import styled from "styled-components";

function Spacer(props) {
  return <CompContainer width={props.width} height={props.height} />;
}

export default Spacer;

const CompContainer = styled.div`
  width: ${(props) => {
    return props.width ? props.width : "0px";
  }};
  height: ${(props) => {
    return props.height ? props.height : "0px";
  }};
`;
