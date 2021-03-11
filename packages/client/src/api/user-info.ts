import useSWR, { responseInterface } from 'swr';
import { IUserInfo } from '../components/UserList';
import { requestData } from '../network';
import { getStorage, setStorage } from '../util/storage';
import type { DanbooruPost } from './endpoint/danbooru';

export function useApiGuestAvatarImage(): responseInterface<DanbooruPost, unknown> {
  const key = 'https://danbooru.donmai.us/posts/4389054.json';
  const res = useSWR<DanbooruPost, unknown>(key, url => requestData(url), { initialData: getStorage(key) });
  if (res.data) setStorage(key, res.data);
  return res;
}

export function useApiGuestInfo(): {data?: IUserInfo[], error?: unknown, isValidating: boolean } {
  const {
    error,
    isValidating,
    data: { file_url } = {},
  } = useApiGuestAvatarImage();

  const guests: IUserInfo[] = Array.from({ length: 5 }, (_, i) => ({ username: `username${i}` }));
  guests.forEach(guest => guest.avatar = file_url);

  return {
    error,
    isValidating,
    data: guests,
  };
}
