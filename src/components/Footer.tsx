
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
        {/* Bottom Bar - Enhanced */}
        <div className="border-t border-primary-foreground/10 bg-primary-foreground/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <p className="text-primary-foreground/70 text-xs font-medium">
                  © 2025 Office of the CEO | TLBC Int'l
                </p>
                <p className="text-primary-foreground/60 text-xs">
                  All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;