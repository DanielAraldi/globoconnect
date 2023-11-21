import { CommentProps, CommentServiceProps } from '../@types';
import { api } from '../config';
import { UUID } from '../libs';

export const CommentService: CommentServiceProps = {
  async create(props: Omit<CommentProps, 'id'>): Promise<boolean> {
    try {
      await api.post<CommentProps>('/comments', {
        id: UUID.generate(),
        ...props,
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  async loadByPostId(postId: string): Promise<CommentProps[]> {
    try {
      const { data } = await api.get<CommentProps[]>('/comments', {
        params: {
          postId,
        },
      });
      return data.reverse();
    } catch (error) {
      return [];
    }
  },
};
