import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Profile from "./pages/Profile.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={() => <Home />} />
        <Route path="/profile/:profileId" Component={() => <Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
