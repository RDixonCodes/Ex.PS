import React from 'react';
import { Router } from '@reach/router';
import Main from './views/Main';
import PetForm from './components/PetForm';
import PetDetails from './views/PetDetails';
import UpdatePet from './views/UpdatePet';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Main path="/"/>
        <PetForm path="/pets/new"/>
        <PetDetails path="/pets/:id"/>
        <UpdatePet path="/pets/:id/edit"/>
      </Router>
    </div>
  );
}

export default App;
