import { StackNavigationProp } from '@react-navigation/stack';

import { UserProps } from '../services';

export type PostTempalteVariant = 'feed' | 'profile';

export interface PostTemplateStyleProps {
  variant: PostTempalteVariant;
}

export type RootStackParamList = {
  Profile: UserProps;
};

export type StackNavigate = StackNavigationProp<RootStackParamList>;

export interface PostTemplateProps {
  avatarUrl: string;
  name: string;
  uri: string;
  nickname?: string;
  variant?: PostTempalteVariant;
  isPaused?: boolean;
}
