import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/services/firestore';
import PageHeader from '@/components/PageHeader';
import FormCard from '@/components/FormCard';
import { Loader2, CheckCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(data);
        
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for reaching out. We'll get back to you soon.",
          variant: "success",
        });
        setIsSubmitted(true);
        form.reset();

    } catch (error) {
      toast({
        title: "Message Failed to Send",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-4 px-2 sm:py-12 sm:px-4">
        <PageHeader
          title="Message Sent!"
          description="Thank you for contacting us. We will respond as soon as possible."
        />
        <div className="container mx-auto px-2 sm:px-4 max-w-md">
          <FormCard title="Thank You">
            <div className="text-center py-4 px-2 sm:py-8 sm:px-0">
              <CheckCircle className="w-10 h-10 sm:w-12 md:w-16 sm:h-12 md:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed px-1 sm:px-2">
                Your message has been successfully sent. We will reach out to you soon.
                <br className="hidden sm:block" />
                <span className="block sm:inline mt-1 sm:mt-2 md:mt-0">Blessings!</span>
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="w-full max-w-[200px] sm:max-w-xs mx-auto text-sm sm:text-base px-4 py-2"
                size="default"
              >
                Close
              </Button>
            </div>
          </FormCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-6 lg:py-12">
      <div className="px-2 sm:px-4">
        <PageHeader
          title="Contact Us"
          description="We'd love to hear from you! Please fill out the form below with your details and message."
        />
      </div>

      <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-1 mt-2">
            <Card className="animate-fade-in">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 gradient-text">Contact Information</h3>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Phone className="w-4 h-4 text-primary mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <p className="font-medium text-xs sm:text-sm lg:text-base">Phone</p>
                      <a 
                        href="tel:0913-444-5037" 
                        className="text-muted-foreground text-xs sm:text-sm hover:text-primary transition-colors block break-all"
                      >
                        0913-444-5037
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Mail className="w-4 h-4 text-primary mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <p className="font-medium text-xs sm:text-sm lg:text-base">Email</p>
                      <a 
                        href="mailto:info@thelordsbrethrenchurch.org" 
                        className="text-muted-foreground text-xs sm:text-sm hover:text-primary transition-colors block break-all"
                      >
                        info@thelordsbrethrenchurch.org
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <p className="font-medium text-xs sm:text-sm lg:text-base">Address</p>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        #3 Senator Ekwunife Crescent<br />
                        Kwata Junction Awka, Anambra State.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 gradient-text">Office Hours</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base">Monday - Friday</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base">Saturday</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base">Sunday</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">After Service</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-4 sm:space-y-6 lg:space-y-8 mt-2">
            <FormCard
              title="Send us a Message"
              description="Fill out the form below and we'll get back to you as soon as possible"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm lg:text-base">
                            First Name <span className='text-red-500'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="First name" 
                              {...field} 
                              className="form-focus text-xs sm:text-sm lg:text-base h-9 sm:h-10 lg:h-11 w-full"
                              required
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm lg:text-base">
                            Last Name <span className='text-red-500'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Last name" 
                              {...field} 
                              className="form-focus text-xs sm:text-sm lg:text-base h-9 sm:h-10 lg:h-11 w-full"
                              required
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm lg:text-base">
                            Email Address <span className='text-red-500'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Email address" 
                              {...field} 
                              className="form-focus text-xs sm:text-sm lg:text-base h-9 sm:h-10 lg:h-11 w-full"
                              required
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm lg:text-base">
                            Phone Number <span className='text-red-500'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="Phone number" 
                              {...field} 
                              className="form-focus text-xs sm:text-sm lg:text-base h-9 sm:h-10 lg:h-11 w-full"
                              required
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm lg:text-base">
                          Message <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your message, questions, or enquiries..."
                            rows={3}
                            {...field} 
                            className="form-focus resize-none text-xs sm:text-sm lg:text-base min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] w-full"
                            required
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full primary-gradient glow-shadow text-xs sm:text-sm lg:text-base h-9 sm:h-10 lg:h-12 font-medium px-4" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin flex-shrink-0" />
                        <span className="truncate">Sending...</span>
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </Form>
            </FormCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;