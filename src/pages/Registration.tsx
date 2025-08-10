import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { submitRegistrationForm } from "@/services/firestore";
import { uploadDocument, validateDocumentFile } from "@/services/storage";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/PageHeader';
import FormCard from '@/components/FormCard';
import { Loader2, CheckCircle, Upload, FileText } from 'lucide-react';

const registrationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().optional(),
  address: z.string().min(3, 'Please enter your complete address'),
  gender: z.string().min(2, 'Gender must be at least 2 characters'),
  church: z.string().min(2, 'Church name must be at least 2 characters'),
  zone: z.string().min(2, 'Zone must be at least 2 characters'),
  officeNow: z.string().optional(),
  achievements: z.string().optional(),
  officeApply: z.string().min(2, 'Office applying for must be at least 2 characters'),
  reasonsApply: z.string().min(2, 'Reasons for applying must be at least 2 characters'),
  document: z.any().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const Registration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      gender: '',
      zone: '',
      church: '',
      officeNow: '',
      achievements: '',
      officeApply: '',
      reasonsApply: '',
      document: null,
    },
  });

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validation = validateDocumentFile(file);
      if (!validation.isValid) {
        toast({
          title: "Invalid File",
          description: validation.error,
          variant: "destructive",
        });
        event.target.value = '';
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setUploadProgress('Preparing submission...');
    
    try {
      let documentUrl = '';
      
      if (selectedFile) {
        setUploadProgress('Uploading document...');
        const applicantName = `${data.firstName}_${data.lastName}`;
        documentUrl = await uploadDocument(selectedFile, applicantName);
      }
      
      setUploadProgress('Saving application...');
      const submissionData = {
        ...data,
        documentUrl: documentUrl || null,
        documentName: selectedFile?.name || null,
      };
      
      const result = await submitRegistrationForm(submissionData);
      toast({
        title: "Application submitted Successful!",
        description: "Thank you for Applying. Blessings!",
        variant: "success",
      });
      setIsSubmitted(true);
      form.reset();
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact the CEO directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress('');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-4 sm:py-6 md:py-12 px-3 sm:px-4 md:px-6">
        <div className="w-full max-w-full overflow-hidden">
          <PageHeader
            title="Application submitted successfully!"
            description="Thank you for Applying. Blessings!"
          />
        </div>
        <div className="container mx-auto max-w-xs sm:max-w-md w-full px-2 sm:px-4 mt-4 text-center">
          <FormCard title="Thank You">
            <div className="text-center py-6 sm:py-8 px-4">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" />
              <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed break-words">
                Your Application has been successfully submitted. 
                <br className="hidden sm:inline"/>
                <span className="block sm:inline"> Blessings!</span>
              </p>
              <Button 
                onClick={() => {setIsSubmitted(false);  navigate("/");}}
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
          title="Leadership Position Application Form"
          description="Please, fill out the form below with the accurate details"
        />
      </div>

      <div className="container mx-auto max-w-full sm:max-w-xl md:max-w-2xl w-full px-2 sm:px-4">
        <FormCard
          title="Application Form"
          description="Please fill out all required fields below and submit."
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
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter email" 
                          {...field} 
                          className="form-focus w-full min-w-0 text-sm sm:text-base py-2.5 sm:py-3 px-2 sm:px-3"
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
                  name="zone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm sm:text-base break-words leading-relaxed"> 
                       Please select your zone <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
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
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm break-words" />
                    </FormItem>
                  )} 
                />

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
              </div>


               {/* Leadership Information */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground break-words">Leadership Information</h3>

                <FormField
                  control={form.control}
                  name="officeNow"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm sm:text-base break-words">
                        Current Position(s)
                      </FormLabel>
                      <FormControl>
                        <textarea 
                          name='officeNow'
                          // value={field.value}
                          placeholder="List your current leadership position(s)" 
                          {...field} 
                          className="form-focus w-full min-w-0 text-sm sm:text-base py-2.5 sm:py-3 px-2 sm:px-3 rounded border bg-background"
                           rows={3}
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm break-words" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="achievements"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm sm:text-base break-words">
                        Achievements
                      </FormLabel>
                      <FormControl>
                        <textarea 
                          name='achievements'
                          // value={field.value}
                          placeholder="List your achievements this ministry year" 
                          {...field} 
                          className="form-focus w-full min-w-0 text-sm sm:text-base py-2.5 sm:py-3 px-2 sm:px-3 rounded border bg-background"
                           rows={3}
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm break-words" />
                    </FormItem>
                  )}
                />

               <FormField
                  control={form.control}
                  name="officeApply"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm sm:text-base break-words">
                        Office Applying For <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <textarea 
                          name='officeApply'
                          placeholder="Specify the office(s) you are applying for. If multiple, separate with commas." 
                          {...field} 
                          className="form-focus w-full min-w-0 text-sm sm:text-base py-2.5 sm:py-3 px-2 sm:px-3 rounded border bg-background"
                           rows={3}
                           required
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm break-words" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reasonsApply"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm sm:text-base break-words">
                        Reasons for Applying <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <textarea 
                          name='reasonsApply'
                          placeholder="Why do you want to serve in this office?" 
                          {...field} 
                          className="form-focus w-full min-w-0 text-sm sm:text-base py-2.5 sm:py-3 px-2 sm:px-3 rounded border bg-background"
                           rows={3}
                            required
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm break-words" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Document Upload */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground break-words">Supporting Document</h3>
                
                <div className="w-full">
                  <label className="text-sm sm:text-base break-words block mb-2">
                    Upload Letter/Document (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.odt,.txt,.rtf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="document-upload"
                    />
                    <label htmlFor="document-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center space-y-2">
                        {selectedFile ? (
                          <FileText className="w-8 h-8 text-green-500" />
                        ) : (
                          <Upload className="w-8 h-8 text-gray-400" />
                        )}
                        <div className="text-sm sm:text-base">
                          {selectedFile ? (
                            <div>
                              <p className="text-green-600 font-medium break-all text-center px-2">{selectedFile.name}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-gray-600">Click to upload document</p>
                              <p className="text-xs text-gray-500 mt-1">
                                PDF, DOC, DOCX, ODT, TXT, RTF (Max 10MB)
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                  {selectedFile && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        const input = document.getElementById('document-upload') as HTMLInputElement;
                        if (input) input.value = '';
                      }}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove file
                    </button>
                  )}
                </div>
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
                    <span className="text-xs sm:text-sm text-center truncate">
                      {uploadProgress || 'Registering...'}
                    </span>
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