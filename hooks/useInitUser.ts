import { supabase } from "@/lib/supabase";
import { fetchUserFromSupabase } from "@/services/fetchUser";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
export default function InitUser() {
  const { setInitialized ,setUid, setName, setAvatarUrl, clearUser } = useUserStore();

  useEffect(() => {
    const init = async () => {
      
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const uid = user.id;
        setUid(uid);

        try {
          const userData = await fetchUserFromSupabase(uid);
          if (userData) {
            setName(userData.name);
            setAvatarUrl(userData.avatar_url);
          }
        } catch (error) {
          console.error('获取用户资料失败:', error);
        }
      } else {
        clearUser();
        // 可选：跳转到登录页
      }
      setInitialized (true);
    };

    init();
  },[])
  
}