import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, Sparkles, Leaf, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Typewriter from "@/components/Typewriter";
import ScrollReveal from "@/components/ScrollReveal";
import data from "@/data/data.json";

const iconMap: Record<string, React.ReactNode> = {
  award: <Award size={28} />,
  sparkles: <Sparkles size={28} />,
  leaf: <Leaf size={28} />,
  heart: <Heart size={28} />,
};

const categories = Object.keys(data.services) as Array<keyof typeof data.services>;
const featuredServices = categories.map(c => ({ ...data.services[c][0], category: c as string }));

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.heroImages.home})` }}
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6 text-center"
        >
          <h1 className="font-serif text-5xl font-bold leading-tight text-background md:text-7xl">
            <Typewriter text="ZenShe Spa" speed={80} />
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-background/85">
            Feminine wellness rituals in the heart of Tunis — vaginal steaming, hammam and herbal care.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/booking"><Button size="lg" className="px-8 text-base">Book a Ritual</Button></Link>
            <Link to="/store">
              <Button size="lg" variant="outline" className="border-background/60 bg-background/10 px-8 text-base text-background hover:bg-background hover:text-foreground">
                Shop the Store
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Services */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <ScrollReveal>
          <h2 className="text-center font-serif text-4xl font-semibold text-foreground">Our Rituals</h2>
          <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">
            Steaming, yoni care, traditional body rituals and wellness guidance.
          </p>
        </ScrollReveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((s, i) => (
            <ScrollReveal key={s.id} delay={i * 0.1}>
              <Card className="group overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <CardContent className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">{s.category}</p>
                  <h3 className="mt-1 font-serif text-lg font-semibold text-foreground">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.duration} · {s.price} TND</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services"><Button variant="outline">View All Services & Memberships</Button></Link>
        </div>
      </section>

      {/* Store teaser */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <h2 className="text-center font-serif text-4xl font-semibold text-foreground">From Our Store</h2>
            <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">
              Take the ritual home with herbs, equipment and body care.
            </p>
          </ScrollReveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {data.products.slice(0, 4).map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.1}>
                <Card className="group overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
                  <div className="h-44 overflow-hidden">
                    <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-foreground">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.price} TND</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/store"><Button variant="outline">Browse Catalogue</Button></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <ScrollReveal>
          <h2 className="text-center font-serif text-4xl font-semibold text-foreground">What Our Clients Say</h2>
        </ScrollReveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {data.testimonials.slice(0, 4).map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.1}>
              <Card className="border-border bg-card p-6">
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed text-muted-foreground">"{t.text}"</p>
                <p className="mt-4 text-sm font-semibold text-foreground">— {t.name}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary/30 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <h2 className="text-center font-serif text-4xl font-semibold text-foreground">Why ZenShe</h2>
          </ScrollReveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {data.whyChooseUs.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {iconMap[item.icon]}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
