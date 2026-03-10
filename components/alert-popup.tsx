"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Thermometer,
  Activity,
  Phone,
  X,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AlertPopupProps {
  type: "fever" | "pain" | "hematuria" | "retention" | "infection";
  value?: number | string;
  isOpen: boolean;
  onClose: () => void;
  onContactTeam: () => void;
}

const getAlertConfig = (type: string, t: any) => {
  const configs = {
    fever: { icon: Thermometer, color: "text-destructive", bgColor: "bg-destructive/10", borderColor: "border-destructive/20" },
    pain: { icon: Activity, color: "text-destructive", bgColor: "bg-destructive/10", borderColor: "border-destructive/20" },
    hematuria: { icon: AlertTriangle, color: "text-warning", bgColor: "bg-warning/10", borderColor: "border-warning/20" },
    retention: { icon: AlertCircle, color: "text-destructive", bgColor: "bg-destructive/10", borderColor: "border-destructive/20" },
    infection: { icon: AlertTriangle, color: "text-warning", bgColor: "bg-warning/10", borderColor: "border-warning/20" }
  };

  const c = configs[type as keyof typeof configs];

  return {
    ...c,
    title: t(`patient.alerts.${type}.title`),
    description: t(`patient.alerts.${type}.desc`),
    advice: [
      t(`patient.alerts.${type}.advice.1`),
      t(`patient.alerts.${type}.advice.2`),
      t(`patient.alerts.${type}.advice.3`),
      t(`patient.alerts.${type}.advice.4`)
    ],
    urgent: t(`patient.alerts.${type}.urgent`)
  };
};

export function AlertPopup({
  type,
  value,
  isOpen,
  onClose,
  onContactTeam,
}: AlertPopupProps) {
  const { t } = useLanguage();
  const config = getAlertConfig(type, t);
  const Icon = config.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${config.bgColor}`}
            >
              <Icon className={`h-6 w-6 ${config.color}`} />
            </div>
            <div>
              <DialogTitle className={config.color}>{config.title}</DialogTitle>
              {value && (
                <Badge variant="outline" className="mt-1">
                  {type === "fever" ? `${value}°C` : type === "pain" ? `${value}/10` : value}
                </Badge>
              )}
            </div>
          </div>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">{t('patient.alerts.settings.immediateAdvice')}</h4>
            <ul className="space-y-2">
              {config.advice.map((advice, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{advice}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`p-3 rounded-lg border ${config.bgColor} ${config.borderColor}`}
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className={`h-4 w-4 mt-0.5 shrink-0 ${config.color}`} />
              <p className="text-sm">{config.urgent}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button onClick={onContactTeam} className="w-full gap-2">
            <MessageSquare className="h-4 w-4" />
            {t('patient.alerts.settings.btnContact')}
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full gap-2 bg-transparent">
            <X className="h-4 w-4" />
            {t('patient.alerts.settings.btnUnderstood')}
          </Button>
          <a href="tel:15" className="w-full">
            <Button variant="destructive" className="w-full gap-2">
              <Phone className="h-4 w-4" />
              {t('patient.alerts.settings.btnEmergency')}
            </Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AlertDemo() {
  const { t } = useLanguage();
  const [alertType, setAlertType] = useState<
    "fever" | "pain" | "hematuria" | "retention" | "infection" | null
  >(null);

  return (
    <div className="space-y-4">
      <h3 className="font-medium">{t('patient.alerts.settings.demoTitle')}</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAlertType("fever")}
        >
          {t('patient.alerts.settings.demoFever')}
        </Button>
        <Button variant="outline" size="sm" onClick={() => setAlertType("pain")}>
          {t('patient.alerts.settings.demoPain')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAlertType("hematuria")}
        >
          {t('patient.alerts.settings.demoHematuria')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAlertType("retention")}
        >
          {t('patient.alerts.settings.demoRetention')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAlertType("infection")}
        >
          {t('patient.alerts.settings.demoInfection')}
        </Button>
      </div>

      {alertType && (
        <AlertPopup
          type={alertType}
          value={alertType === "fever" ? 38.5 : alertType === "pain" ? 8 : undefined}
          isOpen={!!alertType}
          onClose={() => setAlertType(null)}
          onContactTeam={() => {
            setAlertType(null);
            // Navigate to messages
          }}
        />
      )}
    </div>
  );
}
