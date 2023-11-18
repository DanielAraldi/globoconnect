import { PropsWithChildren } from 'react';

import { Container } from './styles';

export function Background({ children }: Required<PropsWithChildren>) {
  return <Container>{children}</Container>;
}
