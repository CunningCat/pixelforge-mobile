import { supabase } from '@/lib/supabase';
import dayjs from 'dayjs';


export async function getPostInfo(id: string) {
  let isSuccess = false;
  if (!id) {
    console.error('传入的 Id 为空');

    return { isSuccess, error: '传入的 Id 为空' };
  }
  const { data, error } = await supabase
    .from('posts')
    .select(`title, content, image_url,created_time,id,author,likes,commentnum,community_category,
      user_info (
      avatar_url
    )`)
    .eq('id', id)
    .single();

  if (error) {
    console.error('从 Supabase 获取最新帖子失败：', error.message);
    return { isSuccess, error: error.message };
  }
  isSuccess = true;
  const formattedData = {
    ...data,
    created_time: dayjs(data?.created_time).format('YYYY-MM-DD HH:mm:ss'),
    avatar_url: (data.user_info as any)?.avatar_url || '',
  };
  
  return { data: formattedData, isSuccess };
}
