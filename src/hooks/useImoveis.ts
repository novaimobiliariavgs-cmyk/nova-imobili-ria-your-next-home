import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Imovel } from "@/data/properties";
import type { TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export function useImoveis(filters?: {
  finalidade?: string;
  tipo?: string;
  cidade?: string;
  bairro?: string;
  search?: string;
  status?: string;
  sort?: string;
}) {
  return useQuery({
    queryKey: ["imoveis", filters],
    queryFn: async () => {
      let query = supabase.from("imoveis").select("*");

      if (filters?.finalidade) query = query.eq("finalidade", filters.finalidade);
      if (filters?.tipo) query = query.eq("tipo", filters.tipo);
      if (filters?.bairro) query = query.eq("bairro", filters.bairro);
      if (filters?.status && filters.status !== "todos") query = query.eq("status", filters.status);
      if (filters?.search) {
        query = query.or(`titulo.ilike.%${filters.search}%,codigo.ilike.%${filters.search}%`);
      }

      if (filters?.sort === "menor_preco") query = query.order("preco", { ascending: true });
      else if (filters?.sort === "maior_preco") query = query.order("preco", { ascending: false });
      else query = query.order("criado_em", { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data as Imovel[];
    },
  });
}

export function useImoveisAdmin(filters?: {
  search?: string;
  status?: string;
  finalidade?: string;
}) {
  return useQuery({
    queryKey: ["imoveis-admin", filters],
    queryFn: async () => {
      let query = supabase.from("imoveis").select("*");

      if (filters?.status && filters.status !== "todos") query = query.eq("status", filters.status);
      if (filters?.finalidade && filters.finalidade !== "todos") query = query.eq("finalidade", filters.finalidade);
      if (filters?.search) {
        query = query.or(`titulo.ilike.%${filters.search}%,codigo.ilike.%${filters.search}%`);
      }

      query = query.order("criado_em", { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data as Imovel[];
    },
  });
}

export function useImovel(id: string | undefined) {
  return useQuery({
    queryKey: ["imovel", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.from("imoveis").select("*").eq("id", id).single();
      if (error) throw error;
      return data as Imovel;
    },
    enabled: !!id,
  });
}

export function useImoveisDestaque() {
  return useQuery({
    queryKey: ["imoveis-destaque"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("imoveis")
        .select("*")
        .eq("destaque", true)
        .eq("status", "ativo")
        .order("criado_em", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data as Imovel[];
    },
  });
}

export function useCreateImovel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (imovel: TablesInsert<"imoveis">) => {
      const { data, error } = await supabase.from("imoveis").insert(imovel).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imoveis"] });
      queryClient.invalidateQueries({ queryKey: ["imoveis-admin"] });
      queryClient.invalidateQueries({ queryKey: ["imoveis-destaque"] });
    },
  });
}

export function useUpdateImovel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: TablesUpdate<"imoveis"> & { id: string }) => {
      const { data, error } = await supabase.from("imoveis").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imoveis"] });
      queryClient.invalidateQueries({ queryKey: ["imoveis-admin"] });
      queryClient.invalidateQueries({ queryKey: ["imoveis-destaque"] });
      queryClient.invalidateQueries({ queryKey: ["imovel"] });
    },
  });
}

export function useDeleteImovel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("imoveis").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imoveis"] });
      queryClient.invalidateQueries({ queryKey: ["imoveis-admin"] });
      queryClient.invalidateQueries({ queryKey: ["imoveis-destaque"] });
    },
  });
}

export async function generateNextCode(): Promise<string> {
  const { data } = await supabase
    .from("imoveis")
    .select("codigo")
    .order("codigo", { ascending: false })
    .limit(1);

  if (data && data.length > 0) {
    const num = parseInt(data[0].codigo.replace("NI-", ""), 10);
    return `NI-${String((isNaN(num) ? 0 : num) + 1).padStart(3, "0")}`;
  }
  return "NI-001";
}

export function useUploadPhoto() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("imoveis-fotos").upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("imoveis-fotos").getPublicUrl(path);
      return urlData.publicUrl;
    },
  });
}
