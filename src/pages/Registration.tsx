import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { submitRegistrationForm } from "@/services/firestore";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/PageHeader';
import FormCard from '@/components/FormCard';
import { Loader2, CheckCircle } from 'lucide-react';

const registrationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  gender: z.string().min(2, 'Gender must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(3, 'Please enter your complete address'),
  category: z.string().min(2, 'Category must be at least 2 characters'),
  zone: z.string().min(3, 'Zone must be at least 3 characters'),
  church: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const Registration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      phone: '',
      address: '',
      category: '',
      zone: '',
      church: '',
    },
  });

// Watch the category field to handle conditional rendering
  const categoryValue = form.watch('category');
  const zoneValue = form.watch('zone');

  const churchOptions = {
    'TLBC Awka': 'TLBC Awka',
    'TLBC Ekwulobia': 'TLBC Ekwulobia',
    'TLBC Ihiala': 'TLBC Ihiala', 
    'TLBC Nnewi': 'TLBC Nnewi', 
    'TLBC Onitsha': 'TLBC Onitsha', 
    'TLBCM Agulu': 'TLBCM Agulu', 
    'TLBCM Igbariam': 'TLBCM Igbariam',
    'TLBCM Uli': 'TLBCM Uli',
    'TLBCM FUTO': 'TLBCM FUTO', 
    'TLBCM IMSU': 'TLBCM IMSU', 
    'TLBCM Mbaukwu': 'TLBCM Mbaukwu', 
    'TLBCM Anspoly Mgbakwu': 'TLBCM Anspoly Mgbakwu',
    'TLBCM NAU': 'TLBCM NAU',
    'TLBCM Nekede': 'TLBCM Nekede', 
    'TLBCM Oko': 'TLBCM Oko', 
    'TLBCM NAU Okofia': 'TLBCM NAU Okofia',
    'TLBCM UNILAG': 'TLBCM UNILAG', 
    'TLTN Awka': 'TLTN Awka', 
    'TLTN Agulu': 'TLTN Agulu', 
  };

  // Reset zone when category changes
  useEffect(() => {
    if (categoryValue) {
      form.setValue('zone', '');
      form.setValue('church', '');
    }
  }, [categoryValue, form]);

  // Reset church when zone changes
  useEffect(() => {
    if (zoneValue) {
      form.setValue('church', '');
    }
  }, [zoneValue, form]);

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    try {
      const result = await submitRegistrationForm(data);
        toast({
          title: "Registration Successful!",
          description: "Thank you for Registering. We'll be in touch soon.",
          variant: "success",
        });
        setIsSubmitted(true);
        form.reset();
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-4 sm:py-6 md:py-12 px-3 sm:px-4 md:px-6">
        <div className="w-full max-w-full overflow-hidden">
          <PageHeader
            title="Registration Complete!"
            description="Welcome to The Lord's Brethren Church family"
          />
        </div>
        <div className="container mx-auto max-w-xs sm:max-w-md w-full px-2 sm:px-4">
          <FormCard title="Thank You">
            <div className="text-center py-6 sm:py-8 px-4">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" />
              <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed break-words">
                Your registration has been successfully submitted. 
                <br className="hidden sm:inline"/>
                <span className="block sm:inline"> Blessings!</span>
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="w-full max-w-full text-sm sm:text-base py-3 sm:py-3 min-h-[44px] sm:min-h-[48px]"
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
    <div className="min-h-screen py-4 sm:py-6 md:py-12 px-3 sm:px-4 md:px-6">
      <div className="w-full max-w-full overflow-hidden">
        <PageHeader
          title="TLBC 2025 Registration Form"
          description="Fill out the form below with your accurate details to register for TLBC 2025"
        />
      </div>

      <div className="container mx-auto max-w-full sm:max-w-xl md:max-w-2xl w-full px-2 sm:px-4">
        <FormCard
          title="Registration Form"
          description="Please fill out all required fields to complete your church registration"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground break-words">Personal Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm sm:text-base break-words">
                          First Name <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter first name" 
                            {...field} 
                            className="form-focus w-full min-w-0 text-sm sm:text-base py-2.5 sm:py-3 px-2 sm:px-3"
                            required
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm break-words" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm sm:text-base break-words">
                          Last Name <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter last name" 
                            {...field} 
                            className="form-focus w-full min-w-0 text-sm sm:text-base py-2.5 sm:py-3 px-2 sm:px-3"
                            required
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm break-words" />
                      </FormItem>
                    )}
                  />
                </div>

                 <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm sm:text-base break-words">
                        Gender <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <select 
                          {...field} 
                          className="form-focus w-full min-w-0 border rounded px-2 sm:px-3 py-2.5 sm:py-3 text-sm sm:text-base bg-background"
                          required
                        >
                        <option value="" disabled>
                          Select your gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm break-words" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm sm:text-base break-words">
                        Email Address <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter email" 
                          {...field} 
                          className="form-focus w-full min-w-0 text-sm sm:text-base py-2.5 sm:py-3 px-2 sm:px-3"
                          required
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm break-words" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm sm:text-base break-words">
                        Phone <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="Enter phone num" 
                          {...field} 
                          className="form-focus w-full min-w-0 text-sm sm:text-base py-2.5 sm:py-3 px-2 sm:px-3"
                          required
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm break-words" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground break-words">Contact Information</h3>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm sm:text-base break-words">
                        Address <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="Enter your address" 
                          {...field} 
                          className="form-focus w-full min-w-0 text-sm sm:text-base py-2.5 sm:py-3 px-2 sm:px-3"
                          required
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm break-words" />
                    </FormItem>
                  )}
                />
                
                 <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm sm:text-base break-words leading-relaxed"> 
                       Are you a member of The Lord's Brethren Church Int'l? <span className='text-red-500'>*</span>
                       
                      </FormLabel>
                      <FormControl>
                        <select 
                          {...field} 
                          className="form-focus w-full min-w-0 border rounded px-2 sm:px-3 py-2.5 sm:py-3 text-sm sm:text-base bg-background"
                        >
                        <option value="" disabled>
                          Choose an option
                        </option>
                        <option value="Member">Yes</option>
                        <option value="Invitee">No</option>
                      </select>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm break-words" />
                    </FormItem>
                  )} 
                />

                   {/* Conditional Church/Zone Field */}
                {categoryValue && (
                  <FormField
                    control={form.control}
                    name="zone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm sm:text-base break-words leading-relaxed">
                          {categoryValue === "Member" 
                            ? "Please select your church or zone" 
                            : "What is the name of your Church/Ministry?"
                          }
                          <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          {categoryValue === "Member" ? (
                            <select 
                              {...field} 
                              className="form-focus w-full min-w-0 border rounded px-2 sm:px-3 py-2.5 sm:py-3 text-sm sm:text-base bg-background"
                            >
                              <option value="" disabled>
                                Select your zone
                              </option>
                              <option value="Awka zone">Awka zone</option>
                              <option value="Nnewi zone">Nnewi zone</option>
                              <option value="Owerri zone">Owerri zone</option>
                              <option value="Ekwulobia zone">Ekwulobia zone</option>
                              <option value="Onitsha zone">Onitsha zone</option>
                            </select>
                          ) : (
                            <Input 
                              type="text" 
                              placeholder="Church name" 
                              {...field} 
                              className="form-focus w-full min-w-0 text-sm sm:text-base py-2.5 sm:py-3 px-2 sm:px-3"
                            />
                          )}
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm break-words" />
                      </FormItem>
                    )}
                  />
                )}

                   {/* Church Field - Only for Members who have selected a zone */}
                {categoryValue === "Member" && zoneValue && (
                  <FormField
                    control={form.control}
                    name="church"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm sm:text-base break-words">
                          Select your Church
                          <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <select 
                            {...field} 
                            className="form-focus w-full min-w-0 border rounded px-2 sm:px-3 py-2.5 sm:py-3 text-sm sm:text-base bg-background"
                          >
                            <option value="" disabled>
                              Select your church
                            </option>
                            {Object.entries(churchOptions).map(([displayName, value]) => (
                              <option key={value} value={displayName}>
                                {displayName}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm break-words" />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full max-w-full primary-gradient glow-shadow text-sm sm:text-base py-3 sm:py-4 px-3 sm:px-6 min-h-[44px] sm:min-h-[48px]" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 w-full">
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-center truncate">Registering...</span>
                  </div>
                ) : (
                  <span className="text-sm sm:text-base text-center">Register</span>
                )}
              </Button>
            </form>
          </Form>
        </FormCard>
      </div>
    </div>
  );
};

export default Registration;