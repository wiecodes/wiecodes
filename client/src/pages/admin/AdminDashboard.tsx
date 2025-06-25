import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Search, Bell, User, Clock, Users } from "lucide-react";

import ReviewRequestsList from "./components/ReviewRequestsList";
import PublishedTemplatesTable from "./components/PublishedTemplatesTable";
import MetricsSummary from "./components/MetricsSummary";
import RecentActivityFeed from "./components/RecentActivityFeed";
import UserManagement from "./components/UserManagement";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import SystemSettings from "./components/SystemSettings";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "analytics", label: "Analytics" },
  { key: "reviews", label: "Review Requests" },
  { key: "templates", label: "Templates" },
  { key: "users", label: "Users" },
  { key: "settings", label: "Settings" },
];

const AdminDashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  const [theme, setTheme] = useState<"Light" | "Dark">("Light");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "Dark" ? "Light" : "Dark"));
    document.documentElement.classList.toggle("Dark");
  };

  return (
    <div
      className={`$${theme === "Dark" ? "dark bg-background" : "bg-background"} min-h-screen`}
    >
      <header className="sticky top-0 z-40 bg-white dark:bg-background border-b border-border/50 shadow-sm backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
              <span className="uppercase">WIECODES</span>
              <Badge variant="destructive" className="ml-1 text-xs tracking-wide">
                Admin
              </Badge>
            </span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-fit">
            <div className="flex flex-1 bg-accent rounded-md items-center px-3">
              <Search className="text-muted-foreground w-4 h-4 mr-2" />
              <Input
                placeholder="Search templates or users..."
                className="w-full border-none bg-transparent focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Profile">
              <User className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light"
            >
              {theme === "Dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <nav className="container mx-auto px-4 mt-8 mb-5">
        <div className="flex bg-secondary/70 p-1.5 rounded-lg overflow-x-auto w-fit">
          {TABS.map((t) => (
            <Button
              key={t.key}
              variant={activeTab === t.key ? "default" : "ghost"}
              className="px-6 capitalize whitespace-nowrap"
              onClick={() => setSearchParams({ tab: t.key })}
            >
              {t.label}
            </Button>
          ))}
        </div>
      </nav>

      <main className="container mx-auto px-4 pb-16 relative">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <MetricsSummary />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-2 text-primary flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  Recent Activity
                </h2>
                <div className="max-h-[500px] overflow-y-auto rounded-md">
                  <RecentActivityFeed />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  User Management
                </h2>
                <div className="max-h-[500px] overflow-y-auto rounded-md overflow-x-auto">
                  <div className="w-full overflow-x-auto">
                    <UserManagement />
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === "analytics" && (
          <section className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
            <AnalyticsDashboard />
          </section>
        )}

        {activeTab === "reviews" && (
          <section className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold tracking-tight">Template Review Requests</h2>
            <ReviewRequestsList />
          </section>
        )}

        {activeTab === "templates" && (
          <section className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold tracking-tight">Published Templates</h2>
            <PublishedTemplatesTable />
          </section>
        )}

        {activeTab === "users" && (
          <section className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
            <UserManagement />
          </section>
        )}

        {activeTab === "settings" && (
          <section className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
            <SystemSettings />
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;