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

  async like(postId: string, userId: string): Promise<boolean> {
    try {
      const post = await this.loadById(postId);
      if (post) {
        await api.patch<PostProps>(`/posts/${postId}`, {
          likes: [...post.likes, userId],
        });
      }
      return post ? true : false;
    } catch (error) {
      return false;
    }
  },

  async deslike(postId: string, userId: string): Promise<boolean> {
    try {
      const post = await this.loadById(postId);
      if (post) {
        const likesFiltered = post.likes.filter(id => userId !== id);
        await api.patch<PostProps>(`/posts/${postId}`, {
          likes: likesFiltered,
        });
      }
      return post ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
