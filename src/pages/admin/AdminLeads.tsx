import { usePropertyStore, Lead } from "@/contexts/PropertyStoreContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle } from "lucide-react";

const statusMap: Record<Lead["status"], { label: string; className: string }> = {
  novo: { label: "Novo", className: "bg-blue-100 text-blue-700" },
  em_atendimento: { label: "Em atendimento", className: "bg-amber-100 text-amber-700" },
  concluido: { label: "Concluído", className: "bg-emerald-100 text-emerald-700" },
};

const tipoMap: Record<string, string> = {
  comprador: "Comprador",
  locatario: "Locatário",
  proprietario: "Proprietário",
};

export default function AdminLeads() {
  const { leads, updateLeadStatus } = usePropertyStore();

  const openWhatsApp = (phone: string, nome: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const msg = encodeURIComponent(`Olá ${nome}, aqui é da Nova Imobiliária! Estamos entrando em contato sobre seu interesse.`);
    window.open(`https://wa.me/55${cleaned}?text=${msg}`, "_blank");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[hsl(var(--nova-purple))]">Leads</h1>

      <div className="bg-white rounded-lg border shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="hidden md:table-cell">Tipo</TableHead>
              <TableHead className="hidden md:table-cell">Imóvel</TableHead>
              <TableHead className="hidden lg:table-cell">Data</TableHead>
              <TableHead className="hidden lg:table-cell">Origem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nenhum lead recebido.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.nome}</TableCell>
                  <TableCell className="whitespace-nowrap">{l.telefone}</TableCell>
                  <TableCell className="hidden md:table-cell">{tipoMap[l.tipo] || l.tipo}</TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-sm">{l.imovel_interesse || "—"}</TableCell>
                  <TableCell className="hidden lg:table-cell">{l.criado_em}</TableCell>
                  <TableCell className="hidden lg:table-cell capitalize">{l.origem}</TableCell>
                  <TableCell>
                    <Select value={l.status} onValueChange={(v) => updateLeadStatus(l.id, v as Lead["status"])}>
                      <SelectTrigger className="h-7 w-[130px] text-xs">
                        <Badge className={`${statusMap[l.status].className} border-0 text-xs`}>
                          {statusMap[l.status].label}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="novo">Novo</SelectItem>
                        <SelectItem value="em_atendimento">Em atendimento</SelectItem>
                        <SelectItem value="concluido">Concluído</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-emerald-600 hover:text-emerald-700"
                      onClick={() => openWhatsApp(l.telefone, l.nome)}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </Button>
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
