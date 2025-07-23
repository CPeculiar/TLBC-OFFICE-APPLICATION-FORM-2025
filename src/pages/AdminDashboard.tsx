import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { fetchApplications, fetchPartnerships } from '@/services/firestore';
import PageHeader from '@/components/PageHeader';
import { 
  Users, 
  Handshake, 
  Mail, 
  Search, 
  Calendar, 
  Filter,
  Download,
  Loader2,
  RefreshCw
} from 'lucide-react';

interface SubmissionData {
  id: string;
  submittedAt: any;
  [key: string]: any;
}

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState<SubmissionData[]>([]);
  const [partnerships, setPartnerships] = useState<SubmissionData[]>([]);
  const [contactForms, setContactForms] = useState<SubmissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [regResult, partResult] = await Promise.all([
        fetchApplications(),
        fetchPartnerships(),
      ]);
      
      toast({
        title: "Data Loaded",
        description: "All submissions have been loaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error Loading Data",
        description: "Failed to load submissions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
    } catch {
      return 'Invalid Date';
    }
  };

  const filterData = (data: SubmissionData[]) => {
    if (!searchTerm) return data;
    return data.filter(item => 
      Object.values(item).some(value => 
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const RegistrationCard = ({ registration }: { registration: SubmissionData }) => (
    <Card className="mb-4 hover:shadow-md smooth-transition">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base sm:text-lg break-words">
              {registration.firstName} {registration.lastName}
            </CardTitle>
            <CardDescription className="break-all text-xs sm:text-sm">{registration.email}</CardDescription>
          </div>
          <Badge variant="outline" className="self-start shrink-0 text-xs">
            <Calendar className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
            <span className="hidden sm:inline">{formatDate(registration.submittedAt)}</span>
            <span className="sm:hidden">{formatDate(registration.submittedAt).split(' at ')[0]}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="space-y-1">
            <p className="break-words"><strong>Phone:</strong> {registration.phone}</p>
            <p className="break-words"><strong>City:</strong> {registration.city}</p>
            <p className="break-words"><strong>Date of Birth:</strong> {registration.dateOfBirth}</p>
          </div>
          <div className="space-y-1">
            <p className="break-words"><strong>Emergency Contact:</strong> {registration.emergencyContact}</p>
            <p className="break-words"><strong>Emergency Phone:</strong> {registration.emergencyPhone}</p>
            {registration.previousChurch && (
              <p className="break-words"><strong>Previous Church:</strong> {registration.previousChurch}</p>
            )}
          </div>
        </div>
        {registration.ministryInterests && (
          <div className="mt-3 sm:mt-4">
            <p className="text-xs sm:text-sm font-medium mb-1">Ministry Interests:</p>
            <p className="text-xs sm:text-sm text-muted-foreground break-words">{registration.ministryInterests}</p>
          </div>
        )}
        {registration.testimony && (
          <div className="mt-3 sm:mt-4">
            <p className="text-xs sm:text-sm font-medium mb-1">Testimony:</p>
            <p className="text-xs sm:text-sm text-muted-foreground break-words">{registration.testimony}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const PartnershipCard = ({ partnership }: { partnership: SubmissionData }) => (
    <Card className="mb-4 hover:shadow-md smooth-transition">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base sm:text-lg break-words">{partnership.organizationName}</CardTitle>
            <CardDescription className="text-xs sm:text-sm break-words">{partnership.contactPersonName} • {partnership.email}</CardDescription>
          </div>
          <Badge variant="outline" className="self-start shrink-0 text-xs">
            <Calendar className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
            <span className="hidden sm:inline">{formatDate(partnership.submittedAt)}</span>
            <span className="sm:hidden">{formatDate(partnership.submittedAt).split(' at ')[0]}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4">
          <div className="space-y-1">
            <p className="break-words"><strong>Type:</strong> {partnership.organizationType}</p>
            <p className="break-words"><strong>Partnership:</strong> {partnership.partnershipType}</p>
            <p className="break-words"><strong>Phone:</strong> {partnership.phone}</p>
          </div>
          <div className="space-y-1">
            <p className="break-words"><strong>Address:</strong> {partnership.address}</p>
            {partnership.website && (
              <p className="break-all"><strong>Website:</strong> {partnership.website}</p>
            )}
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3">
          <div>
            <p className="text-xs sm:text-sm font-medium mb-1">Mission Statement:</p>
            <p className="text-xs sm:text-sm text-muted-foreground break-words">{partnership.missionStatement}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium mb-1">Partnership Goals:</p>
            <p className="text-xs sm:text-sm text-muted-foreground break-words">{partnership.partnershipGoals}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium mb-1">Expected Contribution:</p>
            <p className="text-xs sm:text-sm text-muted-foreground break-words">{partnership.expectedContribution}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ContactCard = ({ contact }: { contact: SubmissionData }) => (
    <Card className="mb-4 hover:shadow-md smooth-transition">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base sm:text-lg break-words">
              {contact.firstName} {contact.lastName}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm break-words">{contact.email} • {contact.subject}</CardDescription>
          </div>
          <Badge variant="outline" className="self-start shrink-0 text-xs">
            <Calendar className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
            <span className="hidden sm:inline">{formatDate(contact.submittedAt)}</span>
            <span className="sm:hidden">{formatDate(contact.submittedAt).split(' at ')[0]}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4">
          <div className="space-y-1">
            <p className="break-words"><strong>Phone:</strong> {contact.phone}</p>
            <p className="break-words"><strong>Message Type:</strong> {contact.messageType}</p>
          </div>
          <div className="space-y-1">
            <p className="break-words"><strong>Preferred Contact:</strong> {contact.preferredContact}</p>
          </div>
        </div>
        <div>
          <p className="text-xs sm:text-sm font-medium mb-1">Message:</p>
          <p className="text-xs sm:text-sm text-muted-foreground break-words">{contact.message}</p>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen py-6 sm:py-12">
        <PageHeader
          title="Admin Dashboard"
          description="Loading submission data..."
        />
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm sm:text-base">Loading all submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-12">
      <PageHeader
        title="Admin Dashboard"
        description="Manage and view all church submissions"
      />

      <div className="container mx-auto px-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{registrations.length}</div>
              <p className="text-xs text-muted-foreground">
                Total church registrations
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partnerships</CardTitle>
              <Handshake className="h-4 w-4 text-muted-foreground shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{partnerships.length}</div>
              <p className="text-xs text-muted-foreground">
                Partnership applications
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in sm:col-span-2 lg:col-span-1" style={{ animationDelay: '200ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{contactForms.length}</div>
              <p className="text-xs text-muted-foreground">
                Messages and inquiries
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search all submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
          <Button onClick={loadAllData} variant="outline" className="shrink-0 text-sm px-3 sm:px-4">
            <RefreshCw className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Refresh</span>
            <span className="xs:hidden">Refresh</span>
          </Button>
        </div>

        {/* Submissions Tabs */}
        <Tabs defaultValue="registrations" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="registrations" className="text-xs sm:text-sm px-2 py-2 data-[state=active]:text-xs data-[state=active]:sm:text-sm">
              <span className="hidden sm:inline">Registrations ({registrations.length})</span>
              <span className="sm:hidden">Reg ({registrations.length})</span>
            </TabsTrigger>
            <TabsTrigger value="partnerships" className="text-xs sm:text-sm px-2 py-2 data-[state=active]:text-xs data-[state=active]:sm:text-sm">
              <span className="hidden sm:inline">Partnerships ({partnerships.length})</span>
              <span className="sm:hidden">Part ({partnerships.length})</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="text-xs sm:text-sm px-2 py-2 data-[state=active]:text-xs data-[state=active]:sm:text-sm">
              <span className="hidden sm:inline">Contact Forms ({contactForms.length})</span>
              <span className="sm:hidden">Contact ({contactForms.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="registrations" className="mt-4 sm:mt-6">
            <div className="space-y-4">
              {filterData(registrations).length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Users className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm sm:text-base">No registrations found</p>
                  </CardContent>
                </Card>
              ) : (
                filterData(registrations).map((registration) => (
                  <RegistrationCard key={registration.id} registration={registration} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="partnerships" className="mt-4 sm:mt-6">
            <div className="space-y-4">
              {filterData(partnerships).length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Handshake className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm sm:text-base">No partnership applications found</p>
                  </CardContent>
                </Card>
              ) : (
                filterData(partnerships).map((partnership) => (
                  <PartnershipCard key={partnership.id} partnership={partnership} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="mt-4 sm:mt-6">
            <div className="space-y-4">
              {filterData(contactForms).length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Mail className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm sm:text-base">No contact forms found</p>
                  </CardContent>
                </Card>
              ) : (
                filterData(contactForms).map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;