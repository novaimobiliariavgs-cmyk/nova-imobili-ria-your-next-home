import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/properties";
import { servicos } from "@/data/servicos";

/** Páginas de serviço destacam o item "Serviços" do menu. */
const servicoPaths = ["/servicos", "/avaliacao", ...servicos.map((s) => `/${s.slug}`)];
const isActive = (current: string, path: string) =>
  current === path || (path === "/servicos" && servicoPaths.includes(current));

const navLinks = [
  { label: "Início", path: "/" },
  { label: "Imóveis", path: "/imoveis" },
  { label: "Alugar", path: "/casas-para-alugar-vargem-grande-do-sul" },
  { label: "Anuncie", path: "/anuncie" },
  { label: "Serviços", path: "/servicos" },
  { label: "Sobre", path: "/sobre" },
  { label: "Contato", path: "/contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-2 left-2 right-2 md:top-3 md:left-4 md:right-4 z-40">
      <div className="glass-dark rounded-full mx-auto max-w-6xl flex h-14 items-center justify-between pl-5 pr-2">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Nova Imobiliária" className="h-9 w-auto object-contain brightness-0 invert" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive(location.pathname, link.path)
                  ? "text-white bg-white/15 rounded-full"
                  : "text-white/75 hover:text-white hover:bg-white/10 rounded-full"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Button size="sm" className="btn-gold rounded-full" asChild>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden h-11 w-11 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-dark mt-2 rounded-3xl animate-fade-in">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 text-base font-medium rounded-2xl transition-colors ${
                  isActive(location.pathname, link.path)
                    ? "text-white bg-white/15"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button size="lg" className="mt-2 btn-gold rounded-full" asChild>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
