// import css
import "./ListItem.scss";

const ListItem = (props) => {

    console.log(props);
    return (
        <>
            <section 
            className={`listItem ${props.dayNight ? 'lightItem' : 'darkItem' }`}>
                <article>
                    <img
                        src={props.img_url}
                        alt={`Bild des Pokemeno {props.name}`}
                    />
                </article>

                <article>
                    <p>{props.nr}</p>
                    <p>{props.name}</p>
                </article>
            </section>
        </>
    );
};

export default ListItem;
