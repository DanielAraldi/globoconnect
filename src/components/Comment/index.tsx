import { TypographyFontSize, UserCommentProps } from '../../@types';
import { Typography } from '../Typography';
import { Container } from './styles';

export function Comment(props: UserCommentProps) {
  const { comment, nickname, variant = 'owner', title } = props;

  const isOwner = variant === 'owner';
  const fontSize: TypographyFontSize = isOwner ? 'medium' : 'small';

  return (
    <Container variant={variant}>
      <Typography
        text={isOwner ? `@${nickname}: ${title}` : `@${nickname} comentou:`}
        variant={isOwner ? 'nunitoSemiBold' : 'nunitoBold'}
        fontSize={fontSize}
      />

      <Typography text={comment} fontSize={fontSize} />
    </Container>
  );
}
