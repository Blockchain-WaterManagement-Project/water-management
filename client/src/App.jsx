import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link  } from "react-router-dom";
import { EthProvider } from "./contexts/EthContext";
import Management from "./components/Management";
import Ownership from "./components/Ownership";
import { Dashboard as DataPanel } from "./components/Ownership/Dashboard";
import Storage from "./components/Storage";
import ErrorPage from "./ErrorPage";
import Tokenize from "./components/Ownership/Tokenize";
import Update from "./components/Ownership/Update";
import Delete from "./components/Ownership/Delete";
import Reencryption from "./components/Ownership/Reencryption";

function App() {
  return (
    <EthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <nav style={{ width: '100%', height: '60px'}}>
            <ul style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', listStyleType: 'none'}}>
              <li style={{  margin: '5px 10px', padding: '5px 20px', background: '#242424', borderRadius: '.5rem'}}>
                <Link to={'/'} style={{ color: '#fff', textDecoration: 'none'}}>Home</Link>
              </li>
              <li style={{  margin: '5px 10px', padding: '5px 20px', background: '#242424', borderRadius: '.5rem'}}>
                <Link to={'/asset'} style={{ color: '#fff', textDecoration: 'none'}}>My Assets</Link>
              </li>
              <li style={{  margin: '5px 10px', padding: '5px 20px', background: '#242424', borderRadius: '.5rem'}}>
                <Link to={'/manage'} style={{ color: '#fff', textDecoration: 'none'}}>Management</Link>
              </li>
              <li style={{  margin: '5px 10px', padding: '5px 20px', background: '#242424', borderRadius: '.5rem'}}>
                <Link to={'/encrypt'} style={{ color: '#fff', textDecoration: 'none'}}>Reencryption</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Storage />} />
            <Route path="/asset" element={<Ownership/>}>
              <Route index element={<DataPanel/>} />
              <Route path="tokenize" element={<Tokenize />} />
              <Route path="update" element={<Update />} />
              <Route path="delete" element={<Delete />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route path="/manage" element={<Management/>} />
            <Route path="/encrypt" element={<Reencryption />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </EthProvider>
  );
}

export default App;
