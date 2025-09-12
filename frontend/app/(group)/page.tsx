"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  Bar,
  BarChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const stats = [
  { title: "Total Properties", value: 128 },
  { title: "Active Listings", value: 78 },
  { title: "Total Users", value: 340 },
  { title: "Verified Agents", value: 25 },
];

const barChartData = [
  { name: "Jan", Residential: 14, Commercial: 6 },
  { name: "Feb", Residential: 20, Commercial: 15 },
  { name: "Mar", Residential: 18, Commercial: 10 },
  { name: "Apr", Residential: 25, Commercial: 15 },
  { name: "May", Residential: 40, Commercial: 20 },
  { name: "Jun", Residential: 30, Commercial: 20 },
];

const areaChartData = [
  { month: "Jan", users: 50 },
  { month: "Feb", users: 90 },
  { month: "Mar", users: 130 },
  { month: "Apr", users: 170 },
  { month: "May", users: 220 },
  { month: "Jun", users: 260 },
];

const donutData = [
  { name: "Apartments", value: 45 },
  { name: "Villas", value: 25 },
  { name: "Commercial", value: 18 },
  { name: "Others", value: 12 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"];

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Stat cards */}
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader>
            <CardTitle>{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}

      {/* Bar Chart */}
      <div className="col-span-1 md:col-span-2 xl:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Listings Overview (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={barChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="Residential"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Commercial"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Area Chart */}
      <div className="col-span-1 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={areaChartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#10b981"
                  fill="#d1fae5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Donut Chart */}
      <div className="col-span-1 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Property Type Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  label
                >
                  {donutData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
