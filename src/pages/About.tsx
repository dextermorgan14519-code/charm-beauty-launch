import ScrollReveal from "@/components/ScrollReveal";
import data from "@/data/data.json";

const About = () => (
  <div>
    {/* Story */}
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
      <ScrollReveal>
        <img src={data.heroImages.about} alt="Our salon" className="rounded-lg object-cover w-full h-[400px]" />
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <h1 className="font-serif text-4xl font-semibold text-foreground">Our Story</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Founded in 2018, Serene Beauty was born from a simple belief: everyone deserves a space where they can pause, breathe, and feel beautiful. Our Brooklyn studio blends modern minimalism with warm hospitality, creating a sanctuary for self-care.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          We handpick cruelty-free, premium products and invest in our team's continuous education so every visit exceeds expectations.
        </p>
      </ScrollReveal>
    </section>

    {/* Values */}
    <section className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <ScrollReveal>
          <h2 className="font-serif text-4xl font-semibold text-foreground">Our Philosophy</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We believe beauty is personal. Our approach combines expert technique with attentive listening — because the best results come from understanding you.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Team */}
    <section className="mx-auto max-w-7xl px-6 py-24">
      <ScrollReveal>
        <h2 className="text-center font-serif text-4xl font-semibold text-foreground">Meet Our Team</h2>
      </ScrollReveal>
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.team.map((m, i) => (
          <ScrollReveal key={m.id} delay={i * 0.1}>
            <div className="group overflow-hidden rounded-lg border border-border bg-card">
              <div className="h-64 overflow-hidden">
                <img src={m.image} alt={m.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold text-foreground">{m.name}</h3>
                <p className="text-sm font-medium text-primary">{m.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.bio}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  </div>
);

export default About;
