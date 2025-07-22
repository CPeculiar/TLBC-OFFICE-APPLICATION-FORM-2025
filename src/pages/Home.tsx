import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Heart, Music, Award, Camera, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="animate-fade-in-up">
            <p className="text-lg md:text-xl mb-4 text-secondary font-medium">
              The Lord's Brethren Church International Presents
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold mb-8 leading-tight">
              The Lord's Brethren 
              <span className="block text-secondary">Convocation 2025</span>
            </h1>
            
            {/* Event Details */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 mb-12 text-base sm:text-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                <span className="text-center sm:text-left">31st Aug - 4th Sept, 2025</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                <span className="text-center sm:text-left">Bishop Crowther Retreat Center, MCC Onitsha</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="btn-secondary text-lg px-10 py-4" asChild>
                <Link to="/registration">Register Now</Link>
              </Button>
              <Button size="lg" className="btn-outline text-lg px-10 py-4" asChild>
                <Link to="/partnership">Become a Partner</Link>
              </Button>
            </div>

            {/* Social Links */}
            <div className="mt-12 flex items-center justify-center gap-6">
              <span className="text-white/80">Follow Us:</span>
              <div className="flex gap-4">
                <a
                  href="https://web.facebook.com/thelordsbrethrenchurchintl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center smooth-transition hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@thelordsbrethrenchurchintl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center smooth-transition hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/elochukwutlbc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center smooth-transition hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.366C4.25 14.747 3.76 13.596 3.76 12.299s.49-2.448 1.366-3.323C6.001 8.001 7.152 7.511 8.449 7.511s2.448.49 3.323 1.365c.875.875 1.366 2.026 1.366 3.323s-.49 2.448-1.366 3.323c-.875.875-2.026 1.366-3.323 1.366zm7.138 0c-1.297 0-2.448-.49-3.323-1.366c-.875-.875-1.365-2.026-1.365-3.323s.49-2.448 1.365-3.323c.875-.875 2.026-1.365 3.323-1.365s2.448.49 3.323 1.365c.875.875 1.366 2.026 1.366 3.323s-.49 2.448-1.366 3.323c-.875.876-2.026 1.366-3.323 1.366z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Event Section */}
      <section className="section-container bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-display gradient-text mb-8">
                About TLBC 2025
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The Lord's Brethren Convocation (TLBC) is an annual glorious homecoming of stakeholders 
                in The Lord's Brethren Nation where we celebrate our partners, victories, joys, successes, 
                conquests, coups and feats.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                This year's convocation will feature moments of worship, teachings, impartation, 
                awards and The Lord's Brethren Family meeting. Don't miss this transformative experience!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-primary" asChild>
                  <Link to="/registration">Join Us Now</Link>
                </Button>
                <Button className="btn-outline" asChild>
                  <Link to="/gallery">View Gallery</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="event-card">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="TLBC Event" 
                  className="w-full h-60 sm:h-80 object-cover rounded-xl mb-6"
                />
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4">Our Annual Homecoming</h3>
                <p className="text-muted-foreground">An amazing spiritual experience awaits you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-container">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title gradient-text">What to Expect</h2>
            <p className="section-subtitle">
              Experience worship, fellowship, and spiritual transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Music, title: "Worship Sessions", desc: "Powerful praise and worship" },
              { icon: Heart, title: "Prayer Time", desc: "Deep spiritual connection" },
              { icon: Users, title: "Fellowship", desc: "Beautiful community moments" },
              { icon: Award, title: "Award Ceremony", desc: "Celebrating achievements" }
            ].map((item, index) => (
              <div key={item.title} className="event-highlight animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <item.icon className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-container hero-gradient">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
              Don't Miss Out!
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Register now for TLBC 2025 and be part of this life-changing spiritual experience.
            </p>
            <Button size="lg" className="btn-secondary text-xl px-12 py-6" asChild>
              <Link to="/registration">Secure Your Spot</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;