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
import { Loader2, Upload, X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Category enum mapping (English values for backend, Bangla for UI)
const CATEGORIES = {
  CROPS: "ফসল চাষ",
  LIVESTOCK: "পশুপালন",
  HORTICULTURE: "উদ্যানপালন",
  FISHERIES: "মৎস্য চাষ",
  INPUT_SUPPLY: "কৃষি উপকরণ সরবরাহ",
  AGRO_INDUSTRY: "কৃষি শিল্প",
  FARM_EQUIPMENT: "কৃষি যন্ত্রপাতি",
  AGRI_TECH: "কৃষি প্রযুক্তি",
  IRRIGATION_SYSTEMS: "সেচ ব্যবস্থা",
  SUSTAINABLE_FARMING: "টেকসই কৃষি",
  STORAGE_LOGISTICS: "সংরক্ষণ ও পরিবহন",
  AGRICULTURAL_FINANCE: "কৃষি অর্থায়ন",
  LAND_ACQUISITION: "জমি অধিগ্রহণ",
  RENEWABLE_ENERGY: "নবায়নযোগ্য শক্তি",
  AGRICULTURAL_RESEARCH: "কৃষি গবেষণা",
  VALUE_CHAIN_INTEGRATION: "মূল্য শৃঙ্খল একীকরণ",
  FORESTRY: "বনায়ন",
  PEST_DISEASE_CONTROL: "পোকামাকড় ও রোগ নিয়ন্ত্রণ",
  WATER_MANAGEMENT: "পানি ব্যবস্থাপনা",
  SOIL_HEALTH: "মাটির স্বাস্থ্য"
} as const;

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
  category: z.string().min(1, "বিভাগ নির্বাচন করুন"),
  keywords: z.array(z.string().min(1, "কিওয়ার্ড খালি হতে পারবে না")).min(1, "কমপক্ষে একটি কিওয়ার্ড যোগ করুন"),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const AddProject = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { images, uploading, error, handleFileChange, removeImage, clearImages } = useCloudinaryUpload();

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
      category: "",
      keywords: [""], // Start with one empty keyword field
    },
  });

  // Add new keyword field
  const addKeyword = () => {
    const currentKeywords = form.getValues("keywords");
    form.setValue("keywords", [...currentKeywords, ""]);
  };

  // Remove keyword field
  const removeKeyword = (index: number) => {
    const currentKeywords = form.getValues("keywords");
    if (currentKeywords.length > 1) {
      form.setValue(
        "keywords", 
        currentKeywords.filter((_, i) => i !== index)
      );
    }
  };

  // Update keyword value
  const updateKeyword = (index: number, value: string) => {
    const currentKeywords = form.getValues("keywords");
    const updatedKeywords = [...currentKeywords];
    updatedKeywords[index] = value;
    form.setValue("keywords", updatedKeywords);
  };

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
        // Filter out empty keywords
        keywords: data.keywords.filter(keyword => keyword.trim() !== ""),
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
        clearImages(); // Clear images after successful submission
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
            প্রকল্পের সকল প্রয়োজনীয় তথ্য প্রদান করুন
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

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>বিভাগ *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(CATEGORIES).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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

              {/* Keywords Section */}
              <div className="space-y-4">
                <FormLabel>কিওয়ার্ড *</FormLabel>
                <div className="space-y-3">
                  {form.watch("keywords").map((_, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <Input
                        placeholder={`কিওয়ার্ড ${index + 1}`}
                        value={form.watch("keywords")[index]}
                        onChange={(e) => updateKeyword(index, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeKeyword(index)}
                        disabled={form.watch("keywords").length <= 1}
                        className="shrink-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addKeyword}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    কিওয়ার্ড যোগ করুন
                  </Button>
                </div>
                {form.formState.errors.keywords && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.keywords.message}
                  </p>
                )}
                <FormDescription>
                  প্রকল্পের সাথে সম্পর্কিত কিওয়ার্ড যোগ করুন (যেমন: জৈব কৃষি, হাইড্রোপনিক্স, ডেইরি ফার্ম ইত্যাদি)
                </FormDescription>
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
                  onClick={() => {
                    form.reset();
                    clearImages();
                  }}
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