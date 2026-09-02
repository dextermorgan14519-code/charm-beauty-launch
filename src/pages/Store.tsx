import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useCart, Product } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import data from "@/data/data.json";

const Store = () => {
  const products = data.products as Product[];
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map(p => p.category)))], [products]);
  const [category, setCategory] = useState("All");
  const { add, count } = useCart();
  const { toast } = useToast();

  const visible = category === "All" ? products : products.filter(p => p.category === category);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <ScrollReveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-semibold text-foreground">The ZenShe Store</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Herbal blends, steam tools and aftercare crafted for your home ritual. Delivered across Tunisia.
            </p>
          </div>
          <Link to="/cart">
            <Button variant="outline" className="gap-2">
              <ShoppingBag size={16} /> Cart ({count})
            </Button>
          </Link>
        </div>
      </ScrollReveal>

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              category === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <ScrollReveal key={p.id} delay={(i % 3) * 0.1}>
            <Card className="group h-full overflow-hidden border-border">
              <div className="h-56 overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <CardContent className="flex h-[calc(100%-14rem)] flex-col p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.category}</p>
                <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">{p.name}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-medium text-foreground">{p.price} TND</span>
                  <Button
                    size="sm"
                    onClick={() => {
                      add(p);
                      toast({ title: "Added to cart", description: p.name });
                    }}
                  >
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default Store;
