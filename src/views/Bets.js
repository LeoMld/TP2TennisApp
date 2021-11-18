import styled from "styled-components";
import Container from "../components/Container";
import Title from "../components/Title";
import BetResult from "../components/BetResult";
import {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import betService from '../services/BetService'
import {CircularProgress} from "@mui/material";
function Bets() {

    const [bets, setBets] = useState(null);
    const userId = useSelector((state) => state.id.value);
    console.log(userId)

    const updateBets = () => {
        betService.getBets(userId).then((res) => {
            setBets(res.data)
        })
    }

    useEffect(() => {
        updateBets()
    },[])
    return (
        <Container>
            <Title>Mes paris</Title>
            <>
            {bets ?
                bets.map((bet) => {
                    if(bet.status === 'pending'){
                        return <BetResult status="pending" bet={bet} />
                    }else{
                        if(bet.win === 'true'){
                            return <BetResult status="win" bet={bet}/>
                        }else{
                            return <BetResult status="lose" bet={bet} />
                        }
                    }
                }) : <CircularProgress></CircularProgress>
            }
            </>
        </Container>
    );
}
export default Bets;



