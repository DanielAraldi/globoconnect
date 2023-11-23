import { PostProps, PostServiceProps } from '../@types';
import { api } from '../config';
import { UUID } from '../libs';

export const PostService: PostServiceProps = {
  async create(props: Omit<PostProps, 'id'>): Promise<boolean> {
    try {
      await api.post<PostProps>('/posts', {
        id: UUID.generate(),
        ...props,
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  async loadAll(): Promise<PostProps[]> {
    try {
      const { data } = await api.get<PostProps[]>('/posts');
      return data.reverse();
    } catch (error) {
      return [];
    }
  },

  async loadById(postId: string): Promise<PostProps | null> {
    try {
      const { data } = await api.get<PostProps[]>(`/posts`, {
        params: {
          id: postId,
        },
      });
      return data.length ? data[0] : null;
    } catch (error) {
      return null;
    }
  },

  async loadAllByUserId(userId: string): Promise<PostProps[]> {
    try {
      const { data } = await api.get<PostProps[]>('/posts', {
        params: {
          'user.id': userId,
        },
      });
      return data.reverse();
    } catch (error) {
      return [];
    }
  },

  async like(postId: string, currentLikes: string[]): Promise<boolean> {
    try {
      await api.patch<PostProps>(`/posts/${postId}`, {
        likes: [...currentLikes],
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  async deslike(postId: string, currentLikes: string[]): Promise<boolean> {
    try {
      await api.patch<PostProps>(`/posts/${postId}`, {
        likes: [...currentLikes],
      });
      return true;
    } catch (error) {
      return false;
    }
  },
};
