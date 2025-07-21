import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { fetchApplications, fetchPartnerships, fetchContactForms } from '@/services/firestore';
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
      const [regResult, partResult, contactResult] = await Promise.all([
        fetchApplications(),
        fetchPartnerships(),
        fetchContactForms()
      ]);

      if (regResult.success) setRegistrations(regResult.data);
      if (partResult.success) setPartnerships(partResult.data);
      if (contactResult.success) setContactForms(contactResult.data);

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
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              {registration.firstName} {registration.lastName}
            </CardTitle>
            <CardDescription>{registration.email}</CardDescription>
          </div>
          <Badge variant="outline">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(registration.submittedAt)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Phone:</strong> {registration.phone}</p>
            <p><strong>City:</strong> {registration.city}</p>
            <p><strong>Date of Birth:</strong> {registration.dateOfBirth}</p>
          </div>
          <div>
            <p><strong>Emergency Contact:</strong> {registration.emergencyContact}</p>
            <p><strong>Emergency Phone:</strong> {registration.emergencyPhone}</p>
            {registration.previousChurch && (
              <p><strong>Previous Church:</strong> {registration.previousChurch}</p>
            )}
          </div>
        </div>
        {registration.ministryInterests && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">Ministry Interests:</p>
            <p className="text-sm text-muted-foreground">{registration.ministryInterests}</p>
          </div>
        )}
        {registration.testimony && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">Testimony:</p>
            <p className="text-sm text-muted-foreground">{registration.testimony}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const PartnershipCard = ({ partnership }: { partnership: SubmissionData }) => (
    <Card className="mb-4 hover:shadow-md smooth-transition">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{partnership.organizationName}</CardTitle>
            <CardDescription>{partnership.contactPersonName} • {partnership.email}</CardDescription>
          </div>
          <Badge variant="outline">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(partnership.submittedAt)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p><strong>Type:</strong> {partnership.organizationType}</p>
            <p><strong>Partnership:</strong> {partnership.partnershipType}</p>
            <p><strong>Phone:</strong> {partnership.phone}</p>
          </div>
          <div>
            <p><strong>Address:</strong> {partnership.address}</p>
            {partnership.website && (
              <p><strong>Website:</strong> {partnership.website}</p>
            )}
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-1">Mission Statement:</p>
            <p className="text-sm text-muted-foreground">{partnership.missionStatement}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Partnership Goals:</p>
            <p className="text-sm text-muted-foreground">{partnership.partnershipGoals}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Expected Contribution:</p>
            <p className="text-sm text-muted-foreground">{partnership.expectedContribution}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ContactCard = ({ contact }: { contact: SubmissionData }) => (
    <Card className="mb-4 hover:shadow-md smooth-transition">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              {contact.firstName} {contact.lastName}
            </CardTitle>
            <CardDescription>{contact.email} • {contact.subject}</CardDescription>
          </div>
          <Badge variant="outline">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(contact.submittedAt)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <p><strong>Message Type:</strong> {contact.messageType}</p>
          </div>
          <div>
            <p><strong>Preferred Contact:</strong> {contact.preferredContact}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-1">Message:</p>
          <p className="text-sm text-muted-foreground">{contact.message}</p>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <PageHeader
          title="Admin Dashboard"
          description="Loading submission data..."
        />
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading all submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <PageHeader
        title="Admin Dashboard"
        description="Manage and view all church submissions"
      />

      <div className="container mx-auto px-4">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registrations.length}</div>
              <p className="text-xs text-muted-foreground">
                Total church registrations
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partnerships</CardTitle>
              <Handshake className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{partnerships.length}</div>
              <p className="text-xs text-muted-foreground">
                Partnership applications
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contactForms.length}</div>
              <p className="text-xs text-muted-foreground">
                Messages and inquiries
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search all submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={loadAllData} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Submissions Tabs */}
        <Tabs defaultValue="registrations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="registrations">Registrations ({registrations.length})</TabsTrigger>
            <TabsTrigger value="partnerships">Partnerships ({partnerships.length})</TabsTrigger>
            <TabsTrigger value="contacts">Contact Forms ({contactForms.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="registrations" className="mt-6">
            <div className="space-y-4">
              {filterData(registrations).length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No registrations found</p>
                  </CardContent>
                </Card>
              ) : (
                filterData(registrations).map((registration) => (
                  <RegistrationCard key={registration.id} registration={registration} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="partnerships" className="mt-6">
            <div className="space-y-4">
              {filterData(partnerships).length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Handshake className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No partnership applications found</p>
                  </CardContent>
                </Card>
              ) : (
                filterData(partnerships).map((partnership) => (
                  <PartnershipCard key={partnership.id} partnership={partnership} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="mt-6">
            <div className="space-y-4">
              {filterData(contactForms).length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No contact forms found</p>
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