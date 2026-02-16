import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useToast } from "@/hooks/use-toast";
import data from "@/data/data.json";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const { salon } = data;

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <ScrollReveal>
        <h1 className="text-center font-serif text-4xl font-semibold text-foreground">Contact Us</h1>
        <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">We'd love to hear from you. Reach out anytime.</p>
      </ScrollReveal>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <ScrollReveal>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required /></div>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required /></div>
            <div><Label>Phone</Label><Input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
            <div>
              <Label>Message</Label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required rows={4}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="space-y-6">
            <Card className="border-border p-6 space-y-4">
              <div className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 text-primary" /><div><p className="text-sm font-medium text-foreground">Address</p><p className="text-sm text-muted-foreground">{salon.address}</p></div></div>
              <div className="flex items-start gap-3"><Phone size={18} className="mt-0.5 text-primary" /><div><p className="text-sm font-medium text-foreground">Phone</p><p className="text-sm text-muted-foreground">{salon.phone}</p></div></div>
              <div className="flex items-start gap-3"><Mail size={18} className="mt-0.5 text-primary" /><div><p className="text-sm font-medium text-foreground">Email</p><p className="text-sm text-muted-foreground">{salon.email}</p></div></div>
            </Card>

            <Card className="border-border p-6">
              <div className="flex items-center gap-2 mb-3"><Clock size={18} className="text-primary" /><p className="text-sm font-medium text-foreground">Opening Hours</p></div>
              {Object.entries(salon.hours).map(([day, hrs]) => (
                <div key={day} className="flex justify-between py-1.5 text-sm">
                  <span className="text-muted-foreground">{day}</span>
                  <span className="text-foreground">{hrs}</span>
                </div>
              ))}
            </Card>

            {/* Map placeholder */}
            <div className="flex h-48 items-center justify-center rounded-lg border border-border bg-muted">
              <p className="text-sm text-muted-foreground">Map placeholder</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Contact;
