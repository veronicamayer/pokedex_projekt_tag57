import HeaderImage from '../../img/img1.png'
import MoonIcon from '../../img/moon-stars.svg'
import './Header.scss'

export default function Header({childToParent}) {

    return (
        <nav className='header'>
            <img src={HeaderImage} alt="" />
            <div>
                <input
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    onChange={e => {
                        childToParent(e.target.value)
                    }}
                    placeholder='Search Names' />

                <button
                    className='darkLight'>
                    <img src={MoonIcon} alt="" />
                </button>
            </div>
        </nav>
    );
}

// export default Header;