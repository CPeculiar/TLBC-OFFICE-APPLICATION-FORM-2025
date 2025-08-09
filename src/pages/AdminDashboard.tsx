import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, ChevronLeft, ChevronRight, LogOut, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/services/AuthContext';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
  RefreshCw,
} from 'lucide-react';

import { 
  collection, 
  getDocs, 
  query,
  orderBy,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';

interface SubmissionData {
  id: string;
  submittedAt: any;
  [key: string]: any;
}

// Updated Firebase fetch functions
const fetchRegistrations = async (): Promise<SubmissionData[]> => {
  try {
    const q = query(
      collection(db, "applications-2025"), 
      orderBy("submittedAt", "desc")
    );
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        submittedAt: data.submittedAt // Keep original timestamp for formatting
      } as SubmissionData;
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};


const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState<SubmissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [loggingOut, setLoggingOut] = useState(false);
  const { toast } = useToast();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadAllData();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Error",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoggingOut(false);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [regResult] = await Promise.all([
        fetchRegistrations(),
      ]);
      
      setRegistrations(regResult);
      
      toast({
        title: "Data Loaded",
        description: "All submissions have been loaded successfully.",
      });
    } catch (error) {
      console.error("Error loading data:", error);
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

const downloadAllDataAsPDF = () => {
  const doc = new jsPDF();
  let yPos = 20;
  const pageHeight = doc.internal.pageSize.height;
  const marginLeft = 10;
  const marginRight = 10;
  const pageWidth = doc.internal.pageSize.width - marginLeft - marginRight;
  
  // Helper function to add a new page if needed
  const checkPageBreak = (requiredSpace = 30) => {
    if (yPos + requiredSpace > pageHeight - 20) {
      doc.addPage();
      yPos = 20;
    }
  };

  // Helper function to split text into multiple lines if needed
  const splitText = (text, maxWidth) => {
    if (!text) return [''];
    const textStr = text.toString();
    return doc.splitTextToSize(textStr, maxWidth);
  };

  // Helper function to draw detailed application data
  const drawDetailedApplication = (application, startY) => {
    let currentY = startY;
    const lineHeight = 5;
    const sectionSpacing = 8;
    
    // Application header
    doc.setFillColor(240, 240, 240);
    doc.rect(marginLeft, currentY, pageWidth, 8, 'F');
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`${application.firstName} ${application.lastName}`, marginLeft + 2, currentY + 6);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(`Submitted: ${formatDate(application.submittedAt)}`, marginLeft + 2, currentY + 12);
    currentY += 15;
    
    // Basic Information
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text('Personal Information:', marginLeft, currentY);
    currentY += lineHeight + 2;
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const basicInfo = [
      `Email: ${application.email || 'N/A'}`,
      `Phone: ${application.phone || 'N/A'}`,
      `Address: ${application.address || 'N/A'}`,
      `Gender: ${application.gender || 'N/A'}`,
      `Church: ${application.church || 'N/A'}`,
      `Zone: ${application.zone || 'N/A'}`
    ];
    
    basicInfo.forEach(info => {
      checkPageBreak(lineHeight + 2);
      doc.text(info, marginLeft + 5, currentY);
      currentY += lineHeight;
    });
    currentY += sectionSpacing;
    
    // Current Position
    if (application.officeNow) {
      checkPageBreak(20);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text('Current Position:', marginLeft, currentY);
      currentY += lineHeight + 2;
      
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      const positionLines = splitText(application.officeNow, pageWidth - 10);
      positionLines.forEach(line => {
        checkPageBreak(lineHeight + 2);
        doc.text(line, marginLeft + 5, currentY);
        currentY += lineHeight;
      });
      currentY += sectionSpacing;
    }
    
    // Achievements
    if (application.achievements) {
      checkPageBreak(20);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text('Achievements:', marginLeft, currentY);
      currentY += lineHeight + 2;
      
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      const achievementLines = splitText(application.achievements, pageWidth - 10);
      achievementLines.forEach(line => {
        checkPageBreak(lineHeight + 2);
        doc.text(line, marginLeft + 5, currentY);
        currentY += lineHeight;
      });
      currentY += sectionSpacing;
    }
    
    // Office Applying For
    checkPageBreak(20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text('Office Applying For:', marginLeft, currentY);
    currentY += lineHeight + 2;
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const officeLines = splitText(application.officeApply || 'N/A', pageWidth - 10);
    officeLines.forEach(line => {
      checkPageBreak(lineHeight + 2);
      doc.text(line, marginLeft + 5, currentY);
      currentY += lineHeight;
    });
    currentY += sectionSpacing;
    
    // Reasons for Applying
    checkPageBreak(20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text('Reasons for Applying:', marginLeft, currentY);
    currentY += lineHeight + 2;
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const reasonLines = splitText(application.reasonsApply || 'N/A', pageWidth - 10);
    reasonLines.forEach(line => {
      checkPageBreak(lineHeight + 2);
      doc.text(line, marginLeft + 5, currentY);
      currentY += lineHeight;
    });
    
    // Add separator line
    currentY += 10;
    checkPageBreak(5);
    doc.setDrawColor(200, 200, 200);
    doc.line(marginLeft, currentY, marginLeft + pageWidth, currentY);
    currentY += 10;
    
    yPos = currentY;
    return currentY;
  };
  
  // Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text('TLBC Leadership Position Applications Report', marginLeft, yPos);
  yPos += 15;
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, marginLeft, yPos);
  doc.text(`Total Applications: ${registrations.length}`, marginLeft, yPos + 8);
  yPos += 25;

  // Applications Section
  if (registrations.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text('Applications Details:', marginLeft, yPos);
    yPos += 15;

    registrations.forEach((application, index) => {
      checkPageBreak(50);
      yPos = drawDetailedApplication(application, yPos);
    });
  }

  // Save the PDF
  doc.save(`Leadership-Position-Applications-${new Date().toISOString().split('T')[0]}.pdf`);
  
  toast({
    title: "Download Complete",
    description: "All application data has been downloaded as PDF with complete details.",
  });
};

// 5. Add this pagination function after the download function
const getPaginatedData = (data) => {
  const filteredData = filterData(data);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredData.slice(startIndex, endIndex);
};

const getTotalPages = (data) => {
  return Math.ceil(filterData(data).length / itemsPerPage);
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
        <div className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <p className="break-words"><strong>Phone:</strong> {registration.phone}</p>
              <p className="break-words"><strong>Address:</strong> {registration.address}</p>
              <p className="break-words"><strong>Gender:</strong> {registration.gender}</p>
            </div>
            <div className="space-y-1">
              <p className="break-words"><strong>Church:</strong> {registration.church}</p>
              <p className="break-words"><strong>Zone:</strong> {registration.zone}</p>
            </div>
          </div>
          
          {/* Current Position */}
          {registration.officeNow && (
            <div className="border-t pt-3">
              <p className="text-xs sm:text-sm"><strong>Current Position:</strong></p>
              <p className="text-xs sm:text-sm text-gray-700 mt-1 whitespace-pre-wrap break-words">{registration.officeNow}</p>
            </div>
          )}
          
          {/* Achievements */}
          {registration.achievements && (
            <div className="border-t pt-3">
              <p className="text-xs sm:text-sm"><strong>Achievements:</strong></p>
              <p className="text-xs sm:text-sm text-gray-700 mt-1 whitespace-pre-wrap break-words">{registration.achievements}</p>
            </div>
          )}
          
          {/* Office Applying For */}
          <div className="border-t pt-3">
            <p className="text-xs sm:text-sm"><strong>Office Applying For:</strong></p>
            <p className="text-xs sm:text-sm text-gray-700 mt-1 whitespace-pre-wrap break-words">{registration.officeApply}</p>
          </div>
          
          {/* Reasons for Applying */}
          <div className="border-t pt-3">
            <p className="text-xs sm:text-sm"><strong>Reasons for Applying:</strong></p>
            <p className="text-xs sm:text-sm text-gray-700 mt-1 whitespace-pre-wrap break-words">{registration.reasonsApply}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PaginationControls = ({ data, currentPage, setCurrentPage }) => {
  const totalPages = getTotalPages(data);
  
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6 px-2">
      <div className="text-sm text-muted-foreground">
        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filterData(data).length)} to{' '}
        {Math.min(currentPage * itemsPerPage, filterData(data).length)} of {filterData(data).length} entries
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="text-xs px-2 py-1"
        >
          <ChevronLeft className="w-3 h-3 mr-1" />
          Previous
        </Button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
                className="text-xs px-2 py-1 min-w-[32px]"
              >
                {pageNum}
              </Button>
            );
          })}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="text-xs px-2 py-1"
        >
          Next
          <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  );
};

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
        description="Manage and view all submissions"
      />

      <div className="container mx-auto px-4">
        {/* Admin Header with User Info and Logout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-4 mb-6 shadow-sm border">
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Welcome back, Admin</p>
              <p className="text-sm text-gray-600">{currentUser?.email}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-sm border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 self-start sm:self-auto"
            disabled={loggingOut}
          >
            {loggingOut ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </>
            )}
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{registrations.length}</div>
              <p className="text-xs text-muted-foreground">
                Leadership Applications
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in">  
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Leaders</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground shrink-0" />
            </CardHeader>
            <CardContent> 
              <div className="text-xl sm:text-2xl font-bold">
                {registrations.filter(r => r.officeNow && r.officeNow.trim()).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Current Office Holders
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">With Achievements</CardTitle>
              <Handshake className="h-4 w-4 text-muted-foreground shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {registrations.filter(r => r.achievements && r.achievements.trim()).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Listed Achievements
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {registrations.filter(r => {
                  const submittedDate = r.submittedAt?.toDate ? r.submittedAt.toDate() : new Date(r.submittedAt);
                  const daysDiff = (new Date().getTime() - submittedDate.getTime()) / (1000 * 3600 * 24);
                  return daysDiff <= 7;
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Last 7 Days
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="pl-10 text-sm"
            />
          </div>
          <div className="flex gap-2 shrink-0">
            <Button onClick={downloadAllDataAsPDF} variant="default" className="text-sm px-3 sm:px-4">
              <Download className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Download PDF</span>
              <span className="xs:hidden">PDF</span>
            </Button>
            <Button onClick={loadAllData} variant="outline" className="text-sm px-3 sm:px-4">
              <RefreshCw className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Refresh</span>
              <span className="xs:hidden">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Submissions Tabs */}
        <Tabs defaultValue="registrations" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="registrations" className="text-xs sm:text-sm px-2 py-2 data-[state=active]:text-xs data-[state=active]:sm:text-sm">
              <span className="hidden sm:inline">Applications ({registrations.length})</span>
              <span className="sm:hidden">Reg ({registrations.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="registrations" className="mt-4 sm:mt-6">
            <div className="space-y-4">
              {getPaginatedData(registrations).length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Users className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm sm:text-base">No Applications found</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {getPaginatedData(registrations).map((registration) => (
                    <RegistrationCard key={registration.id} registration={registration} />
                  ))}
                  <PaginationControls 
                    data={registrations} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage} 
                  />
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;