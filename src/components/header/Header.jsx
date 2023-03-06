

import HeaderImage from '../../img/img1.png'
import MoonIcon from '../../img/moon-stars.svg'
import './Header.scss'

export default function Header({childToParent, buttonComponent, sendData, setDayNight, dayNight}) {
    
    const Button = buttonComponent;

    return (
        <nav className={`header ${dayNight ? 'light' : 'dark'}`}>

            <img src={HeaderImage} alt="" />
            <div>
                <input
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    onChange={(e) => {
                        childToParent(e.target.value);
                    }}
                    
                    placeholder='Search Names' 
                  />

                <button
                    className='darkLight'
                    onClick={() => {
                        setDayNight(prev => !prev)}}
                       >
                         <img src={MoonIcon} alt="" />
                </button>
               
                <Button />
            </div>
        </nav>
    );
}
