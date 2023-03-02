/* css import */
import './App.scss';

/* router dom import */
import { BrowserRouter, Routes, Route } from 'react-router-dom'

/* pages import */
import ListPage from './pages/listPage/ListPage.jsx'
import DetailsPage from './pages/detailsPage/DetailsPage.jsx'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
