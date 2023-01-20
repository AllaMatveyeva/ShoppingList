import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { ShoppingList } from "./ShoppingList";

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'




function App() {
  
  return (
    <>
    <DndProvider backend={HTML5Backend}> 
    <Router>
      <Routes>
    <Route exact path='/' element={<ShoppingList/>} />
   </Routes>
    </Router>
    </DndProvider>
    </>
  );
}

export default App;
