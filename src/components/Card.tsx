import { ProductType } from '@/types/Product';
import { Link } from 'react-router-dom';

const Card: React.FC<{ product: ProductType }> = ({ product }) => {
  return (
    <div className='flex-auto max-w-[20rem] border rounded-lg shadow-lg bg-gray-900 border-gray-700'>
      <img
        className='rounded-t-lg max-h-40 mx-auto object-contain'
        src={product.thumbnail}
        alt='product image'
      />
      <div className='p-5'>
        <h5 className='mb-2 text-wrap text-2xl font-bold text-gray-100 line-clamp-2 leading-9 h-[3em]'>
          {product.title}
        </h5>
        <p className='mb-3 font-normal text-gray-400 text-wrap line-clamp-3 leading-normal h-[4.5em]'>
          {product.description}
        </p>
        <Link
          to={`/products/${product.id}`}
          className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-100 rounded-md hover:text-white focus:outline-none bg-blue-600 hover:bg-blue-700 transition'
        >
          More info
          <svg
            className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 10'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 5h12m0 0L9 1m4 4L9 9'
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;
