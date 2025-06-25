import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

export default function RecentActivityFeed() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/activity`);
        const data = await res.json();
        if (data.success) setActivities(data.activities);
      } catch (err) {
        console.error("Failed to fetch activity:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <Card>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading activity...</p>
        ) : activities.length === 0 ? (
          <p className="text-muted-foreground">No recent activity</p>
        ) : (
          <ul className="divide-y">
            {activities.map((a, i) => (
              <li key={i} className="flex justify-between py-2">
                <span>{a.description}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(a.createdAt), { addSuffix: true })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
