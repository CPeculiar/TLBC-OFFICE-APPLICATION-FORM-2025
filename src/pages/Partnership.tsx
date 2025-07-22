import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { submitPartnershipForm } from '@/services/firestore';
import PageHeader from '@/components/PageHeader';
import FormCard from '@/components/FormCard';
import { Loader2, CheckCircle } from 'lucide-react';

const partnershipSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please enter your complete address'),
  church: z.string().optional(),
});

type PartnershipFormData = z.infer<typeof partnershipSchema>;

const Partnership = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {      
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      church: "",
    },
  });

  const onSubmit = async (data: PartnershipFormData) => {
    setIsSubmitting(true);
    
    try {
      // Submit to Firebase first
      const docId = await submitPartnershipForm(data);

        toast({
          title: "Partnership details received!",
          description: "Redirecting to payment page...",
          variant: "success",
        });

         // Wait a moment for the toast to be visible, then redirect
      setTimeout(() => {
        window.location.href = 'https://paystack.shop/pay/tlbc25';
      }, 1500);
      
        form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-12">
        <PageHeader
          title="Application Submitted!"
          description="Thank you for your interest in partnering with TLBC"
        />
        <div className="container mx-auto px-4 max-w-md">
          <FormCard title="Thank You">
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg mb-6">
                Your partnership details has been successfully submitted. <br/> Blessings!.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="w-full"
              >
                close
              </Button>
            </div>
          </FormCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <PageHeader
        title="TLBC 2025 Partnership Form"
        description="Fill out the form below with your accurate details to partner for TLBC 2025"
      />

      <div className="container mx-auto px-4 max-w-2xl">
        <FormCard
          title="Partnership Form"
          description="Please provide us with your accurate information below"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name <span className='text-red-500'>*</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your First name" 
                          {...field} 
                          className="form-focus"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name <span className='text-red-500'>*</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your Last name" 
                          {...field} 
                          className="form-focus"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address <span className='text-red-500'>*</span></FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter email address" 
                          {...field} 
                          className="form-focus"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number <span className='text-red-500'>*</span></FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="Enter your phone number" 
                          {...field} 
                          className="form-focus"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address <span className='text-red-500'>*</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your address" 
                          {...field} 
                          className="form-focus"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <FormField
                  control={form.control}
                  name="church"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Church/Ministry </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your the name of your church" 
                          {...field} 
                          className="form-focus"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full primary-gradient glow-shadow" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Submit & Proceed to Payment'
                )}
              </Button>
            </form>
          </Form>
        </FormCard>
      </div>
    </div>
  );
};

export default Partnership;