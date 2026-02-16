import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";
import data from "@/data/data.json";

const categories = Object.keys(data.services) as Array<keyof typeof data.services>;

const Services = () => {
  const [active, setActive] = useState<string>(categories[0]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <ScrollReveal>
        <h1 className="text-center font-serif text-4xl font-semibold text-foreground">Our Services</h1>
        <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">
          Browse our full menu of treatments across four categories.
        </p>
      </ScrollReveal>

      <div className="mt-12">
        <Tabs value={active} onValueChange={setActive}>
          <TabsList className="mx-auto flex w-fit">
            {categories.map(c => (
              <TabsTrigger key={c} value={c} className="px-6">{c}</TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat} value={cat}>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {data.services[cat].map((s, i) => (
                  <ScrollReveal key={s.id} delay={i * 0.08}>
                    <Card className="group overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
                      <div className="h-44 overflow-hidden">
                        <img src={s.image} alt={s.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-serif text-lg font-semibold text-foreground">{s.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{s.description}</p>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{s.duration}</span>
                          <span className="font-semibold text-foreground">${s.price}</span>
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
    </div>
  );
};

export default Services;
