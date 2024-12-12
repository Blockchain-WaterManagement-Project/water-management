import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async (artifact1, artifact2) => {
      if (artifact1 && artifact2) {
        try {
          const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
          const accounts = await web3.eth.getAccounts();
          const networkID = await web3.eth.net.getId();
          console.log(`Network ID: ${networkID}`);

          const { abi: abi1 } = artifact1;
          const { abi: abi2 } = artifact2;
          let address1, contract1, address2, contract2;

          try {
            address1 = artifact1.networks[networkID].address;
            contract1 = new web3.eth.Contract(abi1, address1);
            address2 = artifact2.networks[networkID].address;
            contract2 = new web3.eth.Contract(abi2, address2);
          } catch (err) {
            console.error(`Error initializing contracts: ${err}`);
            return;
          }

          console.log(`Contracts initialized: ${address1}, ${address2}`);

          dispatch({
            type: actions.init,
            data: { artifact1, artifact2, web3, accounts, networkID, contract1, contract2 }
          });
        } catch (err) {
          console.error(`Error initializing Web3: ${err}`);
        }
      }
    },
    []
  );

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact1 = require("../../contracts/QualitySC.json");
        const artifact2 = require("../../contracts/WaterNFT.json");

        init(artifact1, artifact2);
      } catch (err) {
        console.error(`Error loading artifacts: ${err}`);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    if (window.ethereum) {
      const events = ["chainChanged", "accountsChanged"];
      const handleChange = () => {
        init(state.artifact1, state.artifact2);
      };

      events.forEach(e => window.ethereum.on(e, handleChange));
      return () => {
        events.forEach(e => window.ethereum.removeListener(e, handleChange));
      };
    }
  }, [init, state.artifact1, state.artifact2]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;