import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";

function Header() {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-50 flex items-center px-4 py-2 bg-white shadow-sm">
      <div className="relative flex-shrink-0 w-20 h-10 cursor-pointer">
        <Link href="/">
          <Image
            objectFit="contain"
            src="https://links.papareact.com/fqy"
            layout="fill"
          />
        </Link>
      </div>

      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="w-5 h-5" />
        <p className="flex-1 hidden ml-2 lg:inline">Home</p>
        <ChevronDownIcon className="w-5 h-5" />
      </div>

      {/* Search box */}
      <form className="flex items-center flex-1 px-3 py-1 space-x-2 bg-gray-100 border border-gray-200 rounded-sm">
        <SearchIcon className="w-6 h-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>

      <div className="items-center hidden space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>

      <div className="flex items-center ml-5 lg:hidden">
        <MenuIcon className="icon" />
      </div>

      {/* Sign in sign out button */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="items-center hidden p-2 space-x-2 border border-gray-100 cursor-pointer lg:flex"
        >
          <div className="relative flex-shrink-0 w-5 h-5">
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              layout="fill"
              alt=""
            />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>
          <ChevronDownIcon className="flex-shrink-0 h-5" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="items-center hidden p-2 space-x-2 border border-gray-100 cursor-pointer lg:flex"
        >
          <div className="relative flex-shrink-0 w-5 h-5">
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              layout="fill"
              alt=""
            />
          </div>
          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </div>
  );
}

export default Header;
