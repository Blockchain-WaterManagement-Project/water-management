import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";

function App() {
  return (
    <EthProvider>
      <Router>
        <Topbar/>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/users" element={<h1>
              List of Users</h1>} />
            <Route path="/user/:userId" element={<h1>
              User</h1>} />
            <Route path="/newUser" element={<h1>
              New User</h1>} />
            <Route path="/products" element={<h1>
              List of Product</h1>} />
            <Route path="/product/:productId" element={<h1>
              Product (NFT)</h1>} />
            <Route path="/newproduct" element={<h1>
              New Product</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
    </EthProvider>
  );
}

export default App;