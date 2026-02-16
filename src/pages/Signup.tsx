import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return;
    signup(name, email, password);
    navigate("/profile");
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-6">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-3xl">Create Account</CardTitle>
          <p className="text-sm text-muted-foreground">Join Serene Beauty</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} required /></div>
            <div><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
            <div><Label>Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
            <div><Label>Confirm Password</Label><Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required /></div>
            <Button type="submit" className="w-full" disabled={password !== confirm || !password}>Sign Up</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
