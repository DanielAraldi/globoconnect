import { UserCommentProps } from '../../@types';
import { Typography } from '../Typography';
import { Container } from './styles';

export function UserComment(props: UserCommentProps) {
  const { comment, nickname } = props;

  return (
    <Container>
      <Typography
        text={`@${nickname} comentou:`}
        variant='nunitoBold'
        fontSize='small'
      />

      <Typography text={comment} fontSize='small' />
    </Container>
  );
}
