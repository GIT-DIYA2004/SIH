import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  QrCode, 
  BarChart3, 
  BookOpen, 
  Settings, 
  LogOut,
  Clock,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const classes = [
    {
      id: 1,
      name: "Computer Science 101",
      students: 32,
      lastSession: "2 hours ago",
      attendance: 89,
      location: "Lab A-201"
    },
    {
      id: 2,
      name: "Data Structures",
      students: 28,
      lastSession: "1 day ago",
      attendance: 92,
      location: "Room B-105"
    },
    {
      id: 3,
      name: "Web Development",
      students: 25,
      lastSession: "3 days ago",
      attendance: 85,
      location: "Lab C-301"
    }
  ];

  const startAttendanceSession = (classId: number) => {
    toast({
      title: "Starting Session",
      description: "Preparing attendance session...",
    });
    navigate(`/teacher/session/${classId}`);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Teacher Dashboard</h1>
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
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="Teacher" />
                <AvatarFallback className="bg-gradient-hero text-primary-foreground">
                  TD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Dr. Smith!
          </h2>
          <p className="text-muted-foreground">
            Manage your classes and track attendance with ease.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground">85</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Attendance</p>
                  <p className="text-2xl font-bold text-foreground">89%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes List */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-foreground">Your Classes</h3>
            <Button 
              variant="hero"
              onClick={() => navigate('/teacher/session')}
            >
              <QrCode className="w-4 h-4" />
              Start New Session
            </Button>
          </div>

          <div className="grid gap-6">
            {classes.map((cls) => (
              <Card key={cls.id} className="shadow-card hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{cls.name}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {cls.students} students
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {cls.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Last session: {cls.lastSession}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={cls.attendance >= 90 ? "default" : "secondary"}
                      className="text-sm"
                    >
                      {cls.attendance}% attendance
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => startAttendanceSession(cls.id)}
                      variant="hero"
                      size="sm"
                    >
                      <QrCode className="w-4 h-4" />
                      Start Attendance
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/teacher/reports')}
                    >
                      <BarChart3 className="w-4 h-4" />
                      View Reports
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/curriculum')}
                    >
                      <BookOpen className="w-4 h-4" />
                      Curriculum
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;