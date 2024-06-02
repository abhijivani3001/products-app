import PageLayout from '@/components/PageLayout';
import { Spinner } from '@/components/ui/Spinner';
import { useProducts } from '@/context/ProductsContext';
import { ProductType } from '@/types/Product';
import { useParams } from 'react-router-dom';

const ProductInfo = () => {
  const { products, isLoading, isError } = useProducts();

  const { productId } = useParams();
  const numericProductId = parseInt(productId || '-1', 10);

  if (isError) {
    return (
      <div className='text-xl text-gray-100 flex justify-center items-center'>
        Something went wrong!
      </div>
    );
  }

  const product: ProductType | undefined = products?.find(
    (item) => item.id === numericProductId
  );

  console.log(product);

  return (
    <PageLayout>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {/* heading */}
          <div className='flex flex-col md:flex-row justify-evenly items-start md:gap-8 md:px-10 mb-8'>
            <div className='text-left md:w-[60vw] mt-10'>
              <h2 className='text-3xl md:text-4xl text-gray-100 font-semibold mb-4'>
                {product?.title}
                {product?.brand && (
                  <span className='text-lg ml-4 font-thin text-gray-200'>
                    - {product?.brand}
                  </span>
                )}
              </h2>
              <p className='text-lg text-gray-400 leading-5'>
                {product?.description}
              </p>
            </div>

            <div className='mx-auto'>
              <img
                src={product?.thumbnail}
                alt='product thumbnail'
                className='max-h-[12rem] md:max-h-[16rem] w-auto'
              />
            </div>
          </div>

          <div className='w-full border border-gray-700 mb-8'></div>

          {/* tags */}
          <div className='flex justify-between items-center mb-8 w-[75vw] mx-auto'>
            <div className='flex justify-center items-center gap-3'>
              {product?.tags.map((tag) => {
                return (
                  <button className='bg-blue-900 hover:bg-blue-800 px-2 py-1 rounded-lg font-semibold text-blue-200 hover:text-blue-100 transition'>
                    # {tag}
                  </button>
                );
              })}
            </div>
            <div
              className={`text-lg flex gap-2 items-center justify-center font-medium ${
                product?.availabilityStatus === 'In Stock'
                  ? 'text-green-300'
                  : 'text-red-300'
              }`}
            >
              <div
                className={`rounded-full h-4 w-4 ${
                  product?.availabilityStatus === 'In Stock'
                    ? 'bg-green-400'
                    : 'bg-red-400'
                }`}
              ></div>
              {product?.availabilityStatus}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ProductInfo;
