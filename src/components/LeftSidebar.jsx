import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import placeholder from "../assets/profile-placeholder.svg";
import logout from "../assets/logout.svg";
import { useUserContext } from "../context/AuthContext";
import { sidebarLinks } from "../constants";
import { useSignoutAccount } from '../react-query/queriesAndMutations';

const LeftSidebar = () => {
  const { user } = useUserContext();
  const { pathname } =useLocation();
  const { mutate: signOut, isSuccess } = useSignoutAccount();
  const navigate = useNavigate();

  useEffect(()=>{
		if(isSuccess)navigate(0);
	},[isSuccess])

  return (
    <nav className="hidden md:flex px-3 py-10 flex-col justify-between min-w-[220px] bg-zinc-950">
      <div className="flex flex-col gap-11 text-white">
        <Link to="/" className="flex gap-3 items-center">
          <img
            className="rounded-full"
            src={logo}
            alt="logo"
            width={40}
            height={40}
          />
          <h1 className="font-normal text-2xl">Chatter-Space</h1>
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            className="w-14 h-14 rounded-full"
            src={user.imageUrl || placeholder}
            alt="Profile"
          />
          <div className="flex flex-col">
            <p className="font-semibold capitalize">{user.name}</p>
            <p className="text-xs font-medium text-gray-400">{user.email}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname ===link.route
            return (
              <li
                className={`group rounded-lg base-medium hover:bg-violet-600 transition ${isActive && 'bg-violet-600'}`}
                key={link.label}
              >
                <Link
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img className={`group-hover:invert group-hover:brightness-0 group-hover:transition ${isActive && 'invert brightness-0 transition'}`} src={link.imgURL} alt={link.label} />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button variant='ghost'
			className='mx-auto text-sm flex gap-4 items-center justify-start text-white !important'
			onClick={()=>signOut()}>Sign Out
				<img src={logout} alt="LOGOUT" />
			</button>
    </nav>
  );
};

export default LeftSidebar;
