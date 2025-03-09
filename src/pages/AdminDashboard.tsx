
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase, AboutRow } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

type TableName = 'certificate' | 'project' | 'Achievement' | 'Skill';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Check authentication on load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      toast.error("Please login to access admin panel");
      navigate("/admin/login");
    }
  };

  // Achievement form state
  const [achievementTitle, setAchievementTitle] = useState("");
  const [achievementDate, setAchievementDate] = useState("");
  const [achievementDesc, setAchievementDesc] = useState("");

  // Skill form state
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState("");
  const [skillProficiency, setSkillProficiency] = useState(0);

  // Certificate form state
  const [certTitle, setCertTitle] = useState("");
  const [certDescription, setCertDescription] = useState("");
  const [certImage, setCertImage] = useState<File | null>(null);

  // Project form state
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [projectTags, setProjectTags] = useState<string>("");

  // About form state
  const [aboutPhoto, setAboutPhoto] = useState<File | null>(null);
  const [aboutResume, setAboutResume] = useState<File | null>(null);
  const [aboutDescription, setAboutDescription] = useState("");

  // Lists for display and management
  const [certificates, setCertificates] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [aboutData, setAboutData] = useState<AboutRow | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchCertificates = await supabase.from('certificate').select('*');
    const fetchProjects = await supabase.from('project').select('*');
    const fetchAchievements = await supabase.from('Achievement').select('*');
    const fetchSkills = await supabase.from('Skill').select('*');
    
    // Use the custom query for the about table
    const { data: aboutResult } = await supabase
      .from('about')
      .select('*')
      .single();

    if (fetchCertificates.data) setCertificates(fetchCertificates.data);
    if (fetchProjects.data) setProjects(fetchProjects.data);
    if (fetchAchievements.data) setAchievements(fetchAchievements.data);
    if (fetchSkills.data) setSkills(fetchSkills.data);
    if (aboutResult) setAboutData(aboutResult as AboutRow);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const uploadImage = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${path}/${Math.random()}.${fileExt}`;
    const { error: uploadError, data } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const uploadResume = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `resumes/${Math.random()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from('portfolio-files')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-files')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleAchievementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from('Achievement').insert({
        title: achievementTitle,
        date: achievementDate,
        description: achievementDesc,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      toast.success("Achievement added successfully!");
      fetchData();
      setAchievementTitle("");
      setAchievementDate("");
      setAchievementDesc("");
    } catch (error) {
      toast.error("Failed to add achievement");
      console.error(error);
    }
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('Skill').insert({
        name: skillName,
        category: skillCategory,
        proficiency: skillProficiency,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      if (error) throw error;
      
      toast.success("Skill added successfully!");
      fetchData();
      setSkillName("");
      setSkillCategory("technical");
      setSkillProficiency(0);
    } catch (error: any) {
      toast.error("Failed to add skill: " + error.message);
      console.error(error);
    }
  };

  const handleCertificateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!certImage) {
        toast.error("Please select an image");
        return;
      }
      
      const imageUrl = await uploadImage(certImage, 'certificates');
      
      const { error } = await supabase.from('certificate').insert({
        title: certTitle,
        description: certDescription,
        image_url: imageUrl,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      if (error) throw error;

      toast.success("Certificate added successfully!");
      fetchData();
      setCertTitle("");
      setCertDescription("");
      setCertImage(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to add certificate");
      console.error(error);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!projectImage) {
        toast.error("Please select an image");
        return;
      }
      
      const imageUrl = await uploadImage(projectImage, 'projects');
      
      const tagsArray = projectTags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      const { error } = await supabase.from('project').insert({
        title: projectTitle,
        description: projectDescription,
        image_url: imageUrl,
        tags: tagsArray,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      if (error) throw error;

      toast.success("Project added successfully!");
      fetchData();
      setProjectTitle("");
      setProjectDescription("");
      setProjectImage(null);
      setProjectTags("");
    } catch (error: any) {
      toast.error(error.message || "Failed to add project");
      console.error(error);
    }
  };

  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let photoUrl = aboutData?.photo_url || null;
      let resumeUrl = aboutData?.resume_url || null;

      if (aboutPhoto) {
        photoUrl = await uploadImage(aboutPhoto, 'profile');
      }

      if (aboutResume) {
        resumeUrl = await uploadResume(aboutResume);
      }

      if (aboutData?.id) {
        // Update existing record
        const { error } = await supabase
          .from('about')
          .update({
            description: aboutDescription || aboutData.description,
            photo_url: photoUrl,
            resume_url: resumeUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', aboutData.id);

        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('about')
          .insert({
            description: aboutDescription,
            photo_url: photoUrl,
            resume_url: resumeUrl,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
      }

      toast.success("About section updated successfully!");
      fetchData();
      setAboutPhoto(null);
      setAboutResume(null);
      // Keep the description in the form for easier edits later
    } catch (error: any) {
      toast.error(error.message || "Failed to update about section");
      console.error(error);
    }
  };

  const handleDelete = async (table: TableName, id: number) => {
    try {
      await supabase.from(table).delete().eq('id', id);
      toast.success(`${table} deleted successfully!`);
      fetchData();
    } catch (error) {
      toast.error(`Failed to delete ${table}`);
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-10 bg-background text-foreground">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline" 
          className="hover:bg-primary/5 dark:hover:bg-primary/10">Logout</Button>
      </div>
      
      <Tabs defaultValue="skills" className="space-y-4">
        <TabsList className="bg-secondary dark:bg-secondary">
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="skills">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-foreground">Add New Skill</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSkillSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skillName" className="text-foreground">Skill Name</Label>
                  <Input
                    id="skillName"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    required
                    className="bg-background dark:bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skillCategory" className="text-foreground">Category</Label>
                  <select
                    id="skillCategory"
                    value={skillCategory}
                    onChange={(e) => setSkillCategory(e.target.value)}
                    className="w-full p-2 rounded-md border bg-background dark:bg-background/50 text-foreground"
                    required
                  >
                    <option value="technical">Technical Skill</option>
                    <option value="soft">Soft Skill</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skillProficiency" className="text-foreground">
                    Proficiency (0-100)
                  </Label>
                  <Input
                    id="skillProficiency"
                    type="number"
                    min="0"
                    max="100"
                    value={skillProficiency}
                    onChange={(e) => setSkillProficiency(parseInt(e.target.value))}
                    required
                    className="bg-background dark:bg-background/50"
                  />
                </div>
                <Button type="submit" 
                  className="hover:bg-primary/5 dark:hover:bg-primary/10">
                  Add Skill
                </Button>
              </form>

              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Technical Skills</h3>
                {skills.filter(skill => skill.category === 'technical').map((skill) => (
                  <Card key={skill.id} className="glass-panel">
                    <div className="flex justify-between items-start p-4">
                      <div>
                        <h4 className="font-semibold text-foreground">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">Proficiency: {skill.proficiency}%</p>
                      </div>
                      <Button 
                        variant="destructive"
                        onClick={() => handleDelete('Skill', skill.id)}
                        className="hover:bg-destructive/90"
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}

                <h3 className="text-xl font-semibold text-foreground mt-8">Soft Skills</h3>
                {skills.filter(skill => skill.category === 'soft').map((skill) => (
                  <Card key={skill.id} className="glass-panel">
                    <div className="flex justify-between items-start p-4">
                      <div>
                        <h4 className="font-semibold text-foreground">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">Proficiency: {skill.proficiency}%</p>
                      </div>
                      <Button 
                        variant="destructive"
                        onClick={() => handleDelete('Skill', skill.id)}
                        className="hover:bg-destructive/90"
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Add New Achievement</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAchievementSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="achievementTitle" className="text-foreground">Title</Label>
                  <Input
                    id="achievementTitle"
                    value={achievementTitle}
                    onChange={(e) => setAchievementTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievementDate" className="text-foreground">Date</Label>
                  <Input
                    id="achievementDate"
                    type="date"
                    value={achievementDate}
                    onChange={(e) => setAchievementDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievementDesc" className="text-foreground">Description</Label>
                  <Textarea
                    id="achievementDesc"
                    value={achievementDesc}
                    onChange={(e) => setAchievementDesc(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">Add Achievement</Button>
              </form>

              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Existing Achievements</h3>
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                        <p className="text-sm">{new Date(achievement.date).toLocaleDateString()}</p>
                        <p className="text-sm">{achievement.description}</p>
                      </div>
                      <Button 
                        variant="destructive"
                        onClick={() => handleDelete('Achievement', achievement.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Add New Certificate</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCertificateSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certTitle" className="text-foreground">Title</Label>
                  <Input
                    id="certTitle"
                    value={certTitle}
                    onChange={(e) => setCertTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certDescription" className="text-foreground">Description</Label>
                  <Textarea
                    id="certDescription"
                    value={certDescription}
                    onChange={(e) => setCertDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certImage" className="text-foreground">Certificate Image</Label>
                  <Input
                    id="certImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCertImage(e.target.files?.[0] || null)}
                    required
                  />
                </div>
                <Button type="submit">Add Certificate</Button>
              </form>

              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Existing Certificates</h3>
                {certificates.map((cert) => (
                  <Card key={cert.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-foreground">{cert.title}</h4>
                        <p className="text-sm">{cert.description}</p>
                        <img 
                          src={cert.image_url} 
                          alt={cert.title}
                          className="mt-2 max-w-xs rounded-lg"
                        />
                      </div>
                      <Button 
                        variant="destructive"
                        onClick={() => handleDelete('certificate', cert.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Add New Project</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectTitle" className="text-foreground">Title</Label>
                  <Input
                    id="projectTitle"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectDescription" className="text-foreground">Description</Label>
                  <Textarea
                    id="projectDescription"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectTags" className="text-foreground">Tags (comma-separated)</Label>
                  <Input
                    id="projectTags"
                    value={projectTags}
                    onChange={(e) => setProjectTags(e.target.value)}
                    placeholder="React, TypeScript, UI/UX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectImage" className="text-foreground">Project Image</Label>
                  <Input
                    id="projectImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProjectImage(e.target.files?.[0] || null)}
                    required
                  />
                </div>
                <Button type="submit">Add Project</Button>
              </form>

              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Existing Projects</h3>
                {projects.map((project) => (
                  <Card key={project.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-foreground">{project.title}</h4>
                        <p className="text-sm">{project.description}</p>
                        {project.tags && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.tags.map((tag: string) => (
                              <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        )}
                        <img 
                          src={project.image_url} 
                          alt={project.title}
                          className="mt-2 max-w-xs rounded-lg"
                        />
                      </div>
                      <Button 
                        variant="destructive"
                        onClick={() => handleDelete('project', project.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Manage About Section</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAboutSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="aboutDescription" className="text-foreground">About Me Description</Label>
                  <Textarea
                    id="aboutDescription"
                    value={aboutDescription || aboutData?.description || ""}
                    onChange={(e) => setAboutDescription(e.target.value)}
                    placeholder="Enter a brief description about yourself"
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aboutPhoto" className="text-foreground">Profile Photo</Label>
                  <Input
                    id="aboutPhoto"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAboutPhoto(e.target.files?.[0] || null)}
                  />
                  {aboutData?.photo_url && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-2">Current Profile Photo:</p>
                      <img 
                        src={aboutData.photo_url} 
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aboutResume" className="text-foreground">Resume (PDF)</Label>
                  <Input
                    id="aboutResume"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setAboutResume(e.target.files?.[0] || null)}
                  />
                  {aboutData?.resume_url && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-2">Current Resume:</p>
                      <a 
                        href={aboutData.resume_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                      >
                        View current resume
                      </a>
                    </div>
                  )}
                </div>
                <Button type="submit">
                  {aboutData ? "Update About Section" : "Create About Section"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
