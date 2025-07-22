import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Heart, Music, Award, Camera, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import IMG1 from '/TLBC25.jpg';
import Home_IMG from '/images/home-img1.jpg';
import TLBC_VIDEO from '/TLBC24Animation.mp4';

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
             poster={IMG1}
            // poster="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          >
            {/* <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" /> */}
            <source src={TLBC_VIDEO} type="video/mp4" />
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
                <Link to="/partnership">Partner with us</Link>
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
                  href="https://www.instagram.com/thelordsbrethrenchurchintl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center smooth-transition hover:scale-110"
                >
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                </a>
                <a
                href="https://t.me/TheLordsbrethrenchurchintl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center smooth-transition hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
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
               The Lord's Brethren Convocation (TLBC) is an annual, glorious homecoming of members, partners, stakeholders, and 
               nationals of The Lord's Brethren Nation. It's a time to celebrate our victories, joys, successes, 
               conquests, and achievements.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                This year's convocation will feature moments of worship, extended sessions of teaching, impartations, 
                awards, and The Lord's Brethren Family Meeting. Don't miss this transformative experience—
                <strong> it's The Lord's Brethren Experience.</strong>
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
                  src={Home_IMG} 
                  alt="TLBC Event" 
                  className="w-full h-60 sm:h-80 object-cover rounded-xl mb-6"
                />
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4">Our Annual Homecoming</h3>
                <p className="text-muted-foreground">An amazing experience awaits you.</p>
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
              Experience the ministry of the word, The Lord's Brethren songs, intense prayer sessions, praise and worship sessions, 
              fellowship, and The Lords Brethren Family Meeting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Music, title: "The Lord's Brethren songs", desc: "Our unique family songs" },
              { icon: Users, title: "Fellowship", desc: "Beautiful moments of fellowshiiping together" },
              { icon: Heart, title: "The Lords Brethren Family Meeting", desc: "Our family meeting comprising of many activities" },
              { icon: Award, title: "Award Ceremony", desc: "Celebrating the outstanding achievements of our Leaders" }
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
              Register now for TLBC 2025 and be part of this life-changing experience.
            </p>
            <Button size="lg" className="btn-secondary text-xl px-12 py-6" asChild>
              <Link to="/registration">Click here to Register</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;