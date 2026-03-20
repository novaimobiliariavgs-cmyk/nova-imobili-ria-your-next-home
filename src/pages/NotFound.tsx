import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center space-y-4">
        <p className="text-8xl font-extrabold text-primary/20">404</p>
        <h1 className="text-2xl font-bold text-foreground">Página não encontrada</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Button variant="accent" asChild>
          <Link to="/"><Home className="h-4 w-4 mr-2" /> Voltar ao início</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
