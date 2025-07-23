import { Heart, Mail, Phone, MapPin, Facebook, Youtube, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '/logo2.png'; 

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Mobile-First Layout */}
          <div className="space-y-12 lg:space-y-0">
            
            {/* Top Section - Logo & Brand */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-4 mb-6 lg:mb-8">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary rounded-2xl flex items-center justify-center shadow-lg">
                  <img 
                    src={Logo} 
                    alt="TLBC Logo" 
                    className="h-12 w-12 lg:h-16 lg:w-16 object-contain"
                  />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl lg:text-3xl font-heading font-bold mb-1">TLBC 2025</h2>
                  <p className="text-primary-foreground/90 text-base lg:text-lg font-medium">
                    The Lord's Brethren Convocation
                  </p>
                </div>
              </div>
              
              <p className="text-primary-foreground/80 leading-relaxed text-sm lg:text-base max-w-2xl mx-auto lg:mx-0 mb-8">
                Join us for The Lord's Brethren Convocation 2025 - our annual homecoming.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Quick Links - Card Style */}
              <div className="bg-primary-foreground/5 rounded-2xl p-6 backdrop-blur-sm border border-primary-foreground/10">
                <h3 className="text-xl font-heading font-semibold mb-6 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Quick Links
                </h3>
                <nav className="space-y-3">
                  <Link to="/" className="group flex items-center justify-center md:justify-start gap-3 px-4 py-2 rounded-xl text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/5 smooth-transition">
                    <div className="w-1 h-1 bg-current rounded-full opacity-60 group-hover:opacity-100"></div>
                    <span className="text-sm font-medium">Home</span>
                  </Link>
                  <Link to="/registration" className="group flex items-center justify-center md:justify-start gap-3 px-4 py-2 rounded-xl text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/5 smooth-transition">
                    <div className="w-1 h-1 bg-current rounded-full opacity-60 group-hover:opacity-100"></div>
                    <span className="text-sm font-medium">Register Now</span>
                  </Link>
                  <Link to="/partnership" className="group flex items-center justify-center md:justify-start gap-3 px-4 py-2 rounded-xl text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/5 smooth-transition">
                    <div className="w-1 h-1 bg-current rounded-full opacity-60 group-hover:opacity-100"></div>
                    <span className="text-sm font-medium">Partnership</span>
                  </Link>
                  <Link to="/gallery" className="group flex items-center justify-center md:justify-start gap-3 px-4 py-2 rounded-xl text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/5 smooth-transition">
                    <div className="w-1 h-1 bg-current rounded-full opacity-60 group-hover:opacity-100"></div>
                    <span className="text-sm font-medium">Gallery</span>
                  </Link>
                  <Link to="/contact" className="group flex items-center justify-center md:justify-start gap-3 px-4 py-2 rounded-xl text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/5 smooth-transition">
                    <div className="w-1 h-1 bg-current rounded-full opacity-60 group-hover:opacity-100"></div>
                    <span className="text-sm font-medium">Contact Us</span>
                  </Link>
                </nav>
              </div>

              {/* Event Details - Card Style */}
              <div className="bg-primary-foreground/5 rounded-2xl p-6 backdrop-blur-sm border border-primary-foreground/10">
                <h3 className="text-xl font-heading font-semibold mb-6 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Event Details
                </h3>
                <div className="space-y-4">
                  {/* Venue */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-3 rounded-xl hover:bg-primary-foreground/5 smooth-transition">
                    <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="text-center sm:text-left min-w-0 flex-1">
                      <p className="text-primary-foreground/90 text-sm font-medium mb-1">
                        Bishop Crowther Retreat Center
                      </p>
                      <p className="text-primary-foreground/70 text-xs">
                        MCC Onitsha, Anambra State
                      </p>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-3 rounded-xl hover:bg-primary-foreground/5 smooth-transition">
                    <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="text-center sm:text-left min-w-0 flex-1">
                      <a href="tel:09134445037" className="text-primary-foreground/90 text-sm font-medium hover:text-secondary smooth-transition block">
                        0913-444-5037
                      </a>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-3 rounded-xl hover:bg-primary-foreground/5 smooth-transition">
                    <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="text-center sm:text-left min-w-0 flex-1">
                      <a href="mailto:info@thelordsbrethrenchurch.org" className="text-primary-foreground/90 text-sm font-medium hover:text-secondary smooth-transition break-all">
                        info@thelordsbrethrenchurch.org
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media - Card Style */}
              <div className="bg-primary-foreground/5 rounded-2xl p-6 backdrop-blur-sm border border-primary-foreground/10 md:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-heading font-semibold mb-6 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Connect With Us
                </h3>
                
                {/* Social Icons Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 mb-6">
                  <a
                    href="https://web.facebook.com/thelordsbrethrenchurchintl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 p-4 bg-primary-foreground/10 hover:bg-secondary/20 rounded-xl smooth-transition hover:scale-105"
                  >
                    <div className="w-10 h-10 bg-primary-foreground/10 group-hover:bg-secondary/30 rounded-lg flex items-center justify-center smooth-transition">
                      <Facebook className="w-5 h-5 group-hover:text-secondary" />
                    </div>
                    <span className="text-xs text-primary-foreground/70 group-hover:text-primary-foreground/90">Facebook</span>
                  </a>

                  <a
                    href="https://www.youtube.com/@thelordsbrethrenchurchintl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 p-4 bg-primary-foreground/10 hover:bg-secondary/20 rounded-xl smooth-transition hover:scale-105"
                  >
                    <div className="w-10 h-10 bg-primary-foreground/10 group-hover:bg-secondary/30 rounded-lg flex items-center justify-center smooth-transition">
                      <Youtube className="w-5 h-5 group-hover:text-secondary" />
                    </div>
                    <span className="text-xs text-primary-foreground/70 group-hover:text-primary-foreground/90">YouTube</span>
                  </a>

                  <a
                    href="https://www.instagram.com/thelordsbrethrenchurchintl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 p-4 bg-primary-foreground/10 hover:bg-secondary/20 rounded-xl smooth-transition hover:scale-105"
                  >
                    <div className="w-10 h-10 bg-primary-foreground/10 group-hover:bg-secondary/30 rounded-lg flex items-center justify-center smooth-transition">
                      <svg className="w-5 h-5 group-hover:text-secondary smooth-transition" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-primary-foreground/70 group-hover:text-primary-foreground/90">Instagram</span>
                  </a>

                  <a
                    href="https://t.me/TheLordsbrethrenchurchintl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 p-4 bg-primary-foreground/10 hover:bg-secondary/20 rounded-xl smooth-transition hover:scale-105"
                  >
                    <div className="w-10 h-10 bg-primary-foreground/10 group-hover:bg-secondary/30 rounded-lg flex items-center justify-center smooth-transition">
                      <svg className="w-5 h-5 group-hover:text-secondary smooth-transition" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-primary-foreground/70 group-hover:text-primary-foreground/90">Telegram</span>
                  </a>
                </div>

                <p className="text-center text-xs text-primary-foreground/60">
                  Follow us for spiritual education and growth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <div className="border-t border-primary-foreground/10 bg-primary-foreground/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <p className="text-primary-foreground/70 text-xs font-medium">
                  © 2025 The Lord's Brethren Church International
                </p>
                <p className="text-primary-foreground/60 text-xs">
                  All rights reserved
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-primary-foreground/70 text-xs font-medium">
                  TLBC'25 Planning Team
                </p>
                <Heart className="w-3 h-3 text-secondary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;