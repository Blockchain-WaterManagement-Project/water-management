import useEth from "../../contexts/EthContext/useEth";
import { Title } from "./Title";
import { NoticeNoArtifact } from "./NoticeNoArtifact";
import { NoticeWrongNetwork } from "./NoticeWrongNetwork";
import { Outlet } from "react-router-dom";

const Ownership = () =>{
    const { state } = useEth();

    return(
        <div style={{ margin: '20px 30px', padding: '10px 20px'}}>
            <Title />
            {
                !state.artifact2 ? <NoticeNoArtifact /> :
                !state.contract2 ? <NoticeWrongNetwork /> :
                <Outlet />
            }
        </div>
    )
}

export default Ownership;