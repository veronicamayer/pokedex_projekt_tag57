// import css
import "./ListItem.scss";

const ListItem = (props) => {
    return (
        <>
            <section className="listItem">
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
