import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Analytics from "./components/Analytics";

function App() {
  return (
    <EthProvider>
      <Router>
      <div className="container">
        <Topbar/>
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/users" element={<h1>
                List of Users</h1>} />
            <Route path="/wallet" element={<h1>
                List of Product</h1>} />
            <Route path="/transaction" element={<h1>
                Product (NFT)</h1>} />
            <Route path="/marketplace" element={<h1>
                New Product</h1>} />
            <Route path="/marketplace" element={<h1>
                New Product</h1>} />
            <Route path="/trade" element={<h1>
                New Product</h1>} />
            <Route path="/share" element={<h1>
                New Product</h1>} />
            <Route path="/manage" element={<h1>
                Manage Page</h1>} />
            <Route path="/analytic" element={<Analytics/>} />
            <Route path="/report" element={<h1>
                Report Page</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
    </EthProvider>
  );
}

export default App;