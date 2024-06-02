import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ProductInfo from './pages/ProductInfo';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:productId' element={<ProductInfo />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
