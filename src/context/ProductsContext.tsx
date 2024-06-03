import { ProductType } from '@/types/Product';
import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

interface ProductsContextValueType {
  products: ProductType[] | null;
  setProducts: (products: ProductType[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isError: boolean;
  searchedItem: string;
  setSearchedItem: (item: string) => void;
}

const ProductsContext = createContext<ProductsContextValueType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const products = useContext(ProductsContext);
  if (!products) {
    throw new Error('useProducts must be used within ProductsProvider');
  }
  return products;
};

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchedItem, setSearchedItem] = useState<string>(''); // filtered items
  const [index, setIndex] = useState(20); // items to skip for each api call

  const fetchData = useCallback(async () => {
    if (
      isLoading ||
      searchedItem ||
      location.pathname !== '/' ||
      products.length >= 194
    ) {
      return;
    }
    // here 194 is total products available

    setIsLoading(true);
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + `?skip=${index}&limit=10`
      );
      setProducts((prevProducts) => [...prevProducts, ...res.data.products]);
      setIndex((prevIdx) => prevIdx + 10);
    } catch (error) {
      setIsError(true);
      console.error('ERROR: ', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, index, searchedItem, location, products]);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        import.meta.env.VITE_API_URL + `?skip=0&limit=20`
      );
      setProducts(res.data.products);
    } catch (error) {
      setIsError(true);
      console.error('ERROR: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        // before goes to 100px from bottom of scrollbar
        fetchData();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchData]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        isLoading,
        setIsLoading,
        isError,
        searchedItem,
        setSearchedItem,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
