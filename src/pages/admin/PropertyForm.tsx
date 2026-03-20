import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePropertyStore } from "@/contexts/PropertyStoreContext";
import { Imovel, TipoImovel, Finalidade, bairros } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";

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
  status: "ativo" | "vendido" | "locado";
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
  const { properties, addProperty, updateProperty } = usePropertyStore();
  const [form, setForm] = useState<FormData>(emptyForm);
  const [photoUrls, setPhotoUrls] = useState("");

  useEffect(() => {
    if (isEdit) {
      const p = properties.find((x) => x.id === id);
      if (p) {
        setForm({
          titulo: p.titulo, tipo: p.tipo, finalidade: p.finalidade,
          bairro: p.bairro, cidade: p.cidade, preco: String(p.preco),
          metragem: String(p.metragem), quartos: String(p.quartos),
          banheiros: String(p.banheiros), vagas: String(p.vagas),
          descricao: p.descricao, destaque: p.destaque, status: p.status,
          fotos: p.fotos,
        });
        setPhotoUrls(p.fotos.join("\n"));
      }
    }
  }, [id, isEdit, properties]);

  const set = (key: keyof FormData, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titulo || !form.bairro || !form.preco) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const photos = photoUrls.split("\n").map((u) => u.trim()).filter(Boolean);

    const data = {
      titulo: form.titulo, tipo: form.tipo, finalidade: form.finalidade,
      bairro: form.bairro, cidade: form.cidade,
      preco: parseFloat(form.preco) || 0,
      metragem: parseFloat(form.metragem) || 0,
      quartos: parseInt(form.quartos) || 0,
      banheiros: parseInt(form.banheiros) || 0,
      vagas: parseInt(form.vagas) || 0,
      descricao: form.descricao, destaque: form.destaque,
      status: form.status, fotos: photos, tags: form.destaque ? ["Destaque" as const] : [],
    };

    if (isEdit) {
      updateProperty(id!, data);
      toast.success("Imóvel atualizado com sucesso!");
    } else {
      addProperty(data);
      toast.success("Imóvel cadastrado com sucesso!");
    }
    navigate("/admin/imoveis");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/imoveis")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-[hsl(var(--nova-purple))]">
          {isEdit ? "Editar Imóvel" : "Cadastrar Novo Imóvel"}
        </h1>
      </div>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Informações do Imóvel</CardTitle>
        </CardHeader>
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
                  <SelectContent>
                    {tipos.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Finalidade *</Label>
                <Select value={form.finalidade} onValueChange={(v) => set("finalidade", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {finalidades.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bairro *</Label>
                <Select value={form.bairro} onValueChange={(v) => set("bairro", v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {bairros.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input value={form.cidade} onChange={(e) => set("cidade", e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Preço (R$) *</Label>
                <Input type="number" value={form.preco} onChange={(e) => set("preco", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Metragem (m²)</Label>
                <Input type="number" value={form.metragem} onChange={(e) => set("metragem", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Quartos</Label>
                <Input type="number" value={form.quartos} onChange={(e) => set("quartos", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Banheiros</Label>
                <Input type="number" value={form.banheiros} onChange={(e) => set("banheiros", e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Vagas</Label>
                <Input type="number" value={form.vagas} onChange={(e) => set("vagas", e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea value={form.descricao} onChange={(e) => set("descricao", e.target.value)} rows={4} placeholder="Descreva o imóvel..." />
            </div>

            <div className="space-y-2">
              <Label>URLs das Fotos (uma por linha, máx. 10)</Label>
              <Textarea
                value={photoUrls}
                onChange={(e) => setPhotoUrls(e.target.value)}
                rows={3}
                placeholder="https://exemplo.com/foto1.jpg&#10;https://exemplo.com/foto2.jpg"
              />
              <p className="text-xs text-muted-foreground">Cole as URLs das imagens, uma por linha.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3">
                <Switch checked={form.destaque} onCheckedChange={(v) => set("destaque", v)} />
                <Label>Imóvel em destaque</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.status === "ativo"} onCheckedChange={(v) => set("status", v ? "ativo" : "vendido")} />
                <Label>Ativo</Label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-[hsl(var(--nova-orange))] hover:bg-[hsl(var(--nova-orange))]/90 text-white">
                <Save className="w-4 h-4 mr-2" />
                {isEdit ? "Salvar Alterações" : "Cadastrar Imóvel"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/admin/imoveis")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
