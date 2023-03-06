import { useNavigate } from "react-router-dom";

import back from "../../img/back.png";

import "./BackButton.scss";

function BackButton() {
    const navigate = useNavigate();

    function handleClick() {
        navigate(-1); // -1 represents going back one page in the history
    }

    return (
    <button onClick={handleClick}>
        <img src={back} alt="back" />
    </button>
    )
}

export default BackButton;
