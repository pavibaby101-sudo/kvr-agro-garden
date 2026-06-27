"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { plantFormSchema, type PlantFormData } from "@/lib/validations";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<PlantFormData>({ resolver: zodResolver(plantFormSchema) });
  const onSubmit = (data: PlantFormData) => { console.log(data); alert("Product added successfully!"); router.push("/admin/products"); };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-forest-700 mb-6"><ArrowLeft className="w-4 h-4" /> Back to Products</Link>
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Add New Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8 rounded-3xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label><Input {...register("name")} />{errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}</div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Scientific Name</label><Input {...register("scientificName")} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select {...register("category")} className="h-12 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500">
                <option value="">Select category</option>
                {categories.map((cat) => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
              </select>
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
            </div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label><Input {...register("price", { valueAsNumber: true })} type="number" />{errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}</div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea {...register("description")} rows={4} className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500" />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
          </div>
          <div className="flex gap-4">
            <Button type="submit" size="lg">Add Product</Button>
            <Link href="/admin/products"><Button type="button" size="lg" variant="outline">Cancel</Button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
