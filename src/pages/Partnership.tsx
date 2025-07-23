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
      <div className="min-h-screen py-6 sm:py-12 px-4">
        <PageHeader
          title="Form Submitted!"
          description="Thank you for your partnership with us"
        />
        <div className="container mx-auto max-w-sm sm:max-w-md">
          <FormCard title="Thank You">
            <div className="text-center py-6 sm:py-8 px-2">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" />
              <p className="text-sm sm:text-lg mb-6 leading-relaxed">
                Your partnership details has been successfully submitted.{' '}
                <br className="hidden sm:block" />
                <span className="block sm:inline mt-1 sm:mt-0">Blessings!</span>
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="w-full max-w-xs mx-auto text-sm sm:text-base py-2 sm:py-3"
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
    <div className="min-h-screen py-6 sm:py-12 px-4">
      <PageHeader
        title="TLBC 2025 Partnership Form"
        description="Fill out the form below with your accurate details to partner for TLBC 2025"
      />

      <div className="container mx-auto max-w-full sm:max-w-2xl">
        <FormCard
          title="Partnership Form"
          description="Please provide us with your accurate information below"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground break-words">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          First Name <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your first name" 
                            {...field} 
                            className="form-focus w-full text-sm sm:text-base py-2 sm:py-3"
                            required
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          Last Name <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your last name" 
                            {...field} 
                            className="form-focus w-full text-sm sm:text-base py-2 sm:py-3"
                            required
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground break-words">
                  Contact Information
                </h3>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Email Address <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter email" 
                          {...field} 
                          className="form-focus w-full text-sm sm:text-base py-2 sm:py-3"
                          required
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Phone Number <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="Enter your phone num" 
                          {...field} 
                          className="form-focus w-full text-sm sm:text-base py-2 sm:py-3"
                          required
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Address <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your address" 
                          {...field} 
                          className="form-focus w-full text-sm sm:text-base py-2 sm:py-3"
                          required
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                    control={form.control}
                    name="church"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          Church/Ministry
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter the name of your church" 
                            {...field} 
                            className="form-focus w-full text-sm sm:text-base py-2 sm:py-3"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
              </div>

              <Button 
                type="submit" 
                className="w-full primary-gradient glow-shadow text-sm sm:text-base py-3 sm:py-4 px-4 min-h-[48px] sm:min-h-[52px]" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin flex-shrink-0" />
                    <span className="truncate">Processing...</span>
                  </>
                ) : (
                  <span className="break-words text-center leading-tight">
                    Submit
                  </span>
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