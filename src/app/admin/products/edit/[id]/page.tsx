"use client";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { plantFormSchema, type PlantFormData } from "@/lib/validations";
import { getPlantById } from "@/data/plants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const plant = getPlantById(params.id as string);

  const { register, handleSubmit, formState: { errors } } = useForm<PlantFormData>({
    resolver: zodResolver(plantFormSchema),
    defaultValues: plant ? { name: plant.name, scientificName: plant.scientificName, category: plant.category, price: plant.price, description: plant.description } : undefined,
  });

  const onSubmit = (data: PlantFormData) => { console.log(data); alert("Product updated!"); router.push("/admin/products"); };

  if (!plant) return <div className="p-6 text-center text-gray-500">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-forest-700 mb-6"><ArrowLeft className="w-4 h-4" /> Back</Link>
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Edit: {plant.name}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8 rounded-3xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label><Input {...register("name")} defaultValue={plant.name} /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label><Input {...register("price", { valueAsNumber: true })} type="number" defaultValue={plant.price} /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea {...register("description")} rows={4} defaultValue={plant.description} className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500" />
          </div>
          <div className="flex gap-4">
            <Button type="submit" size="lg">Update Product</Button>
            <Link href="/admin/products"><Button type="button" size="lg" variant="outline">Cancel</Button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
