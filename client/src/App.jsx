import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Trade from "./components/Trade";
import Marketplace from "./components/pages/Marketplace";
import Transaction from "./components/Transaction";
import Analytics from "./components/pages/Analytics";
import Account from "./components/pages/Account";
import { nftData, tradeData } from "../utils/river.data";
import Manage from "./components/pages/Manage";
import Report from "./components/pages/Report";

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
            <Route path="/wallet" element={<Account/>} />

            <Route path="/transaction" element={<Transaction/>} />

            <Route path="/marketplace" element={<Marketplace dataset={nftData}/>} />

            <Route path="/trade" element={<Trade dataset={tradeData}/>} />

            <Route path="/share" element={<h1>
                New Product</h1>} />
            <Route path="/manage" element={<Manage/>} />
            <Route path="/analytic" element={<Analytics/>} />
            <Route path="/report" element={<Report/>} />
          </Routes>
        </div>
      </div>
    </Router>
    </EthProvider>
  );
}

export default App;