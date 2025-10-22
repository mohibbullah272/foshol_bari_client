"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload";

// Zod validation schema
const projectFormSchema = z.object({
  name: z.string().min(1, "প্রকল্পের নাম প্রয়োজন"),
  description: z.string().min(10, "বর্ণনা কমপক্ষে ১০ অক্ষর দীর্ঘ হতে হবে"),
  totalShare: z.string().min(1, "মোট শেয়ার সংখ্যা প্রয়োজন"),
  sharePrice: z.string().min(1, "শেয়ার মূল্য প্রয়োজন"),
  profitPerShare: z.string().min(1, "প্রতি শেয়ার লাভ প্রয়োজন"),
  expireDate: z.string().min(1, "মেয়াদ উত্তীর্ণের তারিখ প্রয়োজন"),
  Duration: z.string().min(1, "প্রকল্পের সময়সীমা প্রয়োজন"),
  location: z.string().min(1, "অবস্থান প্রয়োজন"),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const AddProject = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { images, uploading, error, handleFileChange,removeImage,clearImages } = useCloudinaryUpload();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      totalShare: "",
      sharePrice: "",
      profitPerShare: "",
      expireDate: "",
      Duration: "",
      location: "",
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    if (images.length === 0) {
      setSubmitError("কমপক্ষে একটি ছবি আপলোড করুন");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const projectData = {
        ...data,
        image: images,
        // Convert date strings to ISO format for backend
        expireDate: new Date(data.expireDate).toISOString(),
        Duration: new Date(data.Duration).toISOString(),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        form.reset();
        // Clear images from the upload hook
        // Note: You might need to add a clear function to your hook
      } else {
        setSubmitError(result.message || "প্রকল্প তৈরি করতে সমস্যা হয়েছে");
      }
    } catch (err: any) {
      setSubmitError(err.message || "নেটওয়ার্ক সমস্যা হয়েছে");
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">নতুন প্রকল্প যোগ করুন</h1>
        <p className="text-muted-foreground">
          নতুন বিনিয়োগ প্রকল্পের তথ্য দিন 
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">প্রকল্পের তথ্য</CardTitle>
          <CardDescription>
            প্রকল্পের সকল প্রয়োজনীয় তথ্য প্রদান  করুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <FormLabel>প্রকল্পের ছবি *</FormLabel>
                <div className="space-y-4">
                  {/* Image Upload Input */}
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="project-images"
                    />
                    <label
                      htmlFor="project-images"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium text-primary">ক্লিক করুন আপলোড করতে</span>
                        <br />
                        সর্বোচ্চ ৪টি ছবি (PNG, JPG, JPEG)
                      </div>
                    </label>
                  </div>

                  {/* Uploading State */}
                  {uploading && (
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>ছবি আপলোড হচ্ছে...</span>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Preview Images */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {images.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square relative rounded-lg overflow-hidden border">
                            <Image
                              src={imageUrl}
                              alt={`Project image ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Project Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>প্রকল্পের নাম *</FormLabel>
                      <FormControl>
                        <Input placeholder="প্রকল্পের নাম লিখুন" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>অবস্থান *</FormLabel>
                      <FormControl>
                        <Input placeholder="প্রকল্পের অবস্থান" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Total Shares */}
                <FormField
                  control={form.control}
                  name="totalShare"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>মোট শেয়ার সংখ্যা *</FormLabel>
                      <FormControl>
                        <Input placeholder="মোট শেয়ার সংখ্যা" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Share Price */}
                <FormField
                  control={form.control}
                  name="sharePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>শেয়ার মূল্য (৳) *</FormLabel>
                      <FormControl>
                        <Input placeholder="প্রতি শেয়ারের মূল্য" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Profit Per Share */}
                <FormField
                  control={form.control}
                  name="profitPerShare"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>প্রতি শেয়ার লাভ (৳) *</FormLabel>
                      <FormControl>
                        <Input placeholder="প্রতি শেয়ারে আনুমানিক লাভ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Expire Date */}
                <FormField
                  control={form.control}
                  name="expireDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>মেয়াদ উত্তীর্ণের তারিখ *</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duration */}
                <FormField
                  control={form.control}
                  name="Duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>প্রকল্পের সময়সীমা *</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>প্রকল্পের বর্ণনা *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="প্রকল্পের বিস্তারিত বর্ণনা লিখুন..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      প্রকল্পের সম্পূর্ণ বর্ণনা, লক্ষ্য এবং সুবিধাসমূহ বিস্তারিত লিখুন
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Error */}
              {submitError && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                  {submitError}
                </div>
              )}

              {/* Submit Success */}
              {submitSuccess && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                  প্রকল্প সফলভাবে তৈরি হয়েছে!
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={submitting || uploading}
                  className="min-w-[120px]"
                >
                  {(submitting || uploading) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {submitting ? "সাবমিট হচ্ছে..." : "প্রকল্প তৈরি করুন"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={submitting}
                >
                  রিসেট করুন
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProject;