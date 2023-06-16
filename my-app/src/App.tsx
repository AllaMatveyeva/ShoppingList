import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import React from "react";
import { ShoppingList } from "./ShoppingList.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";





function App() {
    return (
    <>
    <Provider store={store}>
    
    <Router>
      <Routes>
    <Route path='/' element={<ShoppingList/>} />
   </Routes>
    </Router>
        </Provider>
    </>
  );
}

export default App;
