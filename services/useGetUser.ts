import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = (userId?: string) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("full_name, email, avatar_url")
        .eq("id", userId)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
  });
};
