"use client"
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import Loader from './Loader';

const Header = () => {
  const { data: session } = useSession();

  // Check if session or session.user is undefined before accessing properties
  if (!session || !session.user) {
    return <Loader/>
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); // Redirect to the homepage after sign-out
    
  };

  return (
    <header className="flex items-center justify-between px-20 py-2 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <div className="rounded-full overflow-hidden w-12 h-12">
          <Image
            src={session.user.image}
            width={48}
            height={48}
            alt="User Avatar"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold">{session.user.name}</h1>
          <p className="text-sm">{session.user.email}</p>
        </div>
      </div>
      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-semibold"
      >
        Sign Out
      </button>
    </header>
  );
};

export default Header;
