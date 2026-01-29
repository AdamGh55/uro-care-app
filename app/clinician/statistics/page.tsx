"use client";

import { useState } from "react";
import {
  Users,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Activity,
  CheckCircle2,
  Clock,
  FileBarChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const monthlyPatients = [
  { month: "Jan", patients: 45, surgeries: 38 },
  { month: "Fév", patients: 52, surgeries: 44 },
  { month: "Mar", patients: 48, surgeries: 41 },
  { month: "Avr", patients: 61, surgeries: 53 },
  { month: "Mai", patients: 55, surgeries: 48 },
  { month: "Juin", patients: 67, surgeries: 59 },
];

const complicationData = [
  { name: "Infections", value: 12, color: "hsl(var(--destructive))" },
  { name: "Rétention urinaire", value: 8, color: "hsl(var(--warning))" },
  { name: "Hématuries", value: 15, color: "hsl(var(--chart-1))" },
  { name: "Douleurs sévères", value: 6, color: "hsl(var(--chart-2))" },
  { name: "Autres", value: 4, color: "hsl(var(--muted-foreground))" },
];

const surgeryTypes = [
  { type: "Prostatectomie", count: 45, adherence: 92 },
  { type: "Cystoscopie", count: 78, adherence: 88 },
  { type: "Lithotripsie", count: 34, adherence: 95 },
  { type: "Adénomectomie", count: 28, adherence: 85 },
  { type: "Néphrectomie", count: 15, adherence: 90 },
];

const weeklyAlerts = [
  { day: "Lun", critical: 2, moderate: 5, low: 8 },
  { day: "Mar", critical: 1, moderate: 7, low: 6 },
  { day: "Mer", critical: 3, moderate: 4, low: 9 },
  { day: "Jeu", critical: 0, moderate: 6, low: 7 },
  { day: "Ven", critical: 2, moderate: 8, low: 5 },
  { day: "Sam", critical: 1, moderate: 3, low: 4 },
  { day: "Dim", critical: 0, moderate: 2, low: 3 },
];

const adherenceOverTime = [
  { week: "S1", rate: 78 },
  { week: "S2", rate: 82 },
  { week: "S3", rate: 85 },
  { week: "S4", rate: 88 },
  { week: "S5", rate: 86 },
  { week: "S6", rate: 91 },
  { week: "S7", rate: 89 },
  { week: "S8", rate: 93 },
];

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("6months");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Statistiques</h1>
          <p className="text-muted-foreground">
            Analyse des données patients et complications
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Dernier mois</SelectItem>
            <SelectItem value="3months">3 derniers mois</SelectItem>
            <SelectItem value="6months">6 derniers mois</SelectItem>
            <SelectItem value="1year">Dernière année</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">328</p>
                <p className="text-xs text-muted-foreground">
                  Patients totaux
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+12% vs période précédente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">283</p>
                <p className="text-xs text-muted-foreground">
                  Chirurgies réussies
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Activity className="h-3 w-3" />
              <span>Taux de réussite: 96.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-muted-foreground">
                  Complications
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
              <TrendingUp className="h-3 w-3 rotate-180" />
              <span>-8% vs période précédente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-xs text-muted-foreground">
                  Adhérence parcours
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>+5% vs période précédente</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Patients & Surgeries Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Patients et chirurgies par mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyPatients}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="patients"
                  fill="hsl(var(--primary))"
                  name="Patients"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="surgeries"
                  fill="hsl(var(--accent))"
                  name="Chirurgies"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Complications Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Types de complications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={complicationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {complicationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Alertes par jour (semaine en cours)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyAlerts}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="critical"
                  stackId="a"
                  fill="hsl(var(--destructive))"
                  name="Critiques"
                />
                <Bar
                  dataKey="moderate"
                  stackId="a"
                  fill="hsl(var(--warning))"
                  name="Modérées"
                />
                <Bar
                  dataKey="low"
                  stackId="a"
                  fill="hsl(var(--muted-foreground))"
                  name="Faibles"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Adherence Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Évolution de l'adhérence au parcours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={adherenceOverTime}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" className="text-xs" />
                <YAxis className="text-xs" domain={[70, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`${value}%`, "Adhérence"]}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Surgery Types Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileBarChart className="h-4 w-4" />
            Adhérence par type de chirurgie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {surgeryTypes.map((surgery) => (
              <div key={surgery.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{surgery.type}</span>
                    <Badge variant="secondary">{surgery.count} patients</Badge>
                  </div>
                  <span className="text-sm font-medium">
                    {surgery.adherence}%
                  </span>
                </div>
                <Progress value={surgery.adherence} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
