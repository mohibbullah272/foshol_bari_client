"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Loader } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

// Bengali validation messages and regex patterns for login
const loginFormSchema = z.object({
  phone: z.string()
    .min(11, {
      message: "মোবাইল নম্বর অবশ্যই কমপক্ষে ১১ ডিজিটের হতে হবে।",
    })
    .max(14, {
      message: "মোবাইল নম্বর ১৪ ডিজিটের বেশি হতে পারবে না।",
    })
    .regex(/^(\+88)?01[3-9]\d{8}$/, {
      message: "দয়া করে একটি বৈধ বাংলাদেশী মোবাইল নম্বর লিখুন।",
    }),

  password: z.string()
    .min(1, {
      message: "পাসওয়ার্ড প্রয়োজন।",
    })
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading,setLoading]=useState(false)
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setLoading(true)
    try {
      const res = await signIn("credentials", {
        redirect: false, // important!
        ...values,
      })
  
      if (res?.ok ===false) {
        toast.error("আপনি ভুল পাসওয়ার্ড অথবা মোবাইল নম্বর লিখেছেন")
      
      } else {
       
        toast.success("লগইন সফল হয়েছে!")
        window.location.href = "/"
      }
    } catch (error) {
      toast.error('Something went Wrong')
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-border">
        <CardContent className="grid p-6 md:p-8 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                লগইন করুন
              </h2>
              <p className="text-muted-foreground">
                আপনার একাউন্টে অ্যাক্সেস পেতে লগইন করুন
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">মোবাইল নম্বর *</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          placeholder="+8801*********" 
                          {...field} 
                          className="bg-background border-border"
                          onChange={(e) => {
                            // Auto-format phone number
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.startsWith('88')) {
                              field.onChange('+' + value);
                            } else if (value.startsWith('01')) {
                              field.onChange('+88' + value);
                            } else if (value) {
                              field.onChange('+880' + value);
                            } else {
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        আমরা আপনার মোবাইল নম্বর শেয়ার করব না
                      </FormDescription>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">পাসওয়ার্ড *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"}
                            placeholder="আপনার পাসওয়ার্ড লিখুন" 
                            {...field} 
                            className="bg-background border-border pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        আপনার একাউন্ট পাসওয়ার্ড লিখুন
                      </FormDescription>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />

      

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2.5 text-base font-medium"
                >
           {
            loading ? <Loader className="animate-spin"></Loader>:  <span>লগইন করুন</span>
           }
                </Button>
              </form>
            </Form>

    

      

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                একাউন্ট নেই?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  রেজিস্ট্রেশন করুন
                </Link>
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className={`bg-muted bg-[url('https://i.pinimg.com/736x/1d/85/11/1d8511b11ec30fb28ae1b248401b9b12.jpg')] bg-cover rounded-lg relative hidden md:flex items-center justify-center overflow-hidden`}>
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10 text-center p-8">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                আবারো স্বাগতম
              </h3>
              <p className="text-white/90 text-sm">
                আপনার একাউন্টে লগইন করে আপনার প্রকল্প এবং বিনিয়োগ ব্যবস্থাপনা করুন
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}