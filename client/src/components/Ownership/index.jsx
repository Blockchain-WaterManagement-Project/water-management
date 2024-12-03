import useEth from "../../contexts/EthContext/useEth";
import { Title } from "./Title";
import { NoticeNoArtifact } from "./NoticeNoArtifact";
import { NoticeWrongNetwork } from "./NoticeWrongNetwork";
import { Home } from "./Home";

const Ownership = () =>{
    const { state } = useEth();

    const ownership =
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
                 ownership
            }
        </div>
    )
}

export default Ownership;