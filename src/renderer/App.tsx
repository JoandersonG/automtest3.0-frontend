import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeContextProvider, getBlauSkin, getMovistarSkin, getTuSkin } from '@telefonica/mistica';
import ApplicationBody from '../components/ApplicationBody';

function StartUp() {
  
  const misticaTheme = {
    skin: getBlauSkin(),
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
  };

  return (
      <ThemeContextProvider theme={misticaTheme}>
        <ApplicationBody />
      </ThemeContextProvider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartUp />} />
      </Routes>
    </Router>
  );
}
