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
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  

            {/* Logo & About */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                  {/* <Heart className="w-6 h-6 text-secondary-foreground" /> */}
                  <img 
                src={Logo} 
                alt="TLBC Logo" 
                className="h-24 w-35 object-contain"
              />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold">TLBC 2025</h3>
                  <p className="text-primary-foreground/80 text-sm">The Lord's Brethren Convocation</p>
                </div>
              </div>
              <p className="text-primary-foreground/90 leading-relaxed mb-6">
                Join us for The Lord's Brethren Convocation 2025 - our annual homecoming as a ministry. 
                Experience the ministry of the word and prayer, praise and worship, and impartation 
                that will strengthen you in your journey of ministry.
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
                    <a href="tel: 0913-444-5037" className="text-primary-foreground/90 text-sm">
                    0913-444-5037</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <a href="mailto:info@thelordsbrethrenchurch.org" className="text-primary-foreground/90 text-sm">
                    info@thelordsbrethrenchurch.org</a>
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
                TLBC'25 Planning Team <Heart className="w-4 h-4 text-secondary" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;