import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  BookOpen, 
  Plus, 
  ChevronDown, 
  ChevronRight,
  ArrowLeft,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Edit
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Curriculum = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('view');
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  const [newModule, setNewModule] = useState({ name: '', description: '' });

  const modules = [
    {
      id: 1,
      name: 'Introduction to Programming',
      description: 'Basic programming concepts, variables, and data types',
      status: 'completed',
      progress: 100,
      topics: [
        { id: 1, name: 'Variables and Data Types', completed: true },
        { id: 2, name: 'Control Structures', completed: true },
        { id: 3, name: 'Functions and Methods', completed: true },
      ],
      resources: [
        { id: 1, name: 'Lecture Slides - Week 1', type: 'pdf' },
        { id: 2, name: 'Programming Exercises', type: 'document' },
      ]
    },
    {
      id: 2,
      name: 'Data Structures',
      description: 'Arrays, lists, stacks, queues, and trees',
      status: 'in-progress',
      progress: 65,
      topics: [
        { id: 4, name: 'Arrays and Lists', completed: true },
        { id: 5, name: 'Stacks and Queues', completed: true },
        { id: 6, name: 'Trees and Graphs', completed: false },
      ],
      resources: [
        { id: 3, name: 'Data Structures Guide', type: 'pdf' },
        { id: 4, name: 'Implementation Examples', type: 'code' },
      ]
    },
    {
      id: 3,
      name: 'Algorithms',
      description: 'Sorting, searching, and optimization algorithms',
      status: 'not-started',
      progress: 0,
      topics: [
        { id: 7, name: 'Sorting Algorithms', completed: false },
        { id: 8, name: 'Search Algorithms', completed: false },
        { id: 9, name: 'Dynamic Programming', completed: false },
      ],
      resources: []
    },
    {
      id: 4,
      name: 'Web Development Basics',
      description: 'HTML, CSS, and JavaScript fundamentals',
      status: 'not-started',
      progress: 0,
      topics: [
        { id: 10, name: 'HTML Structure', completed: false },
        { id: 11, name: 'CSS Styling', completed: false },
        { id: 12, name: 'JavaScript Basics', completed: false },
      ],
      resources: []
    }
  ];

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-secondary" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-primary" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="text-xs">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="text-xs">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Not Started</Badge>;
    }
  };

  const addModule = () => {
    if (!newModule.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a module name.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Module Added",
      description: `${newModule.name} has been added to the curriculum.`,
    });

    setNewModule({ name: '', description: '' });
  };

  const overallProgress = modules.reduce((sum, module) => sum + module.progress, 0) / modules.length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-foreground">Smart Curriculum</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Modules</p>
                  <p className="text-2xl font-bold text-foreground">{modules.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl font-bold text-foreground">{Math.round(overallProgress)}%</p>
                </div>
                <div className="w-12 h-12 relative">
                  <div className="w-full h-full bg-muted rounded-full flex items-center justify-center">
                    <div className="text-xs font-bold text-foreground">{Math.round(overallProgress)}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">
                    {modules.filter(m => m.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="view">View Curriculum</TabsTrigger>
            <TabsTrigger value="manage">Manage Modules</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <div className="space-y-6">
              {modules.map((module) => (
                <Card key={module.id} className="shadow-card">
                  <Collapsible
                    open={expandedModules.includes(module.id)}
                    onOpenChange={() => toggleModule(module.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-smooth">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {expandedModules.includes(module.id) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                            {getStatusIcon(module.status)}
                            <div>
                              <CardTitle className="text-lg">{module.name}</CardTitle>
                              <CardDescription>{module.description}</CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {getStatusBadge(module.status)}
                            <div className="text-right min-w-16">
                              <p className="text-sm font-medium">{module.progress}%</p>
                              <Progress value={module.progress} className="w-16 h-2" />
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Topics */}
                          <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              Topics
                            </h4>
                            <div className="space-y-2">
                              {module.topics.map((topic) => (
                                <div
                                  key={topic.id}
                                  className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
                                >
                                  <span className="text-sm">{topic.name}</span>
                                  {topic.completed ? (
                                    <CheckCircle className="w-4 h-4 text-secondary" />
                                  ) : (
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Resources */}
                          <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Resources
                            </h4>
                            {module.resources.length > 0 ? (
                              <div className="space-y-2">
                                {module.resources.map((resource) => (
                                  <div
                                    key={resource.id}
                                    className="flex items-center gap-2 p-2 bg-muted/30 rounded-md hover:bg-muted/50 cursor-pointer"
                                  >
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">{resource.name}</span>
                                    <Badge variant="outline" className="text-xs ml-auto">
                                      {resource.type}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground p-2 bg-muted/30 rounded-md">
                                No resources added yet
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="manage">
            <div className="space-y-6">
              {/* Upload Syllabus */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Syllabus
                  </CardTitle>
                  <CardDescription>
                    Upload a syllabus file to automatically generate curriculum modules
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your syllabus file here, or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Add Module Manually */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Module
                  </CardTitle>
                  <CardDescription>
                    Manually create a new curriculum module
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="module-name">Module Name</Label>
                    <Input
                      id="module-name"
                      placeholder="Enter module name"
                      value={newModule.name}
                      onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="module-description">Description</Label>
                    <Textarea
                      id="module-description"
                      placeholder="Enter module description"
                      value={newModule.description}
                      onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                    />
                  </div>

                  <Button onClick={addModule} variant="hero">
                    <Plus className="w-4 h-4" />
                    Add Module
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Modules Management */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="w-5 h-5" />
                    Manage Existing Modules
                  </CardTitle>
                  <CardDescription>
                    Edit or remove existing curriculum modules
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {modules.map((module) => (
                      <div
                        key={module.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {getStatusIcon(module.status)}
                          <div>
                            <p className="font-medium">{module.name}</p>
                            <p className="text-xs text-muted-foreground">{module.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          {getStatusBadge(module.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Curriculum;
