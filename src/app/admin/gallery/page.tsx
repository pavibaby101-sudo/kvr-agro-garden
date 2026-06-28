"use client";
import { useState, useRef, useEffect } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GalleryItem } from "@/types";
import { Upload, Trash2, Edit, X, Image, Video, Check, AlertCircle } from "lucide-react";

const categories = ["all", "plants", "flowers", "fruit", "landscaping", "customers", "events", "nursery"];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.items) setItems(data.items);
    } catch {}
  };

  useEffect(() => { fetchItems(); }, []);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showUpload, setShowUpload] = useState(false);
  const [showEdit, setShowEdit] = useState<GalleryItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadCategory, setUploadCategory] = useState("nursery");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [editAlt, setEditAlt] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = activeCategory === "all" ? items : items.filter(item => item.category === activeCategory);

  const handleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map(i => i.id)));
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter(f =>
      f.type.startsWith("image/") || f.type.startsWith("video/")
    );
    setUploadFiles(prev => [...prev, ...valid]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeUploadFile = (index: number) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (uploadFiles.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    uploadFiles.forEach(f => formData.append("files", f));
    formData.append("category", uploadCategory);

    try {
      const res = await fetch("/api/gallery/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setUploadFiles([]);
        setShowUpload(false);
        fetchItems();
      }
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setShowEdit(item);
    setEditAlt(item.alt);
    setEditCategory(item.category);
  };

  const saveEdit = async () => {
    if (!showEdit) return;
    try {
      await fetch(`/api/gallery/${showEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alt: editAlt, category: editCategory }),
      });
      fetchItems();
    } catch {}
    setShowEdit(null);
  };

  const handleDelete = async (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      await fetch("/api/gallery/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src: item.src, id: item.id }),
      });
    }
    setShowDeleteConfirm(null);
    setSelectedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
    fetchItems();
  };

  const handleBulkDelete = async () => {
    for (const id of selectedIds) {
      const item = items.find(i => i.id === id);
      if (item) {
        await fetch("/api/gallery/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ src: item.src, id: item.id }),
        });
      }
    }
    setSelectedIds(new Set());
    fetchItems();
  };

  return (
    <AdminLayout title="Gallery">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === cat ? "bg-forest-700 text-white" : "bg-white dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark border border-gray-200 dark:border-gray-800"}`}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {selectedIds.size > 0 && (
              <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm("bulk")}>
                <Trash2 className="w-4 h-4 mr-1" /> Delete ({selectedIds.size})
              </Button>
            )}
            <Button size="sm" onClick={() => setShowUpload(true)}>
              <Upload className="w-4 h-4 mr-1" /> Upload
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-100 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
            <input type="checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded border-gray-300 text-forest-600 focus:ring-forest-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filtered.length} items {selectedIds.size > 0 && `(${selectedIds.size} selected)`}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 p-4">
            {filtered.map(item => (
              <div key={item.id} className={`relative group rounded-xl overflow-hidden border-2 transition-all ${selectedIds.has(item.id) ? "border-forest-500 ring-2 ring-forest-200" : "border-transparent hover:border-gray-200 dark:hover:border-gray-700"}`}>
                <div className="aspect-square relative bg-gray-100 dark:bg-dark">
                  {item.type === "video" ? (
                    <video src={item.src} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                  ) : (
                    <img src={item.src} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
                  )}
                  <div className="absolute top-2 left-2">
                    <input type="checkbox" checked={selectedIds.has(item.id)}
                      onChange={() => handleSelect(item.id)}
                      className="w-4 h-4 rounded border-gray-300 text-forest-600 focus:ring-forest-500" />
                  </div>
                  <div className="absolute top-2 right-2">
                    {item.type === "video" ? (
                      <span className="bg-black/60 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1"><Video className="w-3 h-3" /></span>
                    ) : (
                      <span className="bg-black/60 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1"><Image className="w-3 h-3" /></span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button onClick={() => handleEdit(item)} className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-white"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => setShowDeleteConfirm(item.id)} className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-red-600 hover:bg-white"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-700 dark:text-gray-300 truncate">{item.alt}</p>
                  <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-400">
                <Image className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No gallery items found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showUpload && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => !uploading && setShowUpload(false)}>
          <div className="bg-white dark:bg-dark-100 rounded-2xl border border-gray-200 dark:border-gray-800 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upload Photos & Videos</h2>
              <button onClick={() => !uploading && setShowUpload(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select value={uploadCategory} onChange={e => setUploadCategory(e.target.value)}
                  className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-forest-500 focus:outline-none">
                  {categories.filter(c => c !== "all").map(c => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${dragOver ? "border-forest-500 bg-forest-50 dark:bg-forest-900/20" : "border-gray-300 dark:border-gray-700 hover:border-forest-400"}`}
                onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Drag & drop files here or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">Images: JPG, PNG, WebP | Videos: MP4, MOV, WebM (max 50MB)</p>
                <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="hidden"
                  onChange={e => handleFiles(e.target.files)} />
              </div>

              {uploadFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{uploadFiles.length} file(s) selected</p>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {uploadFiles.map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-dark rounded-lg">
                        <div className="flex items-center gap-2 min-w-0">
                          {f.type.startsWith("image/") ? <Image className="w-4 h-4 text-gray-400 shrink-0" /> : <Video className="w-4 h-4 text-gray-400 shrink-0" />}
                          <span className="text-xs text-gray-600 dark:text-gray-400 truncate">{f.name}</span>
                          <span className="text-xs text-gray-400 shrink-0">({(f.size / 1024 / 1024).toFixed(1)}MB)</span>
                        </div>
                        <button onClick={() => removeUploadFile(i)} className="text-gray-400 hover:text-red-500 shrink-0"><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button onClick={handleUpload} disabled={uploadFiles.length === 0 || uploading} className="flex-1">
                  {uploading ? "Uploading..." : `Upload ${uploadFiles.length} file(s)`}
                </Button>
                <Button variant="outline" onClick={() => { setShowUpload(false); setUploadFiles([]); }} disabled={uploading}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowEdit(null)}>
          <div className="bg-white dark:bg-dark-100 rounded-2xl border border-gray-200 dark:border-gray-800 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Item</h2>
              <button onClick={() => setShowEdit(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-dark">
                {showEdit.type === "video" ? (
                  <video src={showEdit.src} className="w-full h-full object-cover" controls />
                ) : (
                  <img src={showEdit.src} alt={showEdit.alt} className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alt Text</label>
                <Input value={editAlt} onChange={e => setEditAlt(e.target.value)} placeholder="Describe this item" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select value={editCategory} onChange={e => setEditCategory(e.target.value)}
                  className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-forest-500 focus:outline-none">
                  {categories.filter(c => c !== "all").map(c => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={saveEdit} className="flex-1"><Check className="w-4 h-4 mr-1" /> Save</Button>
                <Button variant="outline" onClick={() => setShowEdit(null)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowDeleteConfirm(null)}>
          <div className="bg-white dark:bg-dark-100 rounded-2xl border border-gray-200 dark:border-gray-800 w-full max-w-sm p-6 text-center" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {showDeleteConfirm === "bulk" ? `Delete ${selectedIds.size} items?` : "Delete this item?"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(null)} className="flex-1">Cancel</Button>
              <Button onClick={() => {
                if (showDeleteConfirm === "bulk") handleBulkDelete();
                else handleDelete(showDeleteConfirm);
              }} className="flex-1 bg-red-600 hover:bg-red-700 text-white">Delete</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
