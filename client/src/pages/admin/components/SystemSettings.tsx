import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Settings, Database, Server, Shield, AlertTriangle } from "lucide-react";

// 🔐 Define the shape of settings object
type SystemSettingsType = {
  autoApproval: boolean;
  maxTemplateSize: string;
  commissionRate: string;
  emailNotifications: boolean;
  maintenanceMode: boolean;
};

// 🟢 Dummy system stats
const systemStats = [
  { name: "Server Status", value: "Online", status: "good", icon: Server },
  { name: "Database", value: "Connected", status: "good", icon: Database },
  { name: "Security", value: "Secure", status: "good", icon: Shield },
  { name: "Last Backup", value: "2 hours ago", status: "warning", icon: AlertTriangle },
];

export default function SystemSettings() {
  const [settings, setSettings] = useState<SystemSettingsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);

  // 🔄 Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin-settings`);
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        toast.error("Failed to load system settings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 🔧 Update individual setting
  const updateSetting = async (key: keyof SystemSettingsType, newValue: boolean | string) => {
    setUpdatingKey(key);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin-settings/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: newValue }),
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      setSettings(data.settings);
      toast.success("Setting updated");
    } catch (err) {
      toast.error("Failed to update setting");
      console.error(err);
    } finally {
      setUpdatingKey(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* ✅ System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemStats.map((stat) => (
              <div key={stat.name} className="flex items-center space-x-3 p-3 rounded-lg border">
                <stat.icon
                  className={`w-6 h-6 ${
                    stat.status === "good"
                      ? "text-green-500"
                      : stat.status === "warning"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium">{stat.name}</p>
                  <p
                    className={`text-xs ${
                      stat.status === "good"
                        ? "text-green-600"
                        : stat.status === "warning"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ⚙️ System Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-muted-foreground">Loading settings...</p>}
          {!loading && settings && (
            <div className="space-y-4">
              {Object.entries(settings).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>
                    <p className="text-sm text-muted-foreground">Current: {String(value)}</p>
                  </div>

                  {typeof value === "boolean" ? (
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        updateSetting(key as keyof SystemSettingsType, checked)
                      }
                    />
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={updatingKey === key}
                      onClick={() => {
                        const newVal = prompt(`Enter new value for "${key}"`, value)?.trim();
                        if (newVal !== null && newVal !== value) {
                          updateSetting(key as keyof SystemSettingsType, newVal);
                        }
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 🚀 Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Database className="w-6 h-6" />
              <span>Backup Database</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Server className="w-6 h-6" />
              <span>Clear Cache</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <AlertTriangle className="w-6 h-6" />
              <span>View Logs</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
