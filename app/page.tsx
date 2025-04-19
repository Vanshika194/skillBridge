"use client"

import {
  ArrowRight,
  BarChart2,
  BookOpen,
  CheckCircle,
  FileText,
  LucideLineChart,
  Shield,
  Star,
  Upload,
  Zap,
  User,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import HeroImage from "@/components/hero-image"
import TestimonialCard from "@/components/testimonial-card"
import FeatureHighlight from "@/components/feature-highlight"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"

export default function Home() {
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { isAuthenticated, user, logout } = useAuth()

  const handleUploadResume = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login page with notification
      toast({
        title: "Login Required",
        description: "Please login or sign up to upload your resume.",
        variant: "destructive",
      })
      router.push("/login?reason=upload")
      return
    }

    // If authenticated, proceed with upload
    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Resume uploaded successfully",
        description: "Your resume has been uploaded and is being analyzed.",
      })

      // Redirect to dashboard after successful upload
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    }, 2000)
  }

  const handleDashboardAccess = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login page with notification
      toast({
        title: "Login Required",
        description: "Please login or sign up to access the dashboard.",
        variant: "destructive",
      })
      router.push("/login?reason=dashboard")
      return
    }

    // If authenticated, proceed to dashboard
    router.push("/dashboard")
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="absolute inset-0 bg-grid-slate-200/50 bg-[length:20px_20px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)] pointer-events-none z-0"></div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md transform -translate-x-1 translate-y-1"></div>
              <Star className="h-5 w-5 text-primary relative" />
            </div>
            <span>SkillBridge</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <Link
              href="/#features"
              className="text-sm font-medium hidden sm:block hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium hidden sm:block hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              How It Works
            </Link>

            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  className="hidden sm:block hover:bg-primary/10 transition-all hover:shadow-md"
                  onClick={handleDashboardAccess}
                >
                  Dashboard
                </Button>

                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-primary/10"
                    onClick={() => {
                      const dropdown = document.getElementById("home-user-dropdown")
                      if (dropdown) {
                        dropdown.classList.toggle("hidden")
                      }
                    }}
                  >
                    <User className="h-5 w-5 text-primary" />
                  </Button>

                  <div
                    id="home-user-dropdown"
                    className="hidden absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <div className="py-1">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium">{user?.name || "User"}</p>
                        <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
                      </div>

                      <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-primary/10">
                        <div className="flex items-center">
                          <Star className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </div>
                      </Link>

                      <div className="border-t">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-primary/10"
                        >
                          <div className="flex items-center">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="hidden sm:block hover:bg-primary/10 transition-all hover:shadow-md"
                  onClick={handleDashboardAccess}
                >
                  Dashboard
                </Button>
                <Link href="/login" className="hidden sm:block">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                    <Button className="relative bg-gradient-to-r from-primary to-blue-600/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                      Sign In
                    </Button>
                  </div>
                </Link>
                <Link href="/login" className="sm:hidden">
                  <Button size="sm" className="bg-gradient-to-r from-primary to-blue-600/80">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="container py-16 md:py-24 lg:py-32 space-y-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="space-y-6 lg:w-1/2 relative">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                  Smarter Skills.
                </span>{" "}
                <br className="hidden md:block" />
                Stronger Careers.
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                Build your perfect resume, identify skill gaps, and accelerate your career growth with AI-powered
                insights and personalized learning roadmaps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Button
                    size="lg"
                    className="relative gap-2 w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.03]"
                    onClick={handleDashboardAccess}
                  >
                    Go to Dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Link href="/register">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                      <Button
                        size="lg"
                        className="relative gap-2 w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.03]"
                      >
                        Get Started <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Link>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto backdrop-blur-sm bg-white/30 border-slate-200 hover:bg-primary/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-md"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 transform transition-all duration-700 hover:scale-[1.03] hover:rotate-1">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-3xl blur-xl"></div>
                <HeroImage />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start - Resume Upload Section */}
        <section className="container py-12 md:py-16 relative">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/5"></div>
            <div className="absolute inset-0 backdrop-blur-md bg-white/40"></div>
            <div className="absolute inset-0 bg-grid-slate-200/70 bg-[length:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            <div className="relative p-6 md:p-10 border border-white/20 rounded-2xl shadow-xl">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">Get Started in Seconds</h2>
                <p className="text-muted-foreground">
                  Upload your resume and instantly see how your skills match with market demands
                </p>

                <div className="mt-8 border-2 border-dashed border-primary/20 rounded-lg p-8 md:p-12 text-center bg-white/50 backdrop-blur-sm transition-all hover:border-primary/40">
                  <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Drag & drop your resume</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Supported formats: PDF, DOCX, TXT</p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                        <Button
                          size="lg"
                          className="relative gap-2 bg-gradient-to-r from-primary to-blue-600/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.03]"
                          onClick={handleUploadResume}
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <>
                              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                              Uploading...
                            </>
                          ) : (
                            "Browse Files"
                          )}
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 backdrop-blur-sm bg-white/30 border-slate-200 hover:bg-primary/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-md w-full sm:w-auto"
                        onClick={handleDashboardAccess}
                      >
                        Skip to Dashboard
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Your data is secure</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Zap className="h-4 w-4" />
                    <span>Instant analysis</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CheckCircle className="h-4 w-4" />
                    <span>Free to start</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of the page content remains the same */}
        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50"></div>
          <div className="container space-y-12 relative z-10">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Powerful Features</h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Our intelligent career optimization tool empowers professionals to enhance their profiles, stay
                relevant, and secure better opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: FileText,
                  title: "AI Resume Builder",
                  description:
                    "Create professional resumes with AI guidance tailored to your preferences and industry standards.",
                },
                {
                  icon: Upload,
                  title: "Resume Upload & Analysis",
                  description:
                    "Analyze existing resumes for improvements and optimization with our AI-powered toolkit.",
                },
                {
                  icon: BarChart2,
                  title: "Skill Gap Detection",
                  description:
                    "Identify missing skills in your specific domain using AI by comparing against industry standards.",
                },
                {
                  icon: BookOpen,
                  title: "Personalized Learning",
                  description: "Get AI-curated courses, projects, and resources based on your specific skill gaps.",
                },
                {
                  icon: CheckCircle,
                  title: "ATS Score Checker",
                  description:
                    "Evaluate resume compatibility with Applicant Tracking Systems and optimize accordingly.",
                },
                {
                  icon: LucideLineChart,
                  title: "Real-Time Skill Trends",
                  description: "Track in-demand skills and industry requirements to stay ahead of the competition.",
                },
              ].map((feature, index) => (
                <div className="group" key={index}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 to-blue-600/5 opacity-0 group-hover:opacity-100 rounded-xl blur-xl transition duration-500"></div>
                  <Card className="border border-slate-200/70 bg-white/70 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 h-full relative z-20">
                    <CardHeader>
                      <div className="rounded-full bg-gradient-to-br from-primary/10 to-blue-600/10 w-12 h-12 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <Button
                  variant="outline"
                  size="lg"
                  className="relative bg-white/70 backdrop-blur-sm hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  View All Features
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section id="how-it-works" className="container py-16 md:py-24 space-y-20 relative">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl opacity-70 mix-blend-multiply"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70 mix-blend-multiply"></div>

          <FeatureHighlight
            title="Build Perfect Resumes"
            description="Our AI-powered resume builder creates professional, ATS-friendly resumes tailored to your career goals. Choose from multiple templates and customize to your preferences."
            imageSrc="/placeholder.svg?height=400&width=600"
            imageAlt="AI Resume Builder"
            reverse={false}
          />

          <FeatureHighlight
            title="Identify & Bridge Skill Gaps"
            description="Discover the skills you need to advance your career with our detailed gap analysis. Compare your skills against industry benchmarks and get a visual heatmap of strengths and weaknesses."
            imageSrc="/placeholder.svg?height=400&width=600"
            imageAlt="Skill Gap Analysis"
            reverse={true}
          />

          <FeatureHighlight
            title="Personalized Learning Roadmap"
            description="Get customized recommendations for courses, projects, and certifications that will help you fill skill gaps and advance your career. Track your progress and stay motivated."
            imageSrc="/placeholder.svg?height=400&width=600"
            imageAlt="Learning Roadmap"
            reverse={false}
          />
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50"></div>
          <div className="container space-y-12 relative z-10">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Join thousands of professionals who have transformed their careers with SkillBridge.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TestimonialCard
                quote="SkillBridge helped me identify critical skill gaps and land my dream job in tech. The personalized learning roadmap was a game-changer!"
                author="Sarah Johnson"
                role="Software Engineer"
              />

              <TestimonialCard
                quote="The resume comparison feature helped me optimize my CV for different roles. I saw an immediate increase in interview callbacks!"
                author="Michael Chen"
                role="Marketing Specialist"
              />

              <TestimonialCard
                quote="As a career switcher, I didn't know which skills to focus on. SkillBridge provided clear guidance and helped me transition to data science."
                author="Emma Rodriguez"
                role="Data Scientist"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-600/5 rounded-3xl blur-3xl"></div>
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/10"></div>
            <div className="absolute inset-0 backdrop-blur-md bg-white/30"></div>
            <div className="absolute inset-0 bg-grid-slate-200/70 bg-[length:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            <div className="relative p-8 md:p-12 lg:p-16 text-center space-y-6 border border-white/20 rounded-2xl shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Accelerate Your Career?</h2>
              <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                Join SkillBridge today and transform your resume, skills, and career prospects with our AI-powered
                platform.
              </p>
              <Link href="/register">
                <div className="relative group inline-block">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <Button
                    size="lg"
                    className="relative bg-gradient-to-r from-primary to-blue-600/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
                  >
                    Get Started Now
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 md:py-12 bg-white/70 backdrop-blur-md relative z-10">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-semibold">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm transform -translate-x-1 translate-y-1"></div>
              <Star className="h-5 w-5 text-primary relative" />
            </div>
            <span>SkillBridge</span>
            <span className="text-sm text-muted-foreground">© 2024</span>
          </div>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

