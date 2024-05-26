import { useContext } from 'react';
import { GlobalContext, useGlobalContext } from '../providers/RootLayout';

const Footer = () => {

  
  return (
    <div className='p-6 text-center'>
        <p className="text-sm opacity-[0.9]">&#169; 2024 Tuan Thanh. All Right Reserved</p>
    </div>
  )
}

export default Footer
