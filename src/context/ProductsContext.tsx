import { ProductType } from '@/types/Product';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface ProductsContextValueType {
  products: ProductType[] | null;
  setProducts: (products: ProductType[]) => void;
  isLoading: boolean;
  isError: boolean;
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
  const [products, setProducts] = useState<ProductType[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(import.meta.env.VITE_API_URL || '');
      setProducts(res.data.products);
    } catch (error) {
      setIsError(true);
      console.error('ERROR: ', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, isLoading, isError }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
