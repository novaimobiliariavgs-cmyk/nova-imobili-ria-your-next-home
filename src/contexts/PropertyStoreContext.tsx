import React, { createContext, useContext, useState } from "react";
import { Imovel, imoveis as initialImoveis } from "@/data/properties";

export interface Lead {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  tipo: "comprador" | "locatario" | "proprietario";
  imovel_interesse: string;
  mensagem: string;
  origem: "formulario" | "whatsapp" | "busca";
  criado_em: string;
  status: "novo" | "em_atendimento" | "concluido";
}

interface PropertyStore {
  properties: Imovel[];
  leads: Lead[];
  addProperty: (p: Omit<Imovel, "id" | "codigo" | "criado_em">) => void;
  updateProperty: (id: string, p: Partial<Imovel>) => void;
  deleteProperty: (id: string) => void;
  addLead: (l: Omit<Lead, "id" | "criado_em" | "status">) => void;
  updateLeadStatus: (id: string, status: Lead["status"]) => void;
}

const PropertyStoreContext = createContext<PropertyStore | null>(null);

function generateCode(properties: Imovel[]) {
  const max = properties.reduce((m, p) => {
    const num = parseInt(p.codigo.replace("NI-", ""), 10);
    return isNaN(num) ? m : Math.max(m, num);
  }, 0);
  return `NI-${String(max + 1).padStart(3, "0")}`;
}

export function PropertyStoreProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Imovel[]>(initialImoveis);
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "l1", nome: "Maria Silva", telefone: "(19) 99876-5432", email: "maria@email.com",
      tipo: "comprador", imovel_interesse: "NI-001", mensagem: "Gostaria de agendar uma visita",
      origem: "formulario", criado_em: "2025-03-15", status: "novo",
    },
    {
      id: "l2", nome: "Carlos Oliveira", telefone: "(19) 98765-1234", email: "carlos@email.com",
      tipo: "proprietario", imovel_interesse: "", mensagem: "Quero anunciar meu imóvel",
      origem: "whatsapp", criado_em: "2025-03-12", status: "em_atendimento",
    },
    {
      id: "l3", nome: "Ana Souza", telefone: "(19) 91234-5678", email: "ana@email.com",
      tipo: "locatario", imovel_interesse: "NI-002", mensagem: "Disponível para mudança imediata",
      origem: "formulario", criado_em: "2025-03-18", status: "novo",
    },
  ]);

  const addProperty = (p: Omit<Imovel, "id" | "codigo" | "criado_em">) => {
    const newProp: Imovel = {
      ...p,
      id: crypto.randomUUID(),
      codigo: generateCode(properties),
      criado_em: new Date().toISOString().slice(0, 10),
    };
    setProperties((prev) => [newProp, ...prev]);
  };

  const updateProperty = (id: string, updates: Partial<Imovel>) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const addLead = (l: Omit<Lead, "id" | "criado_em" | "status">) => {
    setLeads((prev) => [
      { ...l, id: crypto.randomUUID(), criado_em: new Date().toISOString().slice(0, 10), status: "novo" },
      ...prev,
    ]);
  };

  const updateLeadStatus = (id: string, status: Lead["status"]) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  return (
    <PropertyStoreContext.Provider value={{ properties, leads, addProperty, updateProperty, deleteProperty, addLead, updateLeadStatus }}>
      {children}
    </PropertyStoreContext.Provider>
  );
}

export function usePropertyStore() {
  const ctx = useContext(PropertyStoreContext);
  if (!ctx) throw new Error("usePropertyStore must be used within PropertyStoreProvider");
  return ctx;
}
