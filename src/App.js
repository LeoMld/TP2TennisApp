import Navbar from "./components/Navbar";
import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <Navbar/>
          </div>
      </Provider>
  );
}

export default App;
