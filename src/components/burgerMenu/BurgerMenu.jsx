import menuIcon from "../../img/menu.png";

const BurgerMenu = () => {
    return (
        <button
            onClick={() => {
                document
                    .querySelectorAll(".filterTypesOn")
                    .forEach((e) => (e.style.display = "none"));
                document
                    .querySelectorAll(".filterTypesOff")
                    .forEach((e) => (e.style.display = "flex"));
            }}
        >
            {" "}
            <img src={menuIcon} alt="menuIcon" />{" "}
        </button>
    );
};

export default BurgerMenu;
