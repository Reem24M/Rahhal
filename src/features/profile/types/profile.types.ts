export interface Profile {
  name: string;
  location: string;
  bio: string;
  avatar: string;
}

export interface ProfileStats {
  trips: number;
  countries: number;
  following: number;
  followers: number;
}

export type ProfileTab = "Posts" | "My trips" | "Saved";
