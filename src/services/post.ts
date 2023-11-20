import { PostProps, PostServiceProps } from '../@types';
import { api } from '../config';
import { UUID } from '../libs';

export const PostService: PostServiceProps = {
  async create(props: Omit<PostProps, 'id'>): Promise<boolean> {
    try {
      const { data } = await api.post('/posts', {
        id: UUID.generate(),
        ...props,
      });

      console.log(data);
      return true;
    } catch (error) {
      return false;
    }
  },
};
