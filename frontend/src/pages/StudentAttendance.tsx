import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  QrCode, 
  Camera, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Loader2,
  ArrowLeft,
  Settings,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StudentAttendance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    sessionInfo?: {
      className: string;
      timestamp: string;
      location: string;
    };
  } | null>(null);
  const [recentAttendance, setRecentAttendance] = useState([
    {
      id: 1,
      className: 'Computer Science 101',
      timestamp: '2024-01-15 10:30 AM',
      status: 'present'
    },
    {
      id: 2,
      className: 'Data Structures',
      timestamp: '2024-01-14 02:15 PM',
      status: 'present'
    },
    {
      id: 3,
      className: 'Web Development',
      timestamp: '2024-01-12 11:45 AM',
      status: 'present'
    }
  ]);

  const simulateQRScan = () => {
    setScanning(true);
    setScanResult(null);
    
    setTimeout(() => {
      requestLocation();
    }, 2000);
  };

  const requestLocation = () => {
    setLocationStatus('requesting');
    
    // Simulate geolocation
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      
      if (success) {
        setLocationStatus('granted');
        processAttendance();
      } else {
        setLocationStatus('denied');
        setScanning(false);
        setScanResult({
          success: false,
          message: 'Location access denied. Please enable location services to mark attendance.'
        });
      }
    }, 2000);
  };

  const processAttendance = () => {
    setTimeout(() => {
      const withinRadius = Math.random() > 0.2; // 80% within radius
      
      if (withinRadius) {
        const newAttendance = {
          id: Date.now(),
          className: 'Computer Science 101',
          timestamp: new Date().toLocaleString(),
          status: 'present' as const
        };
        
        setRecentAttendance(prev => [newAttendance, ...prev.slice(0, 4)]);
        setScanResult({
          success: true,
          message: 'Attendance marked successfully!',
          sessionInfo: {
            className: 'Computer Science 101',
            timestamp: new Date().toLocaleString(),
            location: 'Lab A-201'
          }
        });
        
        toast({
          title: "Attendance Marked",
          description: "You have been marked present for Computer Science 101.",
        });
      } else {
        setScanResult({
          success: false,
          message: 'You are outside the allowed radius for this class. Please move closer to the classroom.'
        });
      }
      
      setScanning(false);
      setLocationStatus('idle');
    }, 1500);
  };

  const handleManualEntry = () => {
    if (!manualCode.trim()) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid session code.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate manual code processing
    toast({
      title: "Processing Code",
      description: "Verifying session code...",
    });
    
    setTimeout(() => {
      setScanResult({
        success: true,
        message: 'Attendance marked via manual code entry!',
        sessionInfo: {
          className: 'Computer Science 101',
          timestamp: new Date().toLocaleString(),
          location: 'Lab A-201'
        }
      });
      setManualCode('');
    }, 2000);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Student Portal</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/profile')}
              >
                <Settings className="w-4 h-4" />
                Profile
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* QR Scanner */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Camera className="w-5 h-5" />
                  Mark Attendance
                </CardTitle>
                <CardDescription>
                  Scan the QR code displayed by your teacher
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Camera View Simulation */}
                <div className="flex justify-center">
                  <div className="w-80 h-80 bg-muted border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {scanning ? (
                      <div className="text-center">
                        {locationStatus === 'idle' || locationStatus === 'requesting' ? (
                          <>
                            <div className="w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-sm text-muted-foreground">
                              {locationStatus === 'requesting' ? 'Requesting location...' : 'Scanning QR code...'}
                            </p>
                          </>
                        ) : locationStatus === 'granted' ? (
                          <>
                            <Loader2 className="w-12 h-12 text-secondary animate-spin mx-auto mb-4" />
                            <p className="text-sm text-muted-foreground">
                              Verifying location...
                            </p>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                            <p className="text-sm text-destructive">
                              Location access denied
                            </p>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground">
                          Camera preview will appear here
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={simulateQRScan}
                    disabled={scanning}
                    variant="scanner"
                    size="lg"
                    className="px-8"
                  >
                    {scanning ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <QrCode className="w-4 h-4" />
                        Scan QR Code
                      </>
                    )}
                  </Button>
                </div>

                {/* Result Display */}
                {scanResult && (
                  <Alert variant={scanResult.success ? "default" : "destructive"} className="animate-fade-in">
                    {scanResult.success ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>
                      {scanResult.message}
                      {scanResult.sessionInfo && (
                        <div className="mt-2 space-y-1 text-xs">
                          <p><strong>Class:</strong> {scanResult.sessionInfo.className}</p>
                          <p><strong>Time:</strong> {scanResult.sessionInfo.timestamp}</p>
                          <p><strong>Location:</strong> {scanResult.sessionInfo.location}</p>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Manual Entry Fallback */}
                <div className="border-t pt-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        Can't scan? Enter the session code manually
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label htmlFor="manual-code" className="sr-only">Session Code</Label>
                        <Input
                          id="manual-code"
                          placeholder="Enter session code"
                          value={manualCode}
                          onChange={(e) => setManualCode(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={handleManualEntry}
                        variant="outline"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Attendance */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Attendance
                </CardTitle>
                <CardDescription>
                  Your attendance history
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAttendance.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {record.className}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {record.timestamp}
                      </p>
                    </div>
                    <Badge
                      variant={record.status === 'present' ? 'default' : 'destructive'}
                      className="ml-2"
                    >
                      {record.status === 'present' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {record.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate('/curriculum')}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  View Curriculum
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate('/profile')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            {/* Help */}
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm space-y-2">
                    <p className="font-medium">Need Help?</p>
                    <p className="text-muted-foreground text-xs">
                      Make sure location services are enabled and you're within the classroom radius to mark attendance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentAttendance;