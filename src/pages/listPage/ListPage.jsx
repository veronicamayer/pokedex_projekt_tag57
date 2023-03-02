import ListItem from "../../components/listItem/ListItem";



const ListPage = () => {


/***************************************************************************************************
 * 
 *       Fetch 
 *      https://pokeapi.co/api/v2/pokemon/{HeaderSearchNames}
 * 
 ****************************************************************************************************/




console.log(data);

    return (



        <section className="listPage">

            {/* // ! .map */}
            {data  &&   data.map((i, index) => {

                return <ListItem
                    key={index}
                    img_url={i.img_url}
                    nr={i.nr}
                    name={i.name}
                >
                </ListItem>
            })
            }
        </section>
    );
}

export default ListPage;



