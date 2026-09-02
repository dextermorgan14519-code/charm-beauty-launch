import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import data from "@/data/data.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/profile");
    } else {
      setError("Incorrect email or password. Try the demo account below.");
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-6 py-16">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-3xl">Welcome Back</CardTitle>
          <p className="text-sm text-muted-foreground">Log in to your ZenShe account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>Email</Label><Input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} required /></div>
            <div><Label>Password</Label><Input type="password" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} required /></div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
            <Button type="submit" className="w-full">Log In</Button>
          </form>

          <div className="mt-6 rounded-md border border-border bg-secondary/50 p-3 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Demo account</p>
            <p className="mt-1">Email: {data.demoCredentials.email}</p>
            <p>Password: {data.demoCredentials.password}</p>
            <button
              type="button"
              className="mt-2 text-primary hover:underline"
              onClick={() => { setEmail(data.demoCredentials.email); setPassword(data.demoCredentials.password); setError(""); }}
            >
              Fill demo credentials
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
