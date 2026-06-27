import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const enquiryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  plantName: z.string().min(1, "Plant name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  message: z.string().optional(),
});

export const landscapingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  propertyType: z.string().min(1, "Property type is required"),
  area: z.string().min(1, "Area is required"),
  budget: z.string().min(1, "Budget is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const hatcheryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  service: z.string().min(1, "Service is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const plantFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  scientificName: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(1, "Price must be at least 1"),
  discount: z.number().min(0).max(100).optional(),
  height: z.string().optional(),
  potSize: z.string().optional(),
  careLevel: z.enum(["Easy", "Moderate", "Expert"]).optional(),
  sunlight: z.string().optional(),
  waterNeeds: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  available: z.boolean().optional(),
});

export const galleryItemSchema = z.object({
  alt: z.string().min(1, "Alt text is required"),
  category: z.string().min(1, "Category is required"),
  type: z.enum(["image", "video"]),
});

export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type EnquiryFormData = z.infer<typeof enquiryFormSchema>;
export type LandscapingFormData = z.infer<typeof landscapingFormSchema>;
export type HatcheryFormData = z.infer<typeof hatcheryFormSchema>;
export type PlantFormData = z.infer<typeof plantFormSchema>;
export type GalleryItemFormData = z.infer<typeof galleryItemSchema>;
export type AdminLoginData = z.infer<typeof adminLoginSchema>;
