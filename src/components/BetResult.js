import styled from "styled-components";
import { useEffect, useState } from "react";

function BetResult(props) {
  const style1 = { padding: "5px 10px", margin: "0px", color: "black" };
  const style2 = { padding: "10px", margin: "0px" };

  const [status, setStatus] = useState();
  const [styleBackground, setStyleBackground] = useState();
  const [winner, setWinner] = useState();
  const [odd, setOdd] = useState();

  useEffect(() => {
    console.log(props.status);
    if (props.status === "pending") {
      setStyleBackground({ "background-color": "rgb(244,211,94)" });
      setStatus("EN COURS");
    }
    if (props.bet.win === false) {
      setStyleBackground({ "background-color": "rgb(150,3,26)" });
      setStatus("PERDU");
      setWinner(props.bet.otherPlayer);
    }
    if (props.bet.win) {
      setStyleBackground({ "background-color": "rgb(98,192,0)" });
      setStatus("GAGNE");
      setWinner(props.bet.playerBet);
    }
    if (props.bet.playerIndex === 1) {
      setOdd(props.bet.odds.odd1);
    } else {
      setOdd(props.bet.odds.odd2);
    }
  }, [props]);

  return (
    <>
      <div>
        <Menu style={styleBackground}>
          <p style={style1}>
            {" "}
            {status} : {props.bet.playerBet}
          </p>
        </Menu>
        <Test>
          {props.status === "pending" ? (
            <>
              <p style={style2}>MISE : {props.bet.amount}</p>
              <p style={style2}>COTE : {odd} </p>
            </>
          ) : (
            <>
              <p style={style2}> RESULTAT : {winner} </p>
              <p style={style2}>MISE : {props.bet.amount}</p>
              {props.bet.win === true ? (
                <p style={style2}>GAIN : {props.bet.amountWon}</p>
              ) : (
                <p style={style2}>GAIN : 0</p>
              )}
              <p style={style2}>COTE : {odd}</p>
            </>
          )}
        </Test>
      </div>
    </>
  );
}

export default BetResult;

const Menu = styled.div`
  border-top-right-radius: 80px 80px;
`;
const Test = styled.div`
  background-color: rgb(23, 21, 38);
`;
