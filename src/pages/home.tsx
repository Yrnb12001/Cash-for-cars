import { Link } from "wouter";
import { LeadForm } from "@/components/lead-form";
import { Phone, Mail, MapPin, Truck, DollarSign, Clock, Star, ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";
import heroImg from "@assets/generated_images/realistic_photo_of_a_fa53.png";

export default function Home() {
  const reviews = [
    { text: "Fast pickup and fair cash offer! They came the same afternoon.", author: "Sarah M." },
    { text: "Super easy process, highly recommend. Got cash in hand within hours.", author: "James T." },
    { text: "They came same day and paid cash, no questions asked.", author: "Mike R." },
    { text: "Called at noon, they picked up my junk truck by 3pm. Amazing!", author: "Linda K." },
    { text: "Didn't think anyone would want my old car. Lehner's took it and paid well.", author: "Dave P." },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Top Bar */}
      <div className="bg-foreground text-background py-2 px-4 sm:px-6 lg:px-8 border-b-4 border-primary">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-sm font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-primary" />
            <span>Same-Day Pickup Available</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:989-330-7451" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>989-330-7451</span>
            </a>
            <a href="mailto:lehnermikiah1@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors hidden sm:flex">
              <Mail className="w-4 h-4" />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-background py-6 px-4 sm:px-6 lg:px-8 border-b-2 border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-foreground font-black text-2xl w-12 h-12 flex items-center justify-center border-2 border-foreground shadow-sm">
              L
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-none">
                Lehner's
              </h1>
              <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
                Cash For Cars
              </p>
            </div>
          </div>
          <a href="tel:989-330-7451" className="hidden md:flex items-center justify-center gap-2 bg-foreground text-background font-black uppercase tracking-wider px-6 py-3 border-2 border-foreground shadow-sm hover:bg-foreground/90 transition-transform active:translate-y-1 active:shadow-none">
            <Phone className="w-5 h-5 text-primary" />
            Call 989-330-7451
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-muted py-12 lg:py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-foreground overflow-hidden">
        {/* Abstract background grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 animate-in slide-in-from-left-8 duration-700 fade-in">
            <div className="inline-flex items-center gap-2 bg-primary px-4 py-2 border-2 border-foreground font-bold uppercase tracking-widest text-sm shadow-sm">
              <DollarSign className="w-4 h-4" />
              Top Dollar Paid On The Spot
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              We buy your car & <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px currentColor' }}>pick it up</span> same day.
            </h2>
            
            <p className="text-xl sm:text-2xl font-medium text-muted-foreground border-l-4 border-primary pl-4 py-1">
              Used, junk, or unwanted — we don't care. Get a cash offer now and we'll haul it away for free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#quote-form" className="flex items-center justify-center gap-2 bg-primary text-foreground font-black uppercase tracking-wider px-8 py-4 border-2 border-foreground shadow-sm hover:brightness-110 transition-transform active:translate-y-1 active:shadow-none text-lg">
                Get Cash Offer
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="tel:989-330-7451" className="flex items-center justify-center gap-2 bg-background text-foreground font-black uppercase tracking-wider px-8 py-4 border-2 border-foreground shadow-sm hover:bg-muted transition-transform active:translate-y-1 active:shadow-none text-lg">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>

            <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground uppercase tracking-widest pt-4">
              <div className="flex items-center gap-1"><CheckIcon /> No Hidden Fees</div>
              <div className="flex items-center gap-1"><CheckIcon /> Free Towing</div>
              <div className="flex items-center gap-1"><CheckIcon /> Cash in Hand</div>
            </div>
          </div>
          
          <div className="relative animate-in slide-in-from-right-8 duration-700 fade-in delay-200 fill-mode-both" id="quote-form">
            <div className="absolute -inset-4 bg-primary/20 transform rotate-3 border-2 border-primary/30"></div>
            <div className="absolute -inset-4 bg-foreground transform -rotate-2"></div>
            <div className="relative">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">How It Works</h2>
            <div className="h-2 w-24 bg-primary mx-auto border border-foreground"></div>
            <p className="mt-6 text-xl text-muted-foreground">Three simple steps to turn that vehicle taking up space into cash in your pocket today.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-1 bg-border border-y border-foreground/10 z-0"></div>

            <div className="bg-card border-2 border-foreground p-8 shadow-sm relative z-10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-24 h-24 bg-primary border-4 border-foreground rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-4xl font-black">1</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Fill Out The Form</h3>
              <p className="text-muted-foreground font-medium">Give us the basic details about your vehicle. Takes less than a minute.</p>
            </div>

            <div className="bg-card border-2 border-foreground p-8 shadow-sm relative z-10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-24 h-24 bg-primary border-4 border-foreground rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-4xl font-black">2</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Get An Offer</h3>
              <p className="text-muted-foreground font-medium">We'll call you right back with a fair cash offer. No pressure, no hassle.</p>
            </div>

            <div className="bg-card border-2 border-foreground p-8 shadow-sm relative z-10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-24 h-24 bg-primary border-4 border-foreground rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-4xl font-black">3</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-3">We Pick It Up</h3>
              <p className="text-muted-foreground font-medium">We come to you, tow the vehicle for free, and put cash in your hand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image / Trust Section */}
      <section className="bg-foreground text-background border-y-8 border-primary py-0 overflow-hidden relative">
        <div className="grid md:grid-cols-2">
          <div className="min-h-[400px] relative border-b-4 md:border-b-0 md:border-r-4 border-primary">
            {/* The generated image goes here */}
            <img 
              src={heroImg} 
              alt="Tow truck picking up car" 
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-80 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-foreground/60"></div>
            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-center">
              <ShieldCheck className="w-16 h-16 text-primary mb-6" />
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Local. Fast. Reliable.</h2>
              <p className="text-xl text-muted font-medium max-w-md">We're not a national lead-flipping corporation. We're a local business that actually shows up when we say we will.</p>
            </div>
          </div>
          <div className="p-8 sm:p-12 lg:p-20 flex flex-col justify-center bg-foreground">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 text-primary">What people say</h2>
            <div className="space-y-6">
              {reviews.slice(0, 3).map((review, i) => (
                <div key={i} className="border-l-4 border-primary pl-6 py-2">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}
                  </div>
                  <p className="text-lg font-medium italic mb-2">"{review.text}"</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-primary">— {review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary border-b-4 border-foreground text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-foreground">
            Ready to get paid?
          </h2>
          <p className="text-xl font-bold text-foreground/80 max-w-2xl mx-auto">
            Stop looking at that vehicle in your driveway. Call us now or fill out the form above to get your cash offer.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="tel:989-330-7451" className="flex items-center justify-center gap-2 bg-foreground text-background font-black uppercase tracking-wider px-10 py-5 border-2 border-foreground shadow-sm hover:bg-foreground/90 transition-transform active:translate-y-1 active:shadow-none text-xl">
              <Phone className="w-6 h-6 text-primary" />
              Call 989-330-7451
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 px-4 sm:px-6 lg:px-8 border-t-2 border-border mt-auto">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">Lehner's Cash For Cars</h3>
            <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest">
              Top Dollar. Same Day Pickup.
            </p>
          </div>
          <div className="sm:text-right space-y-2 font-medium">
            <p className="flex items-center sm:justify-end gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" /> <a href="tel:989-330-7451">989-330-7451</a>
            </p>
            <p className="flex items-center sm:justify-end gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" /> <a href="mailto:lehnermikiah1@gmail.com">lehnermikiah1@gmail.com</a>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lehner's Cash For Cars.</p>
          <Link href="/admin" className="hover:text-primary transition-colors flex items-center gap-1">
            Admin Login <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
