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

const featuredServices = [
  { ...data.services.Hair[0], category: "Hair" },
  { ...data.services.Nails[0], category: "Nails" },
  { ...data.services.Skin[0], category: "Skin" },
  { ...data.services.Massage[0], category: "Massage" },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.heroImages.home})` }}
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6 text-center"
        >
          <h1 className="font-serif text-5xl font-bold leading-tight text-primary-foreground md:text-7xl">
            <Typewriter text="Serene Beauty" speed={80} />
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
            Where elegance meets tranquility. Discover treatments crafted for your well-being.
          </p>
          <Link to="/booking" className="mt-8 inline-block">
            <Button size="lg" className="text-base px-8">Book Now</Button>
          </Link>
        </motion.div>
      </section>

      {/* Featured Services */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <ScrollReveal>
          <h2 className="text-center font-serif text-4xl font-semibold text-foreground">Our Services</h2>
          <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">Curated treatments for hair, nails, skin, and total relaxation.</p>
        </ScrollReveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((s, i) => (
            <ScrollReveal key={s.id} delay={i * 0.1}>
              <Card className="group overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img src={s.image} alt={s.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <CardContent className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">{s.category}</p>
                  <h3 className="mt-1 font-serif text-lg font-semibold text-foreground">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.duration} · ${s.price}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services"><Button variant="outline">View All Services</Button></Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/30 py-24">
        <div className="mx-auto max-w-4xl px-6">
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
                  <p className="text-sm leading-relaxed text-muted-foreground italic">"{t.text}"</p>
                  <p className="mt-4 text-sm font-semibold text-foreground">— {t.name}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <ScrollReveal>
          <h2 className="text-center font-serif text-4xl font-semibold text-foreground">Why Choose Us</h2>
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
      </section>
    </div>
  );
};

export default Index;
