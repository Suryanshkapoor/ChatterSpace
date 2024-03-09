import placeholder from '../assets/profile-placeholder.svg'
import logout from '../assets/logout.svg'
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSignoutAccount } from '../react-query/queriesAndMutations';
import { useEffect } from 'react';
import { useUserContext } from '../context/AuthContext';

const Topbar = () => {

	const { mutate: signOut, isSuccess } = useSignoutAccount();
	const navigate = useNavigate();

	const { user }= useUserContext();

	useEffect(()=>{
		if(isSuccess)navigate('/sign-in');
	},[isSuccess,navigate]);

  return (
    <section className="bg-zinc-950 sticky top-0 z-50 w-full md:hidden ">
      <div className="flex justify-between py-4 px-5 text-white">
        <Link to='/' className="flex gap-3 items-center">
          <img className='rounded-full' src={logo} alt="logo" width={40} height={40} />
          <h1 className='font-bold text-lg'>Chatter-Space</h1>
        </Link>
		<div className='flex gap-4'>
			<button variant='ghost'
			className='flex gap-4 items-center justify-start !important'
			onClick={()=>signOut()}>
				<img src={logout} alt="LOGOUT" />
			</button>
			<Link to={`/profile/${user.id}`}>
				<img className='w-10 h-10 rounded-full' src={user.imageUrl||placeholder} alt="Profile pic" />
			</Link>
		</div>
      </div>
    </section>
  );
};

export default Topbar;
