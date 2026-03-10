"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  TrendingDown,
  Thermometer,
  Activity,
  Camera,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const painData = [
  { day: "J1", value: 7, date: "15 Jan" },
  { day: "J2", value: 6, date: "16 Jan" },
  { day: "J3", value: 5, date: "17 Jan" },
  { day: "J4", value: 6, date: "18 Jan" },
  { day: "J5", value: 4, date: "19 Jan" },
  { day: "J6", value: 3, date: "20 Jan" },
  { day: "J7", value: 3, date: "21 Jan" },
  { day: "J8", value: 2, date: "22 Jan" },
  { day: "J9", value: 2, date: "23 Jan" },
  { day: "J10", value: 1, date: "24 Jan" },
];

const temperatureData = [
  { day: "J1", value: 37.8, date: "15 Jan" },
  { day: "J2", value: 38.2, date: "16 Jan" },
  { day: "J3", value: 37.5, date: "17 Jan" },
  { day: "J4", value: 37.2, date: "18 Jan" },
  { day: "J5", value: 37.0, date: "19 Jan" },
  { day: "J6", value: 36.9, date: "20 Jan" },
  { day: "J7", value: 37.1, date: "21 Jan" },
  { day: "J8", value: 36.8, date: "22 Jan" },
  { day: "J9", value: 36.7, date: "23 Jan" },
  { day: "J10", value: 36.6, date: "24 Jan" },
];

const woundPhotos = [
  { id: 1, date: "15 Jan 2026", day: "J1", status: "Post-op immédiat" },
  { id: 2, date: "17 Jan 2026", day: "J3", status: "Cicatrisation normale" },
  { id: 3, date: "20 Jan 2026", day: "J6", status: "Bonne évolution" },
  { id: 4, date: "24 Jan 2026", day: "J10", status: "Presque guéri" },
];

const journalEntries = [
  {
    id: 1,
    date: "24 Jan 2026",
    day: "J10",
    pain: 1,
    temperature: 36.6,
    symptoms: ["Légère gêne"],
    medicationTaken: true,
    hasPhoto: false,
  },
  {
    id: 2,
    date: "23 Jan 2026",
    day: "J9",
    pain: 2,
    temperature: 36.7,
    symptoms: ["Fatigue légère"],
    medicationTaken: true,
    hasPhoto: false,
  },
  {
    id: 3,
    date: "22 Jan 2026",
    day: "J8",
    pain: 2,
    temperature: 36.8,
    symptoms: [],
    medicationTaken: true,
    hasPhoto: false,
  },
  {
    id: 4,
    date: "21 Jan 2026",
    day: "J7",
    pain: 3,
    temperature: 37.1,
    symptoms: ["Légère fatigue"],
    medicationTaken: true,
    hasPhoto: false,
  },
  {
    id: 5,
    date: "20 Jan 2026",
    day: "J6",
    pain: 3,
    temperature: 36.9,
    symptoms: [],
    medicationTaken: true,
    hasPhoto: true,
  },
  {
    id: 6,
    date: "19 Jan 2026",
    day: "J5",
    pain: 4,
    temperature: 37.0,
    symptoms: ["Mictions fréquentes"],
    medicationTaken: true,
    hasPhoto: false,
  },
  {
    id: 7,
    date: "18 Jan 2026",
    day: "J4",
    pain: 6,
    temperature: 37.2,
    symptoms: ["Douleur modérée", "Légères brûlures"],
    medicationTaken: true,
    hasPhoto: false,
  },
  {
    id: 8,
    date: "17 Jan 2026",
    day: "J3",
    pain: 5,
    temperature: 37.5,
    symptoms: ["Fatigue", "Légère hématurie"],
    medicationTaken: true,
    hasPhoto: true,
  },
  {
    id: 9,
    date: "16 Jan 2026",
    day: "J2",
    pain: 6,
    temperature: 38.2,
    symptoms: ["Fièvre légère", "Douleur au site"],
    medicationTaken: true,
    hasPhoto: false,
  },
  {
    id: 10,
    date: "15 Jan 2026",
    day: "J1",
    pain: 7,
    temperature: 37.8,
    symptoms: ["Douleur post-op", "Fatigue importante"],
    medicationTaken: true,
    hasPhoto: true,
  },
];

