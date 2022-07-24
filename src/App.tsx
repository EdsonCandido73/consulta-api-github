import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SearchUser from "./pages/SearchUser/SearchUser";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchUser />} />        
      </Routes>
    </Router>
  );
}
