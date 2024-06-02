import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='border-gray-800 bg-gray-900 z-30 w-full shadow-lg sticky top-0'>
      <div className='max-w-screen-xl flex items-center justify-between mx-auto p-4 my-auto'>
        <Link
          to={'/'}
          className='flex focus:outline-none items-center space-x-3 rtl:space-x-reverse'
        >
          <img src='/logos/logo-base-1200x1200.png' className='h-12 w-12' />
          <span className='hidden md:block self-center text-3xl my-auto font-semibold whitespace-nowrap text-gray-100'>
            Products
            <span className='bg-gradient-to-r from-indigo-400 to-sky-300 bg-clip-text text-transparent'>
              App
            </span>
          </span>
        </Link>
        <div className='flex md:order-2'>
          <div className='relative md:block'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
              <span className='sr-only'>Search icon</span>
            </div>
            <input
              type='text'
              id='search-navbar'
              className='block w-full p-2 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none'
              placeholder='Search...'
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
