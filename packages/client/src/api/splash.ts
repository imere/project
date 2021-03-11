import useSWR, { responseInterface } from 'swr';
import { requestData } from '../network';
import { getStorage, setStorage } from '../util/storage';
import type { DanbooruPost } from './endpoint/danbooru';

export function useApiBackgroundImage(): responseInterface<DanbooruPost, unknown> {
  const res = useSWR<DanbooruPost, unknown>('https://danbooru.donmai.us/posts/3761225.json', url => requestData(url), { initialData: getStorage('bg') });
  if (res.data) setStorage('bg', res.data);
  return res;
}
