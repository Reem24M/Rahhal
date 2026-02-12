export type User = {
  name: string;
  username: string;
  avatar: string;
};

export type EditMedia = {
  mediaId: string;
  file: File | string; 
};
