"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, FileText, Upload } from "lucide-react"
import SkillRadarChart from "@/components/skill-radar-chart"
import { Progress } from "@/components/ui/progress"
import ResumeScoreGauge from "@/components/resume-score-gauge"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const firstName = user?.name.split(" ")[0] || "User"
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [stats, setStats] = useState({
    atsScore: 0,
    skillsMatched: 0,
    learningProgress: 0,
    resumeViews: 0,
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        atsScore: 78,
        skillsMatched: 24,
        learningProgress: 43,
        resumeViews: 37,
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleUploadResume = () => {
    router.push("/dashboard/resume-upload")
  }

  const handleCreateResume = () => {
    router.push("/dashboard/resume-builder")
  }

  const handleViewAllCourses = () => {
    toast({
      title: "Learning Paths",
      description: "Viewing all recommended learning paths.",
    })
  }

  const handleViewCourse = (courseTitle: string) => {
    toast({
      title: "Course Selected",
      description: `You've selected the "${courseTitle}" course.`,
    })
  }

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome Back, {firstName}!</h1>
          <p className="text-muted-foreground">Here's an overview of your career progress</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleUploadResume}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all shadow-md hover:shadow-lg"
          >
            <Upload className="mr-2 h-4 w-4" /> Upload Resume
          </Button>
          <Button variant="outline" onClick={handleCreateResume} className="hover:bg-primary/10 transition-colors">
            <FileText className="mr-2 h-4 w-4" /> Create Resume
          </Button>
        </div>
      </div>

      {/* Stats overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ATS Score</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 bg-muted/50 rounded animate-pulse"></div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.atsScore}/100</div>
                <p className="text-xs text-muted-foreground">+12% from last update</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Skills Matched</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 bg-muted/50 rounded animate-pulse"></div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.skillsMatched}/32</div>
                <p className="text-xs text-muted-foreground">75% match rate</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <>
                <div className="h-8 bg-muted/50 rounded animate-pulse mb-1"></div>
                <div className="h-2 bg-muted/50 rounded animate-pulse"></div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.learningProgress}%</div>
                <Progress
                  value={stats.learningProgress}
                  className="h-2 mt-1"
                  indicatorClassName="bg-gradient-to-r from-primary to-primary/80"
                />
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resume Views</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 bg-muted/50 rounded animate-pulse"></div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.resumeViews}</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume score */}
        <Card className="lg:col-span-1 border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
          <CardHeader>
            <CardTitle>Resume Score</CardTitle>
            <CardDescription>ATS compatibility analysis</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            {isLoading ? (
              <div className="w-48 h-48 bg-muted/50 rounded-full animate-pulse"></div>
            ) : (
              <ResumeScoreGauge score={stats.atsScore} />
            )}
          </CardContent>
        </Card>

        {/* Skill radar */}
        <Card className="lg:col-span-2 border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
          <CardHeader>
            <CardTitle>Skill Analysis</CardTitle>
            <CardDescription>Your skills compared to job requirements</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <div className="w-full h-64 bg-muted/50 rounded animate-pulse"></div> : <SkillRadarChart />}
          </CardContent>
        </Card>

        {/* Learning recommendations */}
        <Card className="lg:col-span-3 border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recommended Learning Paths</CardTitle>
              <CardDescription>Based on your skill gaps</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 hover:bg-primary/10 transition-colors"
              onClick={handleViewAllCourses}
            >
              View All <ArrowUpRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-40 bg-muted/50 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Advanced Data Visualization",
                    source: "DataCamp",
                    duration: "6 hours",
                    relevance: 98,
                  },
                  {
                    title: "Machine Learning Fundamentals",
                    source: "Coursera",
                    duration: "8 weeks",
                    relevance: 92,
                  },
                  {
                    title: "SQL for Data Analysis",
                    source: "Udemy",
                    duration: "12 hours",
                    relevance: 87,
                  },
                ].map((course, i) => (
                  <Card
                    key={i}
                    className="bg-gradient-to-r from-muted/50 to-transparent border border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{course.title}</h4>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {course.relevance}% match
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        {course.source} • {course.duration}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full hover:bg-primary/10 transition-colors"
                        onClick={() => handleViewCourse(course.title)}
                      >
                        View Course
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
