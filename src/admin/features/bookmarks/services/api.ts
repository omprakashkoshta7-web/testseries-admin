import adminApiClient from '../../../utils/apiClient';
import type { IBookmarksData } from '../../../types';

export const fetchBookmarks = async (): Promise<IBookmarksData> => {
  const response = await adminApiClient.get('/bookmarks');
  return response.data.data;
};
