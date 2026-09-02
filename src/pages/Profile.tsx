import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import data from "@/data/data.json";

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user, navigate]);

  if (!user) return null;

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="font-serif text-4xl font-semibold text-foreground">My Profile</h1>

      <Card className="mt-8 border-border">
        <CardContent className="p-6">
          {editing ? (
            <div className="space-y-4">
              <div><Label>Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div><Label>Email</Label><Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
              <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
              <div className="flex gap-3">
                <Button onClick={handleSave}>Save</Button>
                <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-foreground">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
                {user.membership && user.membership !== "None" && (
                  <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {user.membership} Member
                  </span>
                )}
                {user.memberSince && <p className="mt-2 text-xs text-muted-foreground">Member since {user.memberSince}</p>}
              </div>
              <Button variant="outline" size="sm" onClick={() => { setForm({ name: user.name, email: user.email, phone: user.phone || "" }); setEditing(true); }}>Edit</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking History */}
      <h2 className="mt-12 font-serif text-2xl font-semibold text-foreground">Ritual History</h2>
      <div className="mt-4 space-y-3">
        {data.bookingHistory.map(b => (
          <Card key={b.id} className="border-border">
            <CardContent className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">{b.service}</p>
                <p className="text-xs text-muted-foreground">with {b.stylist} · {b.date} at {b.time}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
                b.status === "Upcoming" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              }`}>{b.status}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order History */}
      <h2 className="mt-12 font-serif text-2xl font-semibold text-foreground">Order History</h2>
      <div className="mt-4 space-y-3">
        {data.orderHistory.map(o => (
          <Card key={o.id} className="border-border">
            <CardContent className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">{o.items}</p>
                <p className="text-xs text-muted-foreground">{o.date} · {o.total} TND</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
                o.status === "Delivered" ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
              }`}>{o.status}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="mt-10" onClick={() => { logout(); navigate("/"); }}>Log Out</Button>
    </div>
  );
};

export default Profile;
