import { EthProvider } from "./contexts/EthContext";
import Footer from "./components/Footer";
import Management from "./components/Management";
import Ownership from "./components/Ownership";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Ownership />
          <hr />
          <Management />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
