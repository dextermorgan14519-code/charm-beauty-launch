import { Link } from "react-router-dom";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import data from "@/data/data.json";

const Footer = () => {
  const { salon } = data;

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h3 className="font-serif text-xl font-semibold text-foreground">Serene Beauty</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{salon.tagline}</p>
          <div className="mt-4 flex gap-4">
            <a href={salon.social.instagram} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={18} /></a>
            <a href={salon.social.facebook} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={18} /></a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Quick Links</h4>
          {["About", "Services", "Booking", "Contact"].map(l => (
            <Link key={l} to={`/${l.toLowerCase()}`} className="block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">{l}</Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><MapPin size={14} /> {salon.address}</p>
            <p className="flex items-center gap-2"><Phone size={14} /> {salon.phone}</p>
            <p className="flex items-center gap-2"><Mail size={14} /> {salon.email}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Serene Beauty. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
