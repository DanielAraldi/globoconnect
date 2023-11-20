import { CommentProps, CommentServiceProps } from '../@types';
import { api } from '../config';

export const CommentService: CommentServiceProps = {
  async loadByPostId(postId: string): Promise<CommentProps[]> {
    try {
      const { data } = await api.get<CommentProps[]>('/comments', {
        params: {
          postId,
        },
      });
      return data;
    } catch (error) {
      return [];
    }
  },
};
