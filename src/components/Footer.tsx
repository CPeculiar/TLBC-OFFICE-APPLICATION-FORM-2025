import { Heart, Mail, Phone, MapPin, Facebook, Youtube, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Logo & About */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold">TLBC 2025</h3>
                  <p className="text-primary-foreground/80 text-sm">The Lord's Brethren Church</p>
                </div>
              </div>
              <p className="text-primary-foreground/90 leading-relaxed mb-6">
                Join us for The Lord's Brethren Convocation 2025 - a transformative spiritual gathering 
                where faith meets fellowship. Experience worship, teachings, and divine connections 
                that will strengthen your spiritual journey.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://web.facebook.com/thelordsbrethrenchurchintl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 hover:bg-secondary rounded-lg flex items-center justify-center smooth-transition hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@thelordsbrethrenchurchintl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 hover:bg-secondary rounded-lg flex items-center justify-center smooth-transition hover:scale-110"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/elochukwutlbc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 hover:bg-secondary rounded-lg flex items-center justify-center smooth-transition hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-heading font-semibold mb-6">Quick Links</h4>
              <nav className="space-y-3">
                <Link to="/" className="block text-primary-foreground/80 hover:text-secondary smooth-transition">
                  Home
                </Link>
                <Link to="/registration" className="block text-primary-foreground/80 hover:text-secondary smooth-transition">
                  Register Now
                </Link>
                <Link to="/partnership" className="block text-primary-foreground/80 hover:text-secondary smooth-transition">
                  Partnership
                </Link>
                <Link to="/gallery" className="block text-primary-foreground/80 hover:text-secondary smooth-transition">
                  Gallery
                </Link>
                <Link to="/contact" className="block text-primary-foreground/80 hover:text-secondary smooth-transition">
                  Contact Us
                </Link>
              </nav>
            </div>

            {/* Event Info */}
            <div>
              <h4 className="text-lg font-heading font-semibold mb-6">Event Details</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-primary-foreground/90 text-sm">
                      Bishop Crowther Retreat Center
                    </p>
                    <p className="text-primary-foreground/70 text-sm">
                      MCC Onitsha, Anambra State
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-primary-foreground/90 text-sm">+234 XXX XXX XXXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-primary-foreground/90 text-sm">info@tlbc.org</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-primary-foreground/70 text-sm text-center md:text-left">
                © 2025 The Lord's Brethren Church International. All rights reserved.
              </p>
              <p className="text-primary-foreground/70 text-sm flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-secondary" /> for TLBC 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;