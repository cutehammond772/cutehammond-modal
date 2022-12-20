// banner
export interface UserBannerProps {
  userName: string;
}

export interface NotificationBannerProps {
  count: number;
}

export interface SubjectProps {
  subject?: string;
}

// notification
export interface NotificationProps {
  title: string;
  content: string;
  icon: React.ReactElement;

  onClick?: () => void;
  onRemove?: () => void;
}

// profile
export const PROFILE_MODAL = "profile";

export interface ProfileData {
  userName: string;
}
