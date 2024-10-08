// Suggested code may be subject to a license. Learn more: ~LicenseLog:2276905245.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3971002123.
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="">
        <Link href="/">
          
            <Image
              src="/logo.png" // Replace with your logo path
              alt="FrontForumFocus Logo"
              width={100} // Adjust width as needed
              height={30} // Adjust height as needed
            />
          
        </Link>
      </div>
      <nav className="container mx-auto px-6 py-3">
        
          
            <Link href="/individuals">
              <button>Individuals</button>
            </Link>
          
          
            <Link href="/business">
              <button>Business</button>
            </Link>
          
        
      </nav>
      <div className="">
        <button className="">Sign In</button>
        <button className="">Join Better</button>
      </div>
    </header>
  );
};

export default Header;
