import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useImovel, useCreateImovel, useUpdateImovel, useUploadPhoto, generateNextCode } from "@/hooks/useImoveis";
import type { TipoImovel, Finalidade } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Save, Upload, X, Star, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


const tipos: { value: TipoImovel; label: string }[] = [
  { value: "casa", label: "Casa" },
  { value: "apartamento", label: "Apartamento" },
  { value: "terreno", label: "Terreno" },
  { value: "comercial", label: "Comercial" },
];

const finalidades: { value: Finalidade; label: string }[] = [
  { value: "venda", label: "Venda" },
  { value: "aluguel", label: "Aluguel" },
];

interface FormData {
  titulo: string;
  tipo: TipoImovel;
  finalidade: Finalidade;
  bairro: string;
  cidade: string;
  preco: string;
  metragem: string;
  quartos: string;
  banheiros: string;
  vagas: string;
  descricao: string;
  destaque: boolean;
  status: string;
  fotos: string[];
}

const emptyForm: FormData = {
  titulo: "", tipo: "casa", finalidade: "venda", bairro: "", cidade: "Vargem Grande do Sul",
  preco: "", metragem: "", quartos: "0", banheiros: "0", vagas: "0",
  descricao: "", destaque: false, status: "ativo", fotos: [],
};

export default function PropertyForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { data: existing, isLoading } = useImovel(id);
  const createMutation = useCreateImovel();
  const updateMutation = useUpdateImovel();
  const uploadMutation = useUploadPhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isEdit && existing) {
      setForm({
        titulo: existing.titulo, tipo: existing.tipo as TipoImovel, finalidade: existing.finalidade as Finalidade,
        bairro: existing.bairro, cidade: existing.cidade, preco: String(existing.preco),
        metragem: String(existing.metragem || ""), quartos: String(existing.quartos || 0),
        banheiros: String(existing.banheiros || 0), vagas: String(existing.vagas || 0),
        descricao: existing.descricao || "", destaque: existing.destaque || false,
        status: existing.status || "ativo", fotos: existing.fotos || [],
      });
    }
  }, [isEdit, existing]);

  const set = (key: keyof FormData, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (form.fotos.length + files.length > 10) {
      toast.error("Máximo de 10 fotos.");
      return;
    }
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const url = await uploadMutation.mutateAsync(file);
        urls.push(url);
      }
      setForm((f) => ({ ...f, fotos: [...f.fotos, ...urls] }));
      toast.success(`${urls.length} foto(s) enviada(s).`);
    } catch {
      toast.error("Erro ao enviar foto.");
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (index: number) => {
    setForm((f) => ({ ...f, fotos: f.fotos.filter((_, i) => i !== index) }));
  };

  const setAsCover = (index: number) => {
    setForm((f) => {
      if (index === 0 || index >= f.fotos.length) return f;
      const next = [...f.fotos];
      const [picked] = next.splice(index, 1);
      next.unshift(picked);
      return { ...f, fotos: next };
    });
    toast.success("Foto definida como capa.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titulo || !form.bairro || !form.preco) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const data = {
      titulo: form.titulo, tipo: form.tipo, finalidade: form.finalidade,
      bairro: form.bairro, cidade: form.cidade,
      preco: parseFloat(form.preco) || 0,
      metragem: parseFloat(form.metragem) || 0,
      quartos: parseInt(form.quartos) || 0,
      banheiros: parseInt(form.banheiros) || 0,
      vagas: parseInt(form.vagas) || 0,
      descricao: form.descricao, destaque: form.destaque,
      status: form.status, fotos: form.fotos,
      tags: form.destaque ? ["Destaque"] : [],
    };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id: id!, ...data });
        toast.success("Imóvel atualizado com sucesso!");
      } else {
        const codigo = await generateNextCode();
        await createMutation.mutateAsync({ ...data, codigo });
        toast.success("Imóvel cadastrado com sucesso!");
      }
      navigate("/admin/imoveis");
    } catch {
      toast.error("Erro ao salvar imóvel.");
    }
  };

  if (isEdit && isLoading) {
    return <div className="text-center py-12 text-muted-foreground">Carregando...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/imoveis")}><ArrowLeft className="w-5 h-5" /></Button>
        <h1 className="text-2xl font-bold text-[hsl(var(--nova-purple))]">{isEdit ? "Editar Imóvel" : "Cadastrar Novo Imóvel"}</h1>
      </div>

      <Card className="border shadow-sm">
        <CardHeader><CardTitle className="text-lg">Informações do Imóvel</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Título *</Label>
              <Input value={form.titulo} onChange={(e) => set("titulo", e.target.value)} placeholder="Ex: Casa ampla com quintal" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo *</Label>
                <Select value={form.tipo} onValueChange={(v) => set("tipo", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{tipos.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Finalidade *</Label>
                <Select value={form.finalidade} onValueChange={(v) => set("finalidade", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{finalidades.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bairro *</Label>
                <Input value={form.bairro} onChange={(e) => set("bairro", e.target.value)} placeholder="Digite o bairro" required />
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input value={form.cidade} onChange={(e) => set("cidade", e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-2"><Label>Preço (R$) *</Label><Input type="number" value={form.preco} onChange={(e) => set("preco", e.target.value)} required /></div>
              <div className="space-y-2"><Label>Metragem (m²)</Label><Input type="number" value={form.metragem} onChange={(e) => set("metragem", e.target.value)} /></div>
              <div className="space-y-2"><Label>Quartos</Label><Input type="number" value={form.quartos} onChange={(e) => set("quartos", e.target.value)} /></div>
              <div className="space-y-2"><Label>Banheiros</Label><Input type="number" value={form.banheiros} onChange={(e) => set("banheiros", e.target.value)} /></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Vagas</Label><Input type="number" value={form.vagas} onChange={(e) => set("vagas", e.target.value)} /></div>
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea value={form.descricao} onChange={(e) => set("descricao", e.target.value)} rows={4} placeholder="Descreva o imóvel..." />
            </div>

            {/* Photo upload */}
            <div className="space-y-3">
              <Label>Fotos (máx. 10)</Label>
              <p className="text-xs text-muted-foreground">Clique na estrela para definir a foto de capa. A capa aparece primeiro no anúncio.</p>
              <div className="flex flex-wrap gap-3">
                {form.fotos.map((url, i) => {
                  const isCover = i === 0;
                  return (
                    <div
                      key={url + i}
                      className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                        isCover ? "border-[hsl(var(--nova-orange))]" : "border-border"
                      }`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      {isCover && (
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-[hsl(var(--nova-orange))] text-white text-[10px] font-semibold leading-none">
                          Capa
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => setAsCover(i)}
                        disabled={isCover}
                        title={isCover ? "Foto de capa" : "Definir como capa"}
                        className={`absolute top-1 left-1 h-5 w-5 rounded-full flex items-center justify-center transition-colors ${
                          isCover
                            ? "bg-[hsl(var(--nova-orange))] text-white cursor-default"
                            : "bg-white/90 text-muted-foreground hover:text-[hsl(var(--nova-orange))]"
                        }`}
                      >
                        <Star className={`w-3 h-3 ${isCover ? "fill-current" : ""}`} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        title="Remover foto"
                        className="absolute top-1 right-1 h-5 w-5 rounded-full bg-destructive text-white flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
                {form.fotos.length < 10 && (
                  <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                    className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    <Upload className="w-5 h-5 mb-1" />
                    <span className="text-xs">{uploading ? "Enviando..." : "Adicionar"}</span>
                  </button>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={handleFileUpload} />
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3"><Switch checked={form.destaque} onCheckedChange={(v) => set("destaque", v)} /><Label>Imóvel em destaque</Label></div>
              <div className="flex items-center gap-3"><Switch checked={form.status === "ativo"} onCheckedChange={(v) => set("status", v ? "ativo" : "vendido")} /><Label>Ativo</Label></div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-[hsl(var(--nova-orange))] hover:bg-[hsl(var(--nova-orange))]/90 text-white" disabled={createMutation.isPending || updateMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                {isEdit ? "Salvar Alterações" : "Cadastrar Imóvel"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/admin/imoveis")}>Cancelar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
