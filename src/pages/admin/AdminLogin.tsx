import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const { isAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();

  if (!isLoading && isAuthenticated) {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("E-mail ou senha incorretos.");
    } else {
      navigate("/admin/dashboard", { replace: true });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Informe seu e-mail.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/redefinir-senha`,
    });
    setLoading(false);
    if (error) {
      toast.error("Erro ao enviar e-mail de recuperação.");
    } else {
      toast.success("E-mail de recuperação enviado! Verifique sua caixa de entrada.");
      setMode("login");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-[hsl(var(--nova-purple))] flex items-center justify-center">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-[hsl(var(--nova-purple))]">
            {mode === "login" ? "Painel Administrativo" : "Recuperar Senha"}
          </CardTitle>
          <p className="text-sm text-muted-foreground">Nova Imobiliária</p>
        </CardHeader>
        <CardContent>
          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-[hsl(var(--nova-purple))] hover:bg-[hsl(var(--nova-purple))]/90 text-white" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
              <button type="button" onClick={() => setMode("forgot")} className="w-full text-sm text-[hsl(var(--nova-purple))] hover:underline">
                Esqueci minha senha
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <p className="text-sm text-muted-foreground">Informe seu e-mail para receber o link de recuperação de senha.</p>
              <div className="space-y-2">
                <Label htmlFor="email-forgot">E-mail</Label>
                <Input id="email-forgot" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-[hsl(var(--nova-purple))] hover:bg-[hsl(var(--nova-purple))]/90 text-white" disabled={loading}>
                {loading ? "Enviando..." : "Enviar link de recuperação"}
              </Button>
              <button type="button" onClick={() => setMode("login")} className="w-full text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Voltar ao login
              </button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
