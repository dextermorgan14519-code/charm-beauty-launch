import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Check } from "lucide-react";
import data from "@/data/data.json";

const categories = Object.keys(data.services) as Array<keyof typeof data.services>;
const steps = ["Service", "Stylist", "Date & Time", "Your Details", "Confirm"];

const Booking = () => {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [stylistId, setStylistId] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [done, setDone] = useState(false);

  const allServices = category ? data.services[category as keyof typeof data.services] : [];
  const selectedService = allServices.find(s => s.id === serviceId);
  const selectedStylist = data.team.find(t => t.id === stylistId);

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  if (done) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Check size={40} className="text-primary" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-foreground">Booking Confirmed!</h2>
          <p className="mt-3 text-muted-foreground">
            {selectedService?.name} with {selectedStylist?.name} on {date?.toLocaleDateString()} at {time}.
          </p>
          <Button className="mt-8" onClick={() => { setStep(0); setDone(false); setCategory(""); setServiceId(""); setStylistId(""); setDate(undefined); setTime(""); }}>
            Book Another
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-center font-serif text-4xl font-semibold text-foreground">Book an Appointment</h1>

      {/* Progress */}
      <div className="mt-10 flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
              i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>{i + 1}</div>
            {i < steps.length - 1 && <div className={`mx-2 h-px flex-1 ${i < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-sm text-muted-foreground">{steps[step]}</p>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="mt-8">

          {step === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {categories.map(c => (
                  <Card key={c} onClick={() => { setCategory(c); setServiceId(""); }}
                    className={`cursor-pointer p-4 text-center transition-all hover:shadow-md ${category === c ? "border-primary ring-1 ring-primary" : "border-border"}`}>
                    <span className="font-serif text-lg font-semibold text-foreground">{c}</span>
                  </Card>
                ))}
              </div>
              {category && (
                <div className="space-y-2">
                  {allServices.map(s => (
                    <Card key={s.id} onClick={() => setServiceId(s.id)}
                      className={`cursor-pointer flex items-center gap-4 p-3 transition-all hover:shadow-md ${serviceId === s.id ? "border-primary ring-1 ring-primary" : "border-border"}`}>
                      <img src={s.image} alt={s.name} className="h-14 w-14 rounded object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.duration} · ${s.price}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              <Button className="w-full" disabled={!serviceId} onClick={next}>Continue</Button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              {data.team.map(t => (
                <Card key={t.id} onClick={() => setStylistId(t.id)}
                  className={`cursor-pointer flex items-center gap-4 p-3 transition-all hover:shadow-md ${stylistId === t.id ? "border-primary ring-1 ring-primary" : "border-border"}`}>
                  <img src={t.image} alt={t.name} className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role} · {t.specialty}</p>
                  </div>
                </Card>
              ))}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={back} className="flex-1">Back</Button>
                <Button className="flex-1" disabled={!stylistId} onClick={next}>Continue</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <Calendar mode="single" selected={date} onSelect={setDate}
                  disabled={(d) => d < new Date() || d.getDay() === 0}
                  className="rounded-lg border border-border" />
              </div>
              {date && (
                <div className="grid grid-cols-4 gap-2">
                  {data.timeSlots.map(slot => (
                    <Button key={slot} variant={time === slot ? "default" : "outline"} size="sm"
                      onClick={() => setTime(slot)} className="text-xs">{slot}</Button>
                  ))}
                </div>
              )}
              <div className="flex gap-3">
                <Button variant="outline" onClick={back} className="flex-1">Back</Button>
                <Button className="flex-1" disabled={!date || !time} onClick={next}>Continue</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div><Label>Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" /></div>
              <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" /></div>
              <div><Label>Phone</Label><Input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(555) 000-0000" /></div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={back} className="flex-1">Back</Button>
                <Button className="flex-1" disabled={!form.name || !form.email} onClick={next}>Review</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <Card className="divide-y divide-border border-border p-0 overflow-hidden">
                {[
                  ["Service", `${selectedService?.name} (${selectedService?.duration})`],
                  ["Price", `$${selectedService?.price}`],
                  ["Stylist", selectedStylist?.name],
                  ["Date", date?.toLocaleDateString()],
                  ["Time", time],
                  ["Name", form.name],
                  ["Email", form.email],
                  ["Phone", form.phone],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between px-5 py-3 text-sm">
                    <span className="text-muted-foreground">{l}</span>
                    <span className="font-medium text-foreground">{v}</span>
                  </div>
                ))}
              </Card>
              <div className="flex gap-3">
                <Button variant="outline" onClick={back} className="flex-1">Back</Button>
                <Button className="flex-1" onClick={() => setDone(true)}>Confirm Booking</Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Booking;
