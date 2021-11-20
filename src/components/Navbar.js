import styled from "styled-components";
import Matchs from "../views/Matchs";
import Bets from "../views/Bets";
import Profil from "../views/Profil";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../reduxSlice/idSlice";
import { useEffect } from "react";
import io from "socket.io-client";
import Match from "../views/Match";

function Navbar() {
  const id = useSelector((state) => state.id.value);
  const dispatch = useDispatch();

  const showNotification = (message, title) => {
    const options = {
      body: message,
    };
    new Notification(title, options);
  };

  const generateID = () => {
    const alphabet = "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    const length = alphabet.length - 1;
    let key = "";
    for (let i = 0; i < 10; i++) {
      const indice = Math.floor(Math.random() * length);
      key += alphabet[indice];
    }
    dispatch(update(key));
  };

  useEffect(() => {
    if (!id) {
      generateID();
    }
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission().then(() => {
        const socket = io.connect("http://localhost:8000", {
          transports: ["websocket"],
        });
        socket.emit("login", { userId: id });
        socket.on("contestation", (data) => {
          var title;
          var message;
          if (data.win) {
            title = "Contestation réussie";
            message = "le joueur " + data.contestant + " a réussi une contestation";
          } else {
            title = "Contestation échouée";
            message = "le joueur " + data.contestant + " a échoué une contestation";
          }
          showNotification(message, title);
        });
        socket.on("setEnded", (data) => {
          const message =
            "Set gagné par " +
            data.winner +
            " contre " +
            data.loser +
            "(" +
            data.sets +
            ")";
          const title = "Set gagné par " + data.winner;
          showNotification(message, title);
        });
        socket.on("matchFinished", (data) => {
          const message = "Match gagné par " + data.winner + " contre " + data.loser;
          const title = "Match terminé";
          showNotification(message, title);
        });
        socket.on("bets", (data) => {
          var message;
          var title;
          if (data.win) {
            message = "Vous avez gagné " + data.amount + " dollars. ";
            title = "Paris gagné !";
          } else {
            message = "Vous avez perdu " + data.amount + " dollars. ";
            title = "Paris perdu...";
          }
          showNotification(message, title);
        });

        return () => socket.disconnect();
      });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <Menu>
        <Link to="/">Matchs</Link>
        <Link to="/paris">Mes paris</Link>
        <Link to="/profil">Profil</Link>
      </Menu>

      <Switch>
        <Route exact path="/">
          <Matchs />
        </Route>
        <Route path="/paris">
          <Bets />
        </Route>
        <Route path="/profil">
          <Profil />
        </Route>
        <Route path="/match/:id">
          <Match />
        </Route>
      </Switch>
    </Router>
  );
}

export default Navbar;

const Menu = styled.nav`
  width: 576px;
  display: grid;
  grid-template: auto / 1fr 1fr 1fr;
  margin: 10px auto 0 auto;
  border-radius: 4px;
  background-color: #62c000;
  a {
    color: #ffffff;
    text-decoration: none;
    text-align: center;
    padding: 10px;
    letter-spacing: 1px;

    :hover {
      background-color: #4c9400;
      color: #d6d6d6;
      border-radius: 4px;
      transition-duration: 0.25s;
    }
  }
`;
