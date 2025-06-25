import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type UserType = {
  _id: string;
  username: string;
  email: string;
  role: string;
  status: "active" | "banned";
};

export default function UserManagement() {
  const [users, setUsers] = useState<UserType[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setUsers(data.users || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    }

    fetchUsers();
  }, [token]);

  const handleStatusChange = async (userId: string, action: "ban" | "unban") => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}/${action}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to update user status");

      const updated = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u._id === updated.user._id ? updated.user : u))
      );
    } catch (err) {
      alert("Failed to update user status");
      console.error(err);
    }
  };

  return (
    <Card>
      <CardContent>
      <div className="w-full overflow-x-auto">
  <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-semibold py-2">Name</th>
                <th className="text-left font-semibold py-2">Email</th>
                <th className="text-left font-semibold py-2">Role</th>
                <th className="text-left font-semibold py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="border-b last:border-0" key={user._id}>
                  <td className="py-3">{user.username}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Button
                      size="sm"
                      variant={user.status === "active" ? "destructive" : "outline"}
                      onClick={() =>
                        handleStatusChange(user._id, user.status === "active" ? "ban" : "unban")
                      }
                    >
                      <span className="flex items-center gap-1">
                        {user.status === "active" ? (
                          <>
                            <X className="w-3 h-3" />
                            Ban
                          </>
                        ) : (
                          <>
                            <Edit className="w-3 h-3" />
                            Unban
                          </>
                        )}
                      </span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
