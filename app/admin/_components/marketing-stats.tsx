"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface MarketingStats {
  totalUsers: number;
  usersWithConsent: number;
  usersWithoutConsent: number;
  consentRate: string;
  consentedEmails: Array<{
    email: string;
    name: string;
    consentDate: string | null;
  }>;
}

export function MarketingStats() {
  const [stats, setStats] = useState<MarketingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/marketing-stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setStats(data);
        }
      })
      .catch((err) => {
        setError("Failed to load stats");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Marketing Consent</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error || !stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Marketing Consent</CardTitle>
          <CardDescription className="text-red-500">
            {error || "Failed to load"}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Marketing Consent Overview</CardTitle>
          <CardDescription>
            Users who have opted in to receive marketing communications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">With Consent</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.usersWithConsent}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Without Consent</p>
              <p className="text-2xl font-bold text-gray-500">
                {stats.usersWithoutConsent}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Consent Rate</p>
              <p className="text-2xl font-bold">{stats.consentRate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Marketing List</CardTitle>
              <CardDescription>
                {stats.usersWithConsent} users have opted in
              </CardDescription>
            </div>
            <button
              onClick={() => {
                // Create CSV content
                const csvHeader = "email,name,consentDate\n";
                const csvRows = stats.consentedEmails
                  .map(
                    (user) =>
                      `${user.email},${user.name || ""},${user.consentDate || ""}`
                  )
                  .join("\n");
                const csv = csvHeader + csvRows;

                // Create download link
                const blob = new Blob([csv], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `marketing-list-${new Date().toISOString().split("T")[0]}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
              }}
              disabled={stats.consentedEmails.length === 0}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Export CSV
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {stats.consentedEmails.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No users have opted in yet
            </p>
          ) : (
            <div className="space-y-2">
              {stats.consentedEmails.map((user) => (
                <div
                  key={user.email}
                  className="flex items-center justify-between p-2 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{user.email}</p>
                    {user.name && (
                      <p className="text-sm text-muted-foreground">{user.name}</p>
                    )}
                  </div>
                  {user.consentDate && (
                    <p className="text-xs text-muted-foreground">
                      {new Date(user.consentDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
