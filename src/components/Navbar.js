import styled from "styled-components";
import Matchs from "../views/Matchs";
import Bets from "../views/Bets";
import Profil from "../views/Profil";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <Router>
      <Menu>
        <Link to="/matchs">Matchs</Link>
        <Link to="/paris">Mes paris</Link>
        <Link to="/profil">Profil</Link>
      </Menu>

      <Switch>
        <Route exact path="/matchs">
          <Matchs />
        </Route>
        <Route path="/paris">
          <Bets />
        </Route>
        <Route path="/profil">
          <Profil />
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
