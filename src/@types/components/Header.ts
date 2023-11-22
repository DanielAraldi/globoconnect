export type HeaderVariant = 'logout' | 'only-logo' | 'profile';

export interface HeaderProps {
  variant: HeaderVariant;
  nickname?: string;
}
