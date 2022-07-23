import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SearchUser from "./pages/SearchUser/SearchUser";

//import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchUser />} />        
      </Routes>
    </Router>
  );
}
