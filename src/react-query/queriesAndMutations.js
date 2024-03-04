import {
  useQuery,
  useQueryClient,
  // useInfiniteQuery,
} from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  deletePost,
  getCurrentUser,
  getPostbyId,
  getRecentPosts,
  likePost,
  savePost,
  signInAccount,
  signOutAccount,
  unsavePost,
  updatePost,
} from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
  });
};

export const useSigninAccount = () => {
  return useMutation({
    mutationFn: (user) => signInAccount(user),
  });
};

export const useSignoutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data.$id],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: () => getRecentPosts(),
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId, likesArray) => likePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
	  queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
	  queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
	  queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useSavePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
	  mutationFn: (postId, userId) => savePost(postId, userId),
	  onSuccess: () => {
		queryClient.invalidateQueries({
		  queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
		});
		queryClient.invalidateQueries({
		  queryKey: [QUERY_KEYS.GET_POSTS],
		});
		queryClient.invalidateQueries({
		  queryKey: [QUERY_KEYS.GET_CURRENT_USER],
		});
	  },
	});
  };

  export const useUnsavePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
	  mutationFn: (savedRecordId) => unsavePost(savedRecordId),
	  onSuccess: () => {
		queryClient.invalidateQueries({
		  queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
		});
		queryClient.invalidateQueries({
		  queryKey: [QUERY_KEYS.GET_POSTS],
		});
		queryClient.invalidateQueries({
		  queryKey: [QUERY_KEYS.GET_CURRENT_USER],
		});
	  },
	});
  };

  export const useGetCurrentUser = () => {
	return useQuery({
	  queryKey: [QUERY_KEYS.GET_CURRENT_USER],
	  queryFn: () => getCurrentUser(),
	});
  };

  export const useGetPostbyId = (postId) =>{
    return useQuery({
      queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
      queryFn: () => getPostbyId(postId),
      enabled: !!postId,
    })
  }