import { Link } from "react-router-dom";
import { Imovel, formatPrice } from "@/data/properties";
import { Bed, Bath, Car, Maximize } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  imovel: Imovel;
}

const tagColors: Record<string, string> = {
  Novo: "bg-accent text-accent-foreground",
  Destaque: "bg-primary text-primary-foreground",
  Oportunidade: "bg-whatsapp text-white",
};

export function PropertyCard({ imovel }: PropertyCardProps) {
  return (
    <Link
      to={`/imovel/${imovel.id}`}
      className="group block rounded-xl bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
          <Maximize className="h-12 w-12" />
        </div>
        {imovel.fotos[0] && (
          <img src={imovel.fotos[0]} alt={imovel.titulo} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
        {/* Tags */}
        {imovel.tags && imovel.tags.length > 0 && (
          <div className="absolute top-3 left-3 z-20 flex gap-1.5">
            {imovel.tags.map((tag) => (
              <Badge key={tag} className={`${tagColors[tag] || ""} text-xs font-semibold px-2.5 py-0.5 rounded-md`}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {/* Finalidade badge */}
        <Badge className="absolute top-3 right-3 z-20 bg-foreground/70 text-white text-xs capitalize rounded-md">
          {imovel.finalidade}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {imovel.bairro} · {imovel.cidade}
        </p>
        <h3 className="font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {imovel.titulo}
        </h3>
        <p className="text-xl font-bold text-primary">
          {formatPrice(imovel.preco, imovel.finalidade)}
        </p>

        {/* Features */}
        {imovel.tipo !== "terreno" && (
          <div className="flex items-center gap-4 pt-2 border-t border-border/50 text-sm text-muted-foreground">
            {imovel.quartos > 0 && (
              <span className="flex items-center gap-1">
                <Bed className="h-4 w-4" /> {imovel.quartos}
              </span>
            )}
            {imovel.banheiros > 0 && (
              <span className="flex items-center gap-1">
                <Bath className="h-4 w-4" /> {imovel.banheiros}
              </span>
            )}
            {imovel.vagas > 0 && (
              <span className="flex items-center gap-1">
                <Car className="h-4 w-4" /> {imovel.vagas}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Maximize className="h-4 w-4" /> {imovel.metragem}m²
            </span>
          </div>
        )}
        {imovel.tipo === "terreno" && (
          <div className="flex items-center gap-4 pt-2 border-t border-border/50 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Maximize className="h-4 w-4" /> {imovel.metragem}m²
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
