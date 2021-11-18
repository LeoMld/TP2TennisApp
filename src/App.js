import Navbar from "./components/Navbar";
import store from './store'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

function App() {
    let persistor = persistStore(store);
    
    return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <div className="App">
                  <Navbar/>
              </div>
          </PersistGate>
      </Provider>
    );
}

export default App;
