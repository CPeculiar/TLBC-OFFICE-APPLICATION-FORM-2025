import { Link } from 'react-router-dom';
import { Users, Handshake, Mail, Shield, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const features = [
    {
      icon: Users,
      title: 'Member Registration',
      description: 'Join our church community with a simple registration process.',
      href: '/registration',
      buttonText: 'Register Now'
    },
    {
      icon: Handshake,
      title: 'Partnership',
      description: 'Partner with us in ministry and community outreach programs.',
      href: '/partnership',
      buttonText: 'Apply for Partnership'
    },
    {
      icon: Mail,
      title: 'Contact Us',
      description: 'Get in touch with our pastoral team for spiritual guidance.',
      href: '/contact',
      buttonText: 'Send Message'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Love & Compassion',
      description: 'We show God\'s love through acts of compassion and service to our community.'
    },
    {
      icon: Shield,
      title: 'Faith & Truth',
      description: 'Grounded in biblical truth, we strengthen faith through fellowship and worship.'
    },
    {
      icon: Globe,
      title: 'Unity & Outreach',
      description: 'Building bridges across communities while spreading the Gospel message.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Welcome to{' '}
              <span className="gradient-text">
                The Lord's Brethren Church
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              A place of worship, fellowship, and spiritual growth. Join our community 
              and experience God's love through meaningful connections and service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="primary-gradient glow-shadow" asChild>
                <Link to="/registration">Join Our Community</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-4">
              Get Connected
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the various ways you can connect with our church community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className={`group hover:shadow-lg smooth-transition animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 primary-gradient rounded-full flex items-center justify-center group-hover:scale-110 smooth-transition">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full" variant="outline" asChild>
                    <Link to={feature.href}>{feature.buttonText}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our ministry and community life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={value.title} className={`text-center animate-fade-in`} style={{ animationDelay: `${index * 150}ms` }}>
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <value.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Whether you're seeking spiritual growth, community fellowship, or ways to serve, 
              we welcome you to be part of our church family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="primary-gradient glow-shadow" asChild>
                <Link to="/registration">Register Today</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/partnership">Explore Partnership</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;