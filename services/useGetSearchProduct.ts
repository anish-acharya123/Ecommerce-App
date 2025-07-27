import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useSearchProducts = (searchText: string) => {
  return useQuery({
    queryKey: ["search-products", searchText],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .or(
          `name.ilike.%${searchText}%,category.ilike.%${searchText}%,description.ilike.%${searchText}%`
        );

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!searchText.trim(),
  });
};
