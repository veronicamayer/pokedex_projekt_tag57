


// import css
import "./ListItem.scss"

// img import zum testen und stylen

import test_pokemon_image from "../../img/test_pokemon_image 2_.png";

console.log(test_pokemon_image)


const ListItem = (props) => {
    return ( 
        <section className="listItem">

            <article>
           {/* {dann img_url} */}
                <img src={test_pokemon_image} alt={`Bild des Pokemeno {props.name}`} />
            </article>
            <article>
            <p>#001 {props.nr}</p>
            <p>Bulbasaur {props.name}</p>
            </article>

        </section>
     );
}
 
export default ListItem;