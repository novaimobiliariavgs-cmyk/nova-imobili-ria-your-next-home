import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-on-primary-dark">
      <div className="container section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src="/logo.png" alt="Nova Imobiliária" className="h-10 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-on-primary-dark-muted text-sm leading-relaxed max-w-xs">
              Imobiliária com segurança jurídica em Vargem Grande do Sul/SP. Compra, venda e locação de imóveis com transparência.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Início", to: "/" },
                { label: "Imóveis à venda", to: "/imoveis?finalidade=venda" },
                { label: "Imóveis para alugar", to: "/imoveis?finalidade=aluguel" },
                { label: "Anuncie seu imóvel", to: "/anuncie" },
                { label: "Sobre nós", to: "/sobre" },
                { label: "Contato", to: "/contato" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-on-primary-dark-muted hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-on-primary-dark-muted">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Rua Principal, 123 — Centro<br/>Vargem Grande do Sul/SP</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>(19) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contato@novaimobiliaria.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-on-primary-dark-muted">
          © {new Date().getFullYear()} Nova Imobiliária. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
