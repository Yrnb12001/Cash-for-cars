import { useState, useEffect, type ReactNode } from "react";
import { Lock, Eye, EyeOff, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const SESSION_KEY = "lehners_admin_token";
const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface AdminGateProps {
  children: ReactNode;
}

export function AdminGate({ children }: AdminGateProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) {
      setChecking(false);
      return;
    }
    fetch(`${API_BASE}/api/auth/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: stored }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setAuthenticated(true);
        else sessionStorage.removeItem(SESSION_KEY);
      })
      .catch(() => sessionStorage.removeItem(SESSION_KEY))
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        sessionStorage.setItem(SESSION_KEY, data.token);
        setAuthenticated(true);
      } else {
        setError("Incorrect password. Try again.");
        setPassword("");
      }
    } catch {
      setError("Could not connect to server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-[100dvh] bg-foreground flex items-center justify-center">
        <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-[100dvh] bg-foreground flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="border-4 border-primary bg-background p-8 shadow-[8px_8px_0px_0px] shadow-primary">
            <div className="flex flex-col items-center gap-3 mb-8">
              <div className="bg-primary p-3 border-4 border-foreground">
                <Truck className="w-8 h-8 text-foreground" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-black uppercase tracking-tighter">Admin Access</h1>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">
                  Lehner's Cash for Cars
                </p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Password Required</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                  className="w-full border-2 border-foreground px-4 py-3 pr-12 font-bold text-foreground bg-background focus:outline-none focus:border-primary placeholder:text-muted-foreground/50 placeholder:font-normal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <p className="text-destructive font-bold text-sm uppercase tracking-wider border-2 border-destructive px-3 py-2">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-primary text-foreground hover:bg-primary/90 font-black uppercase tracking-widest border-2 border-foreground rounded-none py-3 text-base"
              >
                {loading ? "Checking..." : "Unlock Dashboard"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
