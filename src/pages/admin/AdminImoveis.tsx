import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertyStore } from "@/contexts/PropertyStoreContext";
import { formatPrice } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Star, StarOff, Search } from "lucide-react";
import { toast } from "sonner";

export default function AdminImoveis() {
  const { properties, updateProperty, deleteProperty } = usePropertyStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [filterFinalidade, setFilterFinalidade] = useState<string>("todos");

  const filtered = properties.filter((p) => {
    const matchesSearch =
      !search ||
      p.titulo.toLowerCase().includes(search.toLowerCase()) ||
      p.codigo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "todos" || p.status === filterStatus;
    const matchesFinalidade = filterFinalidade === "todos" || p.finalidade === filterFinalidade;
    return matchesSearch && matchesStatus && matchesFinalidade;
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este imóvel?")) {
      deleteProperty(id);
      toast.success("Imóvel excluído.");
    }
  };

  const toggleStatus = (id: string, current: string) => {
    updateProperty(id, { status: current === "ativo" ? "vendido" : "ativo" } as any);
    toast.success("Status atualizado.");
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      ativo: "bg-emerald-100 text-emerald-700",
      vendido: "bg-blue-100 text-blue-700",
      locado: "bg-amber-100 text-amber-700",
    };
    return <Badge className={`${map[status] || ""} border-0 font-medium`}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[hsl(var(--nova-purple))]">Imóveis</h1>
        <Button
          onClick={() => navigate("/admin/imoveis/novo")}
          className="bg-[hsl(var(--nova-orange))] hover:bg-[hsl(var(--nova-orange))]/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Imóvel
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título ou código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="vendido">Vendido</SelectItem>
            <SelectItem value="locado">Locado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterFinalidade} onValueChange={setFilterFinalidade}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Finalidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="venda">Venda</SelectItem>
            <SelectItem value="aluguel">Aluguel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Título</TableHead>
              <TableHead className="hidden md:table-cell">Tipo</TableHead>
              <TableHead className="hidden md:table-cell">Finalidade</TableHead>
              <TableHead className="hidden lg:table-cell">Bairro</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Dest.</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  Nenhum imóvel encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-sm">{p.codigo}</TableCell>
                  <TableCell className="max-w-[200px] truncate font-medium">{p.titulo}</TableCell>
                  <TableCell className="hidden md:table-cell capitalize">{p.tipo}</TableCell>
                  <TableCell className="hidden md:table-cell capitalize">{p.finalidade}</TableCell>
                  <TableCell className="hidden lg:table-cell">{p.bairro}</TableCell>
                  <TableCell className="whitespace-nowrap">{formatPrice(p.preco, p.finalidade)}</TableCell>
                  <TableCell>{statusBadge(p.status)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <button onClick={() => updateProperty(p.id, { destaque: !p.destaque })}>
                      {p.destaque ? (
                        <Star className="w-4 h-4 text-[hsl(var(--nova-orange))] fill-current" />
                      ) : (
                        <StarOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/admin/imoveis/editar/${p.id}`)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(p.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs hidden lg:flex" onClick={() => toggleStatus(p.id, p.status)}>
                        {p.status === "ativo" ? "Desativar" : "Ativar"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
