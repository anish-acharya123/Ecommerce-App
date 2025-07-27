import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useGetProductById = (id: string | undefined) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!id,
  });
};

export const useSimilarProducts = (
  category: string | undefined,
  currentProductId: string | undefined
) => {
  return useQuery({
    queryKey: ["similar-products", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .neq("id", currentProductId);

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!category,
  });
};
