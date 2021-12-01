import './App.css';
import SearchCity from './components/SearchCity';
import { createStore } from 'redux';
import { rootReducer } from './redux/rootReducer';
import { Provider } from 'react-redux';
import history from './router/history';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import City from './components/City';

function App() {

  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  return (
    <Provider store={store}>
        <Router history={history}>
            <div className="App">
              <div className="wrapper">
                  <Routes>
                      <Route path="/" element={<SearchCity />} />
                      <Route path="/weather/:lon/:lat" element={<City />} />
                  </Routes>
              </div>
            </div>
        </Router>
    </Provider>
  );
}

export default App;
