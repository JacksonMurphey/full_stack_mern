import LogReg from './views/LogReg';
import AllGames from './components/AllGames';
import NewGame from './components/NewGame';
import OneGame from './components/OneGame';
import EditGame from './components/EditGame';
import { Router } from '@reach/router'
import Profile from './components/Profile';
import './App.css';



function App() {


  return (
    <div className="App">

      <Router>
        {/* By default, React starts at path='/', So if you want another path to be the default, use the keyword 'default' in the component */}
        <LogReg path='/' />
        <AllGames path='/home' />
        <NewGame path='/new' />
        <OneGame path='/game/:id' />
        <EditGame path='/game/edit/:id' />
        <Profile path='/users/profile/:username' />

      </Router>

    </div>
  );
}

export default App;
