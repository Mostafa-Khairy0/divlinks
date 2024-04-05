import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={() => <Home />} />
        <Route path="/profile/:profileId" Component={() => <ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
