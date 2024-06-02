import Card from '@/components/Card';
import PageLayout from '@/components/PageLayout';
import { Spinner } from '@/components/ui/Spinner';
import { useProducts } from '@/context/ProductsContext';

const Home = () => {
  const { products, isLoading, isError } = useProducts();

  if (isError) {
    return (
      <div className='text-xl text-gray-100 flex justify-center items-center'>
        Something went wrong!
      </div>
    );
  }

  return (
    <PageLayout>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='flex flex-wrap justify-center items-start gap-5'>
          {products?.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
      )}
    </PageLayout>
  );
};

export default Home;
