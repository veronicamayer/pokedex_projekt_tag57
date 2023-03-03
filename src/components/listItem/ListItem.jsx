// import css
import "./ListItem.scss";

// img import zum testen und stylen

const ListItem = (props) => {
    return (
        <>
            <section className="listItem">
                <article>
                    {/* {dann img_url} */}
                    {/*                     <img src={test_pokemon_image} alt={`Bild des Pokemeno {props.name}`} />
                     */}{" "}
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

/* sprites zeile 9748
front_default  */
