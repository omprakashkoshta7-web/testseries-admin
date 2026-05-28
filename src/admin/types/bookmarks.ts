export interface IBookmarkUser {
  _id: string;
  name: string;
  email: string;
  bookmarkedCount: number;
}

export interface IBookmarksData {
  users: IBookmarkUser[];
  totalBookmarks: number;
}
