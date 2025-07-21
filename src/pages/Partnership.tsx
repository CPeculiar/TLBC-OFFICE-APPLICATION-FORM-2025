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
import { submitPartnershipForm } from '@/services/firestore';
import PageHeader from '@/components/PageHeader';
import FormCard from '@/components/FormCard';
import { Loader2, CheckCircle } from 'lucide-react';

const partnershipSchema = z.object({
  organizationName: z.string().min(2, 'Organization name must be at least 2 characters'),
  contactPersonName: z.string().min(2, 'Contact person name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please enter your complete address'),
  website: z.string().optional(),
  organizationType: z.string().min(1, 'Please select organization type'),
  partnershipType: z.string().min(1, 'Please select partnership type'),
  missionStatement: z.string().min(10, 'Please provide a mission statement'),
  partnershipGoals: z.string().min(10, 'Please describe your partnership goals'),
  previousPartnerships: z.string().optional(),
  expectedContribution: z.string().min(10, 'Please describe your expected contribution'),
  additionalInfo: z.string().optional(),
});

type PartnershipFormData = z.infer<typeof partnershipSchema>;

const Partnership = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      organizationName: '',
      contactPersonName: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      organizationType: '',
      partnershipType: '',
      missionStatement: '',
      partnershipGoals: '',
      previousPartnerships: '',
      expectedContribution: '',
      additionalInfo: '',
    },
  });

  const onSubmit = async (data: PartnershipFormData) => {
    setIsSubmitting(true);
    
    try {
      const result = await submitPartnershipForm(data);
      
      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Partnership Application Submitted!",
          description: "Thank you for your interest in partnering with us. We'll review your application and get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error(result.error);
      }
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
                Your partnership application has been successfully submitted. Our partnership 
                committee will review your application and contact you within 5-7 business days.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="w-full"
              >
                Submit Another Application
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
        title="Partnership Application"
        description="Partner with us in ministry and community outreach programs"
      />

      <div className="container mx-auto px-4 max-w-2xl">
        <FormCard
          title="Partnership Form"
          description="Please provide detailed information about your organization and partnership goals"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Organization Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Organization Information</h3>
                
                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your organization name" 
                          {...field} 
                          className="form-focus"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organizationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-focus">
                            <SelectValue placeholder="Select organization type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="church">Church</SelectItem>
                          <SelectItem value="nonprofit">Non-Profit Organization</SelectItem>
                          <SelectItem value="ministry">Ministry</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://www.yourwebsite.com" 
                          {...field} 
                          className="form-focus"
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
                  name="contactPersonName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter contact person name" 
                          {...field} 
                          className="form-focus"
                        />
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
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter email address" 
                          {...field} 
                          className="form-focus"
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
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="Enter phone number" 
                          {...field} 
                          className="form-focus"
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
                      <FormLabel>Address *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your organization address" 
                          {...field} 
                          className="form-focus"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Partnership Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Partnership Details</h3>
                
                <FormField
                  control={form.control}
                  name="partnershipType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partnership Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-focus">
                            <SelectValue placeholder="Select partnership type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ministry">Ministry Partnership</SelectItem>
                          <SelectItem value="community">Community Outreach</SelectItem>
                          <SelectItem value="missions">Missions Support</SelectItem>
                          <SelectItem value="education">Educational Programs</SelectItem>
                          <SelectItem value="events">Event Collaboration</SelectItem>
                          <SelectItem value="resources">Resource Sharing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="missionStatement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mission Statement *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your organization's mission and values"
                          rows={3}
                          {...field} 
                          className="form-focus resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="partnershipGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partnership Goals *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What do you hope to achieve through this partnership?"
                          rows={3}
                          {...field} 
                          className="form-focus resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expectedContribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Contribution *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What can your organization contribute to this partnership?"
                          rows={3}
                          {...field} 
                          className="form-focus resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="previousPartnerships"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Partnerships (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about any previous church or ministry partnerships"
                          rows={3}
                          {...field} 
                          className="form-focus resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional information you'd like to share"
                          rows={3}
                          {...field} 
                          className="form-focus resize-none"
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
                    Submitting Application...
                  </>
                ) : (
                  'Submit Partnership Application'
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