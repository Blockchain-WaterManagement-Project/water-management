import useEth from "../../contexts/EthContext/useEth";
import { Title } from "./Title";
import { NoticeNoArtifact } from "./NoticeNoArtifact";
import { NoticeWrongNetwork } from "./NoticeWrongNetwork";
import { Home } from "./Home";

const Management = () =>{
    const { state } = useEth();

    const management =
    <>
      <div className="contract-container">
        <Home />
      </div>
    </>;

    return(
        <div style={{ margin: '20px 30px', padding: '10px 20px'}}>
            <Title />
            {
                !state.artifact ? <NoticeNoArtifact /> :
                !state.contract ? <NoticeWrongNetwork /> :
                 management
            }
        </div>
    )
}

export default Management;