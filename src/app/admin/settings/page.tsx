"use client";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
  businessHours: string;
  metaTitle: string;
  metaDescription: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    siteName: "",
    siteDescription: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    facebook: "",
    instagram: "",
    youtube: "",
    whatsapp: "",
    businessHours: "",
    metaTitle: "",
    metaDescription: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Settings">
        <div className="text-center text-gray-500 py-8">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings">
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {saved && (
          <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm">
            Settings saved successfully!
          </div>
        )}

        <div className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">General</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Site Name
              </label>
              <Input
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Site Description
              </label>
              <Input
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <Input
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Address
            </label>
            <Input
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Business Hours
            </label>
            <Input
              value={settings.businessHours}
              onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Social Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Facebook URL
              </label>
              <Input
                value={settings.facebook}
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instagram URL
              </label>
              <Input
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                YouTube URL
              </label>
              <Input
                value={settings.youtube}
                onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                placeholder="https://youtube.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                WhatsApp Number
              </label>
              <Input
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">SEO</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Meta Title
            </label>
            <Input
              value={settings.metaTitle}
              onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Meta Description
            </label>
            <textarea
              value={settings.metaDescription}
              onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>
        </div>

        <Button type="submit" size="lg" disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </AdminLayout>
  );
}
