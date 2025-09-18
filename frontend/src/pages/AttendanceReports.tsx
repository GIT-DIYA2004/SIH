import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  BarChart3, 
  Download, 
  Calendar as CalendarIcon, 
  ArrowLeft,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const AttendanceReports = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const classes = [
    { id: '1', name: 'Computer Science 101' },
    { id: '2', name: 'Data Structures' },
    { id: '3', name: 'Web Development' },
  ];

  const sessions = [
    { id: '1', name: 'Morning Session - Jan 15', date: '2024-01-15', attendance: 89 },
    { id: '2', name: 'Afternoon Session - Jan 14', date: '2024-01-14', attendance: 92 },
    { id: '3', name: 'Morning Session - Jan 12', date: '2024-01-12', attendance: 85 },
  ];

  const studentData = [
    { id: 1, name: 'Alice Johnson', email: 'alice@student.edu', present: 8, total: 10, percentage: 80 },
    { id: 2, name: 'Bob Smith', email: 'bob@student.edu', present: 9, total: 10, percentage: 90 },
    { id: 3, name: 'Carol Davis', email: 'carol@student.edu', present: 10, total: 10, percentage: 100 },
    { id: 4, name: 'David Wilson', email: 'david@student.edu', present: 7, total: 10, percentage: 70 },
    { id: 5, name: 'Emma Brown', email: 'emma@student.edu', present: 9, total: 10, percentage: 90 },
    { id: 6, name: 'Frank Miller', email: 'frank@student.edu', present: 6, total: 10, percentage: 60 },
  ];

  const exportData = (format: 'csv' | 'pdf') => {
    // Simulate export
    const fileName = `attendance_report_${new Date().toISOString().split('T')[0]}.${format}`;
    console.log(`Exporting ${fileName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/teacher/dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-bold text-foreground">Attendance Reports</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Report Filters
            </CardTitle>
            <CardDescription>
              Filter attendance data by class, session, and date range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={selectedSession} onValueChange={setSelectedSession}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Session" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    {sessions.map((session) => (
                      <SelectItem key={session.id} value={session.id}>
                        {session.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, 'MMM dd, yyyy') : 'From Date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, 'MMM dd, yyyy') : 'To Date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={() => exportData('csv')} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={() => exportData('pdf')} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground">32</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                  <p className="text-2xl font-bold text-foreground">10</p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Attendance</p>
                  <p className="text-2xl font-bold text-foreground">86%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Present Today</p>
                  <p className="text-2xl font-bold text-foreground">28</p>
                </div>
                <CheckCircle className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Attendance Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Student Attendance Details
            </CardTitle>
            <CardDescription>
              Individual student attendance records and statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-center">Present</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Percentage</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentData.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-muted-foreground">{student.email}</TableCell>
                    <TableCell className="text-center">{student.present}</TableCell>
                    <TableCell className="text-center">{student.total}</TableCell>
                    <TableCell className="text-center">
                      <span className={student.percentage >= 80 ? 'text-secondary' : student.percentage >= 70 ? 'text-primary' : 'text-destructive'}>
                        {student.percentage}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={student.percentage >= 80 ? 'default' : student.percentage >= 70 ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {student.percentage >= 80 ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Good
                          </>
                        ) : student.percentage >= 70 ? (
                          <>
                            <Clock className="w-3 h-3 mr-1" />
                            Average
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 mr-1" />
                            Low
                          </>
                        )}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Session History */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>
              Attendance statistics for recent class sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-foreground">{session.name}</h4>
                    <p className="text-sm text-muted-foreground">{session.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">
                      {session.attendance}%
                    </p>
                    <Badge 
                      variant={session.attendance >= 85 ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {session.attendance >= 85 ? 'Excellent' : 'Good'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AttendanceReports;