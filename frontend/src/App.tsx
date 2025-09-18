import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import AttendanceSession from "./pages/AttendanceSession";
import StudentAttendance from "./pages/StudentAttendance";
import AttendanceReports from "./pages/AttendanceReports";
import Curriculum from "./pages/Curriculum";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/session/:classId?" element={<AttendanceSession />} />
          <Route path="/teacher/reports" element={<AttendanceReports />} />
          <Route path="/student/attendance" element={<StudentAttendance />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
