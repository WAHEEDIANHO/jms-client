import {useLocation} from "react-router-dom";

const Application = () => {

    const { state } = useLocation();
    console.log(state)

    return (
        <div>
            Application listing
        </div>
    )


}

export default Application;