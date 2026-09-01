import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import data from "@/data/data.json";

const categories = Object.keys(data.services) as Array<keyof typeof data.services>;

const Services = () => {
  const [active, setActive] = useState<string>(categories[0]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <ScrollReveal>
        <h1 className="text-center font-serif text-4xl font-semibold text-foreground">Services & Memberships</h1>
        <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
          Herbal steaming, yoni care, traditional Tunisian body rituals and wellness guidance.
        </p>
      </ScrollReveal>

      <div className="mt-12">
        <Tabs value={active} onValueChange={setActive}>
          <TabsList className="mx-auto flex w-fit flex-wrap">
            {categories.map(c => (
              <TabsTrigger key={c} value={c} className="px-5">{c}</TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat} value={cat}>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {data.services[cat].map((s, i) => (
                  <ScrollReveal key={s.id} delay={i * 0.08}>
                    <Card className="group overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
                      <div className="h-44 overflow-hidden">
                        <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-serif text-lg font-semibold text-foreground">{s.name}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.description}</p>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{s.duration}</span>
                          <span className="font-semibold text-foreground">{s.price} TND</span>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Memberships */}
      <section id="memberships" className="mt-28 scroll-mt-24">
        <ScrollReveal>
          <h2 className="text-center font-serif text-4xl font-semibold text-foreground">Memberships</h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
            Make your ritual a rhythm. Cancel anytime, no hidden fees.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {data.memberships.map((m, i) => (
            <ScrollReveal key={m.id} delay={i * 0.1}>
              <Card className={`relative flex h-full flex-col border-border bg-card p-7 transition-shadow hover:shadow-lg ${m.featured ? "ring-2 ring-primary" : ""}`}>
                {m.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="font-serif text-2xl font-semibold text-foreground">{m.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                <p className="mt-5 font-serif text-4xl font-semibold text-foreground">
                  {m.price} <span className="text-base font-sans font-normal text-muted-foreground">TND / {m.period}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {m.perks.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="mt-7">
                  <Button className="w-full" variant={m.featured ? "default" : "outline"}>Join {m.name}</Button>
                </Link>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
