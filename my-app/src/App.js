import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { ShoppingList } from "./ShoppingList";






function App() {
  
  return (
    <>
    <Router>
      <Routes>
    <Route exact path='/' element={<ShoppingList/>} />
   </Routes>
    </Router>
    </>
  );
}

export default App;