export default function JournalHistoryPage() {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState("charts");

  const averagePain =
    painData.reduce((acc, d) => acc + d.value, 0) / painData.length;
  const painTrend = painData[painData.length - 1].value - painData[0].value;

  const avgTemp =
    temperatureData.reduce((acc, d) => acc + d.value, 0) /
    temperatureData.length;
  const tempTrend =
    temperatureData[temperatureData.length - 1].value -
    temperatureData[0].value;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/patient/journal">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {t('patient.journal.history.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('patient.journal.history.subtitle')}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('patient.journal.history.avgPain')}</p>
                <p className="text-2xl font-bold">{averagePain.toFixed(1)}/10</p>
              </div>
              <div
                className={`flex items-center gap-1 ${painTrend < 0 ? "text-success" : "text-destructive"}`}
              >
                {painTrend < 0 ? (
                  <TrendingDown className="h-4 w-4" />
                ) : (
                  <TrendingUp className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(painTrend)} {t('patient.journal.history.pts')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t('patient.journal.history.avgTemp')}
                </p>
                <p className="text-2xl font-bold">{avgTemp.toFixed(1)}°C</p>
              </div>
              <div
                className={`flex items-center gap-1 ${tempTrend < 0 ? "text-success" : "text-destructive"}`}
              >
                {tempTrend < 0 ? (
                  <TrendingDown className="h-4 w-4" />
                ) : (
                  <TrendingUp className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(tempTrend).toFixed(1)}°C
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('patient.journal.history.woundPhotos')}</p>
                <p className="text-2xl font-bold">{woundPhotos.length}</p>
              </div>
              <Camera className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="charts">{t('patient.journal.history.tabs.charts')}</TabsTrigger>
          <TabsTrigger value="photos">{t('patient.journal.history.tabs.photos')}</TabsTrigger>
          <TabsTrigger value="entries">{t('patient.journal.history.tabs.entries')}</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6 mt-4">
          {/* Pain Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4" />
                {t('patient.journal.history.painChartTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={painData}>
                  <defs>
                    <linearGradient id="painGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis domain={[0, 10]} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}/10`, t('patient.journal.history.pain')]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#painGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  {t('patient.journal.history.painLow')}
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  {t('patient.journal.history.painModerate')}
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  {t('patient.journal.history.painSevere')}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Temperature Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                {t('patient.journal.history.tempChartTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis domain={[36, 39]} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}°C`, t('patient.journal.history.temperature')]}
                  />
                  {/* Reference line for fever threshold */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--accent))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  {t('patient.journal.history.tempNormal')}
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  {t('patient.journal.history.tempWarning')}
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  {t('patient.journal.history.tempFever')}
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Camera className="h-4 w-4" />
                {t('patient.journal.history.photosTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {woundPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="aspect-square bg-muted flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Camera className="h-10 w-10 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">{t('patient.journal.history.photoPlaceholder')}</p>
                      </div>
                    </div>
                    <div className="p-3 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{photo.day}</p>
                          <p className="text-sm text-muted-foreground">
                            {photo.date}
                          </p>
                        </div>
                        <Badge variant="secondary">{photo.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entries" className="space-y-3 mt-4">
          {journalEntries.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{entry.day}</p>
                      <p className="text-sm text-muted-foreground">
                        {entry.date}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">{t('patient.journal.history.pain')}</p>
                    <p
                      className={`font-semibold ${entry.pain >= 7
                          ? "text-destructive"
                          : entry.pain >= 4
                            ? "text-warning"
                            : "text-success"
                        }`}
                    >
                      {entry.pain}/10
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t('patient.journal.history.temperature')}</p>
                    <p
                      className={`font-semibold ${entry.temperature >= 38
                          ? "text-destructive"
                          : entry.temperature >= 37.5
                            ? "text-warning"
                            : "text-foreground"
                        }`}
                    >
                      {entry.temperature}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t('patient.journal.history.medication')}</p>
                    <p
                      className={`font-semibold ${entry.medicationTaken ? "text-success" : "text-destructive"}`}
                    >
                      {entry.medicationTaken ? t('patient.journal.history.medsTaken') : t('patient.journal.history.medsNotTaken')}
                    </p>
                  </div>
                </div>

                {entry.symptoms.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {entry.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                )}

                {entry.hasPhoto && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Camera className="h-3 w-3" />
                    <span>{t('patient.journal.history.photoAdded')}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
