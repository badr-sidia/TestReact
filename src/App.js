import logo from './logo.svg';
import './App.css';
import Header from './components/sharedComponents/Header'
import ListPets from './components/pets/ListPets';

function App() {
  return (
    <div className="App container">
       <Header/>
       <ListPets/>
    </div>
  );
}

export default App;
