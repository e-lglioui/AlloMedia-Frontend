import React from 'react';
import { logout } from '../service/authService';

const Header = () => {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <header className='d-flex shadow-lg py-4 px-4 bg-white font-sans min-vh-10'>
      <div className='d-flex flex-wrap align-items-center justify-content-between w-100'>
        <a href="javascript:void(0)" className="position-relative mx-auto mx-lg-0">
          <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
        </a>

        <div id="collapseMenu" className='d-none d-lg-block'>
          <button id="toggleClose" className='d-lg-none btn btn-light rounded-circle position-fixed top-2 end-0 z-100'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"></path>
            </svg>
          </button>

          <ul className='d-flex flex-column flex-lg-row list-unstyled gap-3'>
            <li className='d-lg-none mb-6'>
              <a href="javascript:void(0)">
                <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
              </a>
            </li>
            <li>
              <a href='javascript:void(0)' className='text-primary font-weight-bold'>Home</a>
            </li>
          </ul>
        </div>

        <div className='d-flex align-items-center ml-auto'>
          {!isLoggedIn ? (
            <>
              <button className='btn btn-link text-primary'>
                <a href='/login' className='text-primary'>Login</a>
              </button>
              <button className='btn btn-outline-primary ml-2'>
                <a href='/register' className='text-primary'>Register</a>
              </button>
            </>
          ) : (
            <button className='btn btn-danger ml-2' onClick={logout}>
              Logout
            </button>
          )}

          <button id="toggleOpen" className='d-lg-none btn btn-light'>
            <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
