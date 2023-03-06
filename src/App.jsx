/* css import */
import './App.scss';

/* router dom import */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

/* pages import */
import ListPage from './pages/listPage/ListPage.jsx'
import DetailsPage from './pages/detailsPage/DetailsPage.jsx'

function App() {

  const [ dayNight, setDayNight ] = useState(false)

  return (
    <div className={`App ${dayNight ? 'light': 'dark'}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPage setDayNight={setDayNight} dayNight={dayNight} />} />
          <Route path="/details/:id" element={<DetailsPage  />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
