import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { ShoppingList } from "./ShoppingList";

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Provider } from "react-redux";
import { store } from "./redux/store";




function App() {
  
  return (
    <>
    <Provider store={store}>
    <DndProvider backend={HTML5Backend}> 
    <Router>
      <Routes>
    <Route exact path='/' element={<ShoppingList/>} />
   </Routes>
    </Router>
    </DndProvider>
    </Provider>
    </>
  );
}

export default App;
