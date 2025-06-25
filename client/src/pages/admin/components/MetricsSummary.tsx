// src/pages/admin/MetricsSummary.tsx (or .jsx)

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function MetricsSummary() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/metrics`);
        const json = await res.json();
        if (json.success) setMetrics(json.data);
      } catch (err) {
        console.error("Failed to fetch metrics", err);
      }
    };
    fetchMetrics();
  }, []);

  if (!metrics) return <p className="text-muted-foreground">Loading metrics...</p>;

  const summary = [
    { title: "Total Templates", value: metrics.totalTemplates },
    { title: "Pending Reviews", value: metrics.pendingReviews },
    { title: "Total Sales", value: `₹${metrics.totalSales.toLocaleString()}` },
    {
      title: "Sellers",
      value: `${metrics.totalUsers} users`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {summary.map((m) => (
        <Card
          key={m.title}
          className="shadow transition hover:scale-[1.01] hover:shadow-lg duration-150 border"
        >
          <CardContent className="p-5 flex flex-col">
            <h4 className="text-base text-muted-foreground font-semibold mb-1">
              {m.title}
            </h4>
            <div className="text-2xl font-bold text-primary">{m.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}