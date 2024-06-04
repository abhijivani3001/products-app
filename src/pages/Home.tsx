import Card from '@/components/Card';
import PageLayout from '@/components/PageLayout';
import { Spinner } from '@/components/ui/Spinner';
import { useProducts } from '@/context/ProductsContext';
import { ProductType } from '@/types/Product';
import { useEffect, useState } from 'react';

const Home = () => {
  const { products, isLoading, isError, searchedItem } = useProducts();

  const [filteredProducts, setFilteredProducts] = useState<
    ProductType[] | null
  >(null);

  useEffect(() => {
    setFilteredProducts(products);
    if (searchedItem) {
      const filtered = products?.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchedItem) ||
          product.brand?.toLowerCase().includes(searchedItem) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(searchedItem))
      );
      setFilteredProducts(filtered || []);
    }
  }, [products, searchedItem]);

  if (isError) {
    return <div className='error-msg'>Something went wrong!</div>;
  }

  return (
    <PageLayout>
      {(isLoading && !filteredProducts?.length) || filteredProducts === null ? (
        <Spinner />
      ) : filteredProducts?.length ? (
        <>
          <div className='flex flex-wrap justify-center items-start gap-5'>
            {filteredProducts?.map((product) => {
              return <Card key={product.id} product={product} />;
            })}
          </div>
          {isLoading && (
            <div className='text-2xl  text-gray-300 text-center my-10'>
              Loading more products...
            </div>
          )}
        </>
      ) : (
        <div className='error-msg'>No more products are available!</div>
      )}
    </PageLayout>
  );
};

export default Home;
