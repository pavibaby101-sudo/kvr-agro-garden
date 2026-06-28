"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X, Image as ImageIcon, Sparkles } from "lucide-react";
import { plantFormSchema, type PlantFormData } from "@/lib/validations";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useRef } from "react";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [generatingDesc, setGeneratingDesc] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PlantFormData>({
    resolver: zodResolver(plantFormSchema),
    defaultValues: { discount: 0, available: true, featured: false, images: [] },
  });

  const watchedPrice = watch("price") || 0;
  const watchedDiscount = watch("discount") || 0;
  const effectivePrice = watchedPrice - (watchedPrice * watchedDiscount) / 100;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (const file of Array.from(files)) {
        formData.append("images", file);
      }

      const res = await fetch("/api/plants/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        const newImages = [...images, ...data.images];
        setImages(newImages);
        setValue("images", newImages);
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue("images", newImages);
  };

  const handleGenerateDescription = async () => {
    const name = watch("name");
    const scientificName = watch("scientificName");
    const category = watch("category");
    if (!name) {
      alert("Please enter a product name first");
      return;
    }
    setGeneratingDesc(true);
    try {
      const res = await fetch("/api/ai/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, scientificName, category }),
      });
      if (res.ok) {
        const data = await res.json();
        setValue("description", data.description);
      } else {
        alert("Failed to generate description");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setGeneratingDesc(false);
    }
  };

  const onSubmit = async (data: PlantFormData) => {
    setLoading(true);
    try {
      const payload = { ...data, images };
      const res = await fetch("/api/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/admin/products");
      } else {
        alert("Failed to add product");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add New Product">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-forest-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 rounded-3xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm">

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Images</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:border-forest-500 transition-colors">
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex flex-col items-center gap-2 mx-auto">
                {uploading ? (
                  <div className="w-10 h-10 border-2 border-forest-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-10 h-10 text-gray-400" />
                )}
                <span className="text-sm text-gray-500">{uploading ? "Uploading..." : "Click to upload images"}</span>
                <span className="text-xs text-gray-400">JPG, PNG, WebP up to 10MB</span>
              </button>
            </div>
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {images.map((src, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 group">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {images.length === 0 && (
              <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                <ImageIcon className="w-4 h-4" />
                <span>No images uploaded yet</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
              <Input {...register("name")} placeholder="Snake Plant" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Scientific Name</label>
              <Input {...register("scientificName")} placeholder="Sansevieria trifasciata" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
              <select {...register("category")} className="h-12 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500">
                <option value="">Select category</option>
                {["indoor", "outdoor", "flowering", "medicinal", "fruit", "vegetable", "herb", "succulent", "exotic", "palm", "climber", "bonsai", "spice"].map((cat) => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height</label>
              <Input {...register("height")} placeholder="30-50 cm" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹) *</label>
              <Input {...register("price", { valueAsNumber: true })} type="number" placeholder="399" />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount (%)</label>
              <Input {...register("discount", { valueAsNumber: true })} type="number" placeholder="0" min="0" max="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Effective Price</label>
              <div className="h-12 flex items-center px-4 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-800 text-sm font-medium text-forest-700 dark:text-forest-400">
                ₹{effectivePrice.toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pot Size</label>
              <Input {...register("potSize")} placeholder="6 inch" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Care Level</label>
              <select {...register("careLevel")} className="h-12 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500">
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sunlight</label>
              <Input {...register("sunlight")} placeholder="Bright Indirect" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Water Needs</label>
              <Input {...register("waterNeeds")} placeholder="Medium - Water weekly" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
              <button type="button" onClick={handleGenerateDescription} disabled={generatingDesc} className="inline-flex items-center gap-1.5 text-xs text-forest-600 hover:text-forest-800 disabled:opacity-50">
                <Sparkles className="w-3.5 h-3.5" />
                {generatingDesc ? "Generating..." : "Generate with AI"}
              </button>
            </div>
            <textarea {...register("description")} rows={4} className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500" placeholder="Describe the plant..." />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          <div className="flex gap-4">
            <Button type="submit" size="lg" disabled={loading}>{loading ? "Adding..." : "Add Product"}</Button>
            <Link href="/admin/products"><Button type="button" size="lg" variant="outline">Cancel</Button></Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
