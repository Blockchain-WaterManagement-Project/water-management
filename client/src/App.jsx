import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink // Use NavLink for active link styling
} from "react-router-dom";
import { EthProvider } from "./contexts/EthContext";
import Management from "./components/Management";
import Ownership from "./components/Ownership";
import { Dashboard as DataPanel } from "./components/Ownership/Dashboard";
import Storage from "./components/Storage";
import ErrorPage from "./ErrorPage";
import Marketplace from "./components/Ownership/Marketplace";
import Tokenize from "./components/Ownership/Tokenize";
import Update from "./components/Ownership/Update";
import Delete from "./components/Ownership/Delete";
import Reencryption from "./components/Ownership/Reencryption";
import Transfer from "./components/Ownership/Transfer";
import Read from "./components/Ownership/Read";

// Navigation Component
const Navigation = () => {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/marketplace', label: 'Marketplace' },
    { path: '/asset', label: 'My Assets' },
    { path: '/manage', label: 'Management' },
    { path: '/encrypt', label: 'Reencryption' },
  ];

  return (
    <nav style={{ width: '100%', height: '60px' }}>
      <ul style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', listStyleType: 'none' }}>
        {links.map(link => (
          <li key={link.path} style={{ margin: '5px 10px', padding: '5px 20px', background: '#242424', borderRadius: '.5rem' }}>
            <NavLink 
              to={link.path} 
              style={({ isActive }) => ({
                color: isActive ? '#ffcc00' : '#fff', // Change color for active link
                textDecoration: 'none'
              })}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

function App() {
  return (
    <EthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Navigation /> {/* Use the Navigation component */}
          <Routes>
            <Route path="/" element={<Storage />} />
            <Route path="/asset" element={<Ownership />}>
              <Route index element={<DataPanel />} />
              <Route path="tokenize" element={<Tokenize />} />
              <Route path="read" element={<Read />} />
              <Route path="update" element={<Update />} />
              <Route path="transfer" element={<Transfer />} />
              <Route path="delete" element={<Delete />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route path="/manage" element={<Management />} />
            <Route path="/encrypt" element={<Reencryption />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </EthProvider>
  );
}

export default App;