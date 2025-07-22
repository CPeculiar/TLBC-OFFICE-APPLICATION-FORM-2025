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
      <div className="min-h-screen py-12">
        <PageHeader
          title="Registration Complete!"
          description="Welcome to The Lord's Brethren Church family"
        />
        <div className="container mx-auto px-4 max-w-md">
          <FormCard title="Thank You">
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg mb-6">
                Your registration has been successfully submitted. <br/>Blessings!
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="w-full"
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
    <div className="min-h-screen py-12">
      <PageHeader
        title="TLBC 2025 Registration Form"
        description="Fill out the form below with your accurate details to register for TLBC 2025"
      />

      <div className="container mx-auto px-4 max-w-2xl">
        <FormCard
          title="Registration Form"
          description="Please fill out all required fields to complete your church registration"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your first name" 
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
                            placeholder="Enter your last name" 
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

                 <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender <span className='text-red-500'>*</span></FormLabel>
                      <FormControl>
                        <select 
                          {...field} 
                          className="form-focus w-full border rounded px-3 py-2"
                          required
                        >
                        <option value="" disabled>
                          Select your gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address <span className='text-red-500'>*</span></FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter your email address" 
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
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address <span className='text-red-500'>*</span></FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Are you a member of The Lord's Brethren Church International? 
                        <span className='text-red-500'>*</span></FormLabel>
                      <FormControl>
                        <select 
                          {...field} 
                          className="form-focus w-full border rounded px-3 py-2"
                        >
                        <option value="" disabled>
                          Choose an option
                        </option>
                        <option value="Member">Yes</option>
                        <option value="Invitee">No</option>
                      </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} 
                />

                   {/* Conditional Church/Zone Field */}
                {categoryValue && (
                  <FormField
                    control={form.control}
                    name="zone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
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
                              className="form-focus w-full border rounded px-3 py-2"
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
                              placeholder="What is the name of your Church?" 
                              {...field} 
                              className="form-focus"
                            />
                          )}
                        </FormControl>
                        <FormMessage />
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
                      <FormItem>
                        <FormLabel>
                          Select your Church
                          <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <select 
                            {...field} 
                            className="form-focus w-full border rounded px-3 py-2"
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
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
                    Submitting Registration...
                  </>
                ) : (
                  'Complete Registration'
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