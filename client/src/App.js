import AllGames from './components/AllGames';
import NewGame from './components/NewGame';
import OneGame from './components/OneGame';
import EditGame from './components/EditGame';
import { Router } from '@reach/router'
import './App.css';



function App() {


  return (
    <div className="App">
      <Router>
        {/* By default, React starts at path='/', So if you want another path to be the default, use the keyword 'default' in the component */}
        <AllGames path='/' />
        <NewGame path='/new' />
        <OneGame path='/game/:id' />
        <EditGame path='/game/edit/:id' />

      </Router>
    </div>
  );
}

export default App;
