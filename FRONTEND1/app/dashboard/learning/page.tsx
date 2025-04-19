"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, CheckCircle, Clock, ExternalLink, Filter, Play, Star } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

export default function LearningRoadmapPage() {
  const [activeTab, setActiveTab] = useState("recommended")
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleStartCourse = (courseTitle: string) => {
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Course Started",
        description: `You've started the "${courseTitle}" course.`,
      })
    }, 1000)
  }

  const handleSaveCourse = (courseTitle: string) => {
    toast({
      title: "Course Saved",
      description: `"${courseTitle}" has been added to your saved courses.`,
    })
  }

  const recommendedCourses = [
    {
      id: 1,
      title: "AWS Cloud Practitioner Certification",
      provider: "Cloud Guru",
      image: "/placeholder.svg?height=200&width=300",
      duration: "30 hours",
      level: "Beginner",
      rating: 4.8,
      progress: 0,
      skillMatch: 95,
      description:
        "Learn the fundamentals of AWS cloud services and prepare for the AWS Certified Cloud Practitioner exam.",
    },
    {
      id: 2,
      title: "Advanced Node.js Development",
      provider: "Udemy",
      image: "/placeholder.svg?height=200&width=300",
      duration: "24 hours",
      level: "Advanced",
      rating: 4.6,
      progress: 0,
      skillMatch: 92,
      description:
        "Master advanced Node.js concepts including performance optimization, security, and scalable architecture.",
    },
    {
      id: 3,
      title: "SQL for Data Analysis",
      provider: "DataCamp",
      image: "/placeholder.svg?height=200&width=300",
      duration: "15 hours",
      level: "Intermediate",
      rating: 4.7,
      progress: 0,
      skillMatch: 88,
      description: "Learn how to use SQL for data analysis, reporting, and business intelligence applications.",
    },
  ]

  const inProgressCourses = [
    {
      id: 4,
      title: "React Performance Optimization",
      provider: "Frontend Masters",
      image: "/placeholder.svg?height=200&width=300",
      duration: "12 hours",
      level: "Intermediate",
      rating: 4.9,
      progress: 65,
      skillMatch: 90,
      description: "Learn techniques to optimize React applications for better performance and user experience.",
    },
    {
      id: 5,
      title: "Data Structures & Algorithms",
      provider: "Coursera",
      image: "/placeholder.svg?height=200&width=300",
      duration: "40 hours",
      level: "Intermediate",
      rating: 4.7,
      progress: 32,
      skillMatch: 85,
      description:
        "Master fundamental data structures and algorithms essential for technical interviews and efficient coding.",
    },
  ]

  const completedCourses = [
    {
      id: 6,
      title: "JavaScript Fundamentals",
      provider: "Codecademy",
      image: "/placeholder.svg?height=200&width=300",
      duration: "20 hours",
      level: "Beginner",
      rating: 4.5,
      progress: 100,
      skillMatch: 100,
      description: "A comprehensive introduction to JavaScript programming language fundamentals.",
    },
  ]

  const learningPaths = [
    {
      id: 1,
      title: "Full Stack Developer",
      courses: 5,
      duration: "120 hours",
      progress: 45,
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "AWS"],
    },
    {
      id: 2,
      title: "Data Engineer",
      courses: 4,
      duration: "100 hours",
      progress: 20,
      skills: ["SQL", "Python", "Data Warehousing", "ETL", "Big Data"],
    },
    {
      id: 3,
      title: "Cloud Architect",
      courses: 6,
      duration: "150 hours",
      progress: 10,
      skills: ["AWS", "Azure", "Kubernetes", "Terraform", "DevOps"],
    },
  ]

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
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Learning Roadmap</h1>
            <p className="text-muted-foreground">Personalized learning paths to bridge your skill gaps</p>
          </div>

          {/* Learning Paths */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {learningPaths.map((path) => (
                <Card key={path.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle>{path.title}</CardTitle>
                    <CardDescription>
                      {path.courses} courses • {path.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Skills Covered</h4>
                      <div className="flex flex-wrap gap-1">
                        {path.skills.map((skill, i) => (
                          <span key={i} className="bg-muted text-xs px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" className="w-full">
                      View Path
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full md:w-[400px] grid-cols-3">
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="inProgress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="recommended" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-40 w-full">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs px-2 py-1 rounded-full">
                          {course.skillMatch}% match
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>{course.provider}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm line-clamp-2">{course.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" /> {course.duration}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <BookOpen className="h-3 w-3" /> {course.level}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {course.rating}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 gap-1"
                          onClick={() => handleStartCourse(course.title)}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                              Starting...
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3" /> Start
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleSaveCourse(course.title)}
                        >
                          Save
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="inProgress" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inProgressCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-40 w-full">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Button size="sm" className="gap-1">
                            <Play className="h-3 w-3" /> Continue
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>{course.provider}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" /> {course.duration}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <BookOpen className="h-3 w-3" /> {course.level}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {course.rating}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm" className="w-full gap-1">
                          <Play className="h-3 w-3" /> Continue Learning
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-40 w-full">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Completed
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>{course.provider}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm line-clamp-2">{course.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" /> {course.duration}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <BookOpen className="h-3 w-3" /> {course.level}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {course.rating}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 gap-1">
                          <ExternalLink className="h-3 w-3" /> View Certificate
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Review
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

