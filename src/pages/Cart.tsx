import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const SHIPPING = 8;

const Cart = () => {
  const { items, setQty, remove, clear, subtotal } = useCart();
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "" });
  const [orderRef] = useState(() => `ZS-${Math.floor(100000 + Math.random() * 899999)}`);

  const total = subtotal + (items.length ? SHIPPING : 0);
  const canOrder = form.name && form.email && form.phone && form.address && form.city;

  if (step === "done") {
    return (
      <div className="mx-auto max-w-lg px-6 py-28 text-center">
        <CheckCircle2 className="mx-auto text-primary" size={56} />
        <h1 className="mt-6 font-serif text-4xl font-semibold text-foreground">Order confirmed</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you, {form.name.split(" ")[0]}. Your order <span className="font-medium text-foreground">{orderRef}</span> is being prepared and will arrive in 2–4 working days.
        </p>
        <Link to="/store"><Button className="mt-8">Continue shopping</Button></Link>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-lg px-6 py-28 text-center">
        <h1 className="font-serif text-4xl font-semibold text-foreground">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Explore our herbal blends and ritual essentials.</p>
        <Link to="/store"><Button className="mt-8">Visit the store</Button></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="font-serif text-4xl font-semibold text-foreground">
        {step === "cart" ? "Your Cart" : "Checkout"}
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-4">
          {step === "cart" ? (
            items.map(i => (
              <Card key={i.id} className="border-border">
                <CardContent className="flex items-center gap-4 p-4">
                  <img src={i.image} alt={i.name} loading="lazy" className="h-20 w-20 rounded-md object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{i.name}</p>
                    <p className="text-sm text-muted-foreground">{i.price} TND</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" aria-label="Decrease" onClick={() => setQty(i.id, i.qty - 1)}><Minus size={14} /></Button>
                    <span className="w-6 text-center text-sm">{i.qty}</span>
                    <Button variant="outline" size="icon" aria-label="Increase" onClick={() => setQty(i.id, i.qty + 1)}><Plus size={14} /></Button>
                  </div>
                  <Button variant="ghost" size="icon" aria-label="Remove" onClick={() => remove(i.id)}><Trash2 size={16} /></Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-border">
              <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
                <div><Label>Full name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
                <div><Label>City</Label><Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} /></div>
                <div className="sm:col-span-2"><Label>Delivery address</Label><Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} /></div>
                <p className="sm:col-span-2 text-xs text-muted-foreground">Payment is cash on delivery, available anywhere in Tunisia.</p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="h-fit border-border">
          <CardContent className="space-y-3 p-6 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{subtotal} TND</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>{SHIPPING} TND</span></div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-foreground"><span>Total</span><span>{total} TND</span></div>
            {step === "cart" ? (
              <>
                <Button className="w-full" onClick={() => setStep("checkout")}>Proceed to checkout</Button>
                <Button variant="ghost" className="w-full" onClick={clear}>Clear cart</Button>
              </>
            ) : (
              <>
                <Button className="w-full" disabled={!canOrder} onClick={() => { clear(); setStep("done"); }}>Place order</Button>
                <Button variant="ghost" className="w-full" onClick={() => setStep("cart")}>Back to cart</Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
