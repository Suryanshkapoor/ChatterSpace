import React from 'react'
import { useGetPostbyId } from '../react-query/queriesAndMutations'
import Posts from './Posts'
import loader from '../assets/loader.svg'

const DisplaySavedPosts = ({id}) => {
	const { data: post } = useGetPostbyId(id);
	if (!post)
    return (
      <div className="flex-center w-full h-full">
        <img src={loader} width={40} height={40} alt="loading" />
      </div>
    );

  return (
	post && <Posts showStats={true} post={post}/>
  )
}

export default DisplaySavedPosts