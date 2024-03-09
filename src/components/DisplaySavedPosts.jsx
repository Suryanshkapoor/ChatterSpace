import React from 'react'
import { useGetPostbyId } from '../react-query/queriesAndMutations'
import Posts from './Posts'

const DisplaySavedPosts = ({id}) => {
	const { data: post } = useGetPostbyId(id);

  return (
	post && <Posts showStats={true} post={post}/>
  )
}

export default DisplaySavedPosts