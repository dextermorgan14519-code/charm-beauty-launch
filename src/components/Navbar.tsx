import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Booking", to: "/booking" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-serif text-2xl font-semibold tracking-wide text-foreground">
          Serene Beauty
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === l.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <Link to="/profile">
              <Button variant="outline" size="sm">Profile</Button>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link to="/login"><Button variant="ghost" size="sm">Log In</Button></Link>
              <Link to="/signup"><Button size="sm">Sign Up</Button></Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-6 pb-6 md:hidden">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-medium ${
                pathname === l.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-4 flex gap-2">
            {user ? (
              <Link to="/profile" onClick={() => setOpen(false)}>
                <Button variant="outline" size="sm">Profile</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}><Button variant="ghost" size="sm">Log In</Button></Link>
                <Link to="/signup" onClick={() => setOpen(false)}><Button size="sm">Sign Up</Button></Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
