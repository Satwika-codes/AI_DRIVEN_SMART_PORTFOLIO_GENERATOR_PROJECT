// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Generator from "./pages/Generator";
// import PortfolioView from "./pages/PortfolioView";

// function App() {
//   return (
//     <Router>

//       <Routes>

//         {/* Landing Page */}
//         <Route path="/" element={<Landing />} />

//         {/* Authentication */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* User Dashboard */}
//         <Route path="/dashboard" element={<Dashboard />} />

//         {/* Portfolio Generator */}
//         <Route path="/generate" element={<Generator />} />

//         {/* Live Shareable Portfolio */}
//         <Route path="/portfolio/:id" element={<PortfolioView />} />

//       </Routes>

//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Generator from "./pages/Generator";
import PortfolioView from "./pages/PortfolioView";

function App() {
  return (
    <Router>

      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 🔥 Generator (CREATE + UPDATE) */}
        <Route path="/generate" element={<Generator />} />
        <Route path="/generate/:id" element={<Generator />} />

        {/* Portfolio View */}
        <Route path="/portfolio/:id" element={<PortfolioView />} />

      </Routes>

    </Router>
  );
}

export default App;