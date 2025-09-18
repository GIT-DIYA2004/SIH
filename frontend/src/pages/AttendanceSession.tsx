import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  QrCode, 
  MapPin, 
  Clock, 
  Users, 
  StopCircle, 
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  MapIcon
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AttendanceSession = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const { toast } = useToast();
  
  const [selectedClass, setSelectedClass] = useState(classId || '');
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('50');
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [countdown, setCountdown] = useState(15);
  const [attendedStudents, setAttendedStudents] = useState(0);
  const [totalStudents, setTotalStudents] = useState(32);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  const classes = [
    { id: '1', name: 'Computer Science 101', students: 32 },
    { id: '2', name: 'Data Structures', students: 28 },
    { id: '3', name: 'Web Development', students: 25 },
  ];

  // Generate random QR code
  const generateQRCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 15);
    setQrCode(randomCode);
    setCountdown(15);
  };

  // Auto-detect location (simulated)
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
          toast({
            title: "Location Detected",
            description: "Your current location has been set for the session.",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to detect location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  // Start session
  const startSession = () => {
    if (!selectedClass || !location) {
      toast({
        title: "Missing Information",
        description: "Please select a class and set location.",
        variant: "destructive",
      });
      return;
    }

    const newSessionId = `SESSION_${Date.now()}`;
    setSessionId(newSessionId);
    setSessionActive(true);
    setSessionStartTime(new Date());
    generateQRCode();
    
    toast({
      title: "Session Started",
      description: "Students can now scan the QR code to mark attendance.",
    });
  };

  // End session
  const endSession = () => {
    setSessionActive(false);
    setSessionId('');
    setQrCode('');
    
    toast({
      title: "Session Ended",
      description: `Attendance recorded for ${attendedStudents} out of ${totalStudents} students.`,
    });
  };

  // QR code rotation effect
  useEffect(() => {
    if (sessionActive && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (sessionActive && countdown === 0) {
      generateQRCode();
      // Simulate some students joining
      if (Math.random() > 0.7) {
        setAttendedStudents(prev => Math.min(prev + Math.floor(Math.random() * 3) + 1, totalStudents));
      }
    }
  }, [sessionActive, countdown]);

  const selectedClassData = classes.find(c => c.id === selectedClass);
  const attendanceRate = totalStudents > 0 ? (attendedStudents / totalStudents) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/teacher/dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-bold text-foreground">Attendance Session</h1>
            {sessionActive && (
              <Badge variant="default" className="animate-pulse">
                <Clock className="w-3 h-3 mr-1" />
                Active Session
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Session Setup */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Session Setup
                </CardTitle>
                <CardDescription>
                  Configure your attendance session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="class-select">Select Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name} ({cls.students} students)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      placeholder="Auto-detect or enter manually"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={detectLocation}
                    >
                      <MapIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="radius">Allowed Radius (meters)</Label>
                  <Input
                    id="radius"
                    type="number"
                    placeholder="50"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                  />
                </div>

                {!sessionActive ? (
                  <Button
                    onClick={startSession}
                    variant="hero"
                    className="w-full"
                    size="lg"
                  >
                    <QrCode className="w-4 h-4" />
                    Start Session
                  </Button>
                ) : (
                  <Button
                    onClick={endSession}
                    variant="destructive"
                    className="w-full"
                    size="lg"
                  >
                    <StopCircle className="w-4 h-4" />
                    End Session
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Session Info */}
            {sessionActive && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-sm">Session Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Session ID:</span>
                    <span className="font-mono">{sessionId.slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Started:</span>
                    <span>{sessionStartTime?.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="truncate max-w-32">{location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Radius:</span>
                    <span>{radius}m</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* QR Code Display */}
          <div className="lg:col-span-2 space-y-6">
            {sessionActive ? (
              <>
                <Card className="shadow-card">
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                      <QrCode className="w-5 h-5" />
                      Attendance QR Code
                    </CardTitle>
                    <CardDescription>
                      Students should scan this code to mark attendance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-6">
                    {/* QR Code Simulation */}
                    <div className="flex justify-center">
                      <div className="w-64 h-64 bg-card border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-hero opacity-10 animate-pulse-glow"></div>
                        <div className="text-center z-10">
                          <QrCode className="w-24 h-24 text-primary mx-auto mb-4" />
                          <p className="text-xs text-muted-foreground font-mono">
                            {qrCode}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Countdown */}
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        New QR code in {countdown} seconds
                      </p>
                      <Progress value={(15 - countdown) / 15 * 100} className="w-full" />
                    </div>
                  </CardContent>
                </Card>

                {/* Attendance Stats */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Live Attendance</span>
                      <Badge variant={attendanceRate >= 80 ? "default" : "secondary"}>
                        {attendanceRate.toFixed(0)}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary" />
                        Present: {attendedStudents}
                      </span>
                      <span className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-muted-foreground" />
                        Absent: {totalStudents - attendedStudents}
                      </span>
                    </div>
                    <Progress value={attendanceRate} className="w-full" />
                    <p className="text-center text-sm text-muted-foreground">
                      {selectedClassData?.name} - {totalStudents} total students
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-card">
                <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
                  <QrCode className="w-16 h-16 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">No Active Session</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Configure your session settings and click "Start Session" to generate a QR code for attendance.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendanceSession;