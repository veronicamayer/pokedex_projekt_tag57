import ListItem from "../../components/listItem/ListItem";

import { useEffect, useState } from "react";


const ListPage = () => {




        <section className="listPage">


{/* // ! Objek */}
<ListItem
    img_url={getData.sprites.front_default}
    nr={getData.order}
    id={getData.game_indices.game_index}
    name={getData.name}
   type1={getData.types[0].type.name}
    type2={getData.types[1].type.name}

>
</ListItem>


        </section>
    
}

export default ListPage;



