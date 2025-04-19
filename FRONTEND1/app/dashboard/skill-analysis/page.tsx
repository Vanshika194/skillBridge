"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft, Sparkles, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import SkillGapHeatmap from "@/components/skill-gap-heatmap"
import SkillRadarChart from "@/components/skill-radar-chart"
import { Progress } from "@/components/ui/progress"

export default function SkillAnalysisPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const skillCategories = [
    {
      name: "Technical Skills",
      skills: [
        { name: "JavaScript", proficiency: 90, required: 85, gap: 0 },
        { name: "React", proficiency: 85, required: 80, gap: 0 },
        { name: "Node.js", proficiency: 70, required: 80, gap: 10 },
        { name: "SQL", proficiency: 65, required: 75, gap: 10 },
        { name: "AWS", proficiency: 40, required: 70, gap: 30 },
        { name: "Python", proficiency: 60, required: 65, gap: 5 },
      ],
    },
    {
      name: "Soft Skills",
      skills: [
        { name: "Communication", proficiency: 85, required: 90, gap: 5 },
        { name: "Problem Solving", proficiency: 90, required: 85, gap: 0 },
        { name: "Teamwork", proficiency: 80, required: 85, gap: 5 },
        { name: "Time Management", proficiency: 75, required: 80, gap: 5 },
      ],
    },
  ]

  const recommendedCourses = [
    {
      title: "AWS Certified Solutions Architect",
      provider: "Coursera",
      duration: "3 months",
      level: "Intermediate",
      match: 95,
    },
    {
      title: "Advanced Node.js Development",
      provider: "Udemy",
      duration: "20 hours",
      level: "Advanced",
      match: 90,
    },
    {
      title: "SQL for Data Analysis",
      provider: "DataCamp",
      duration: "15 hours",
      level: "Intermediate",
      match: 85,
    },
  ]

  const handleGenerateReport = () => {
    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "Report Generated",
        description: "Your skill gap analysis report has been generated and is ready to download.",
      })
    }, 2000)
  }

  const handleViewCourse = (courseTitle: string) => {
    toast({
      title: "Course Selected",
      description: `You've selected the "${courseTitle}" course.`,
    })
  }

  const handleViewProject = (projectTitle: string) => {
    toast({
      title: "Project Selected",
      description: `You've selected the "${projectTitle}" project.`,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="ml-auto flex gap-2">
            <Button size="sm" onClick={handleGenerateReport} disabled={isGenerating} className="gap-2">
              {isGenerating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate Report
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => {
                toast({
                  title: "Report Downloaded",
                  description: "Your skill gap analysis report has been downloaded.",
                })
              }}
            >
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Skill Gap Analysis</h1>
            <p className="text-muted-foreground">Identify gaps in your skillset and get personalized recommendations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Skill Radar</CardTitle>
                <CardDescription>Your skills compared to industry requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <SkillRadarChart />
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Skills Summary</CardTitle>
                <CardDescription>Overall skill match</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Overall Match</span>
                    <span className="text-sm font-medium">76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Technical Skills</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Soft Skills</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Key Gaps</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-sm">
                      <span>AWS</span>
                      <span className="font-medium text-destructive">30% gap</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>Node.js</span>
                      <span className="font-medium text-amber-500">10% gap</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>SQL</span>
                      <span className="font-medium text-amber-500">10% gap</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="heatmap" className="space-y-6">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="heatmap">Heatmap Analysis</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="heatmap" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Gap Heatmap</CardTitle>
                  <CardDescription>Detailed breakdown of your skills and gaps</CardDescription>
                </CardHeader>
                <CardContent>
                  <SkillGapHeatmap skillCategories={skillCategories} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Recommendations</CardTitle>
                  <CardDescription>Personalized courses and resources to bridge your skill gaps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {recommendedCourses.map((course, i) => (
                      <Card
                        key={i}
                        className="bg-muted/50 hover:shadow-md hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold line-clamp-2">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">{course.provider}</p>
                            </div>
                            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                              {course.match}% match
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 my-2">
                            <span className="text-xs bg-secondary px-2 py-1 rounded">{course.duration}</span>
                            <span className="text-xs bg-secondary px-2 py-1 rounded">{course.level}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2 gap-1 hover:bg-primary/10"
                            onClick={() => handleViewCourse(course.title)}
                          >
                            View Course
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Suggested Projects</h3>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium">Build a Serverless Application on AWS</h4>
                            <p className="text-sm text-muted-foreground">Addresses AWS skill gap</p>
                          </div>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">High impact</span>
                        </div>
                        <p className="text-sm mb-4">
                          Create a serverless application using AWS Lambda, API Gateway, and DynamoDB. This project will
                          strengthen your cloud computing skills and architecture knowledge.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewProject("Build a Serverless Application on AWS")}
                        >
                          View Project Details
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium">Advanced Node.js REST API</h4>
                            <p className="text-sm text-muted-foreground">Addresses Node.js skill gap</p>
                          </div>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            Medium impact
                          </span>
                        </div>
                        <p className="text-sm mb-4">
                          Build a scalable REST API with Node.js, Express, and MongoDB. Implement authentication, rate
                          limiting, and proper error handling.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewProject("Advanced Node.js REST API")}
                        >
                          View Project Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

