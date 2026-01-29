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

interface AlertPopupProps {
  type: "fever" | "pain" | "hematuria" | "retention" | "infection";
  value?: number | string;
  isOpen: boolean;
  onClose: () => void;
  onContactTeam: () => void;
}

const alertConfig = {
  fever: {
    title: "Fièvre détectée",
    icon: Thermometer,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
    description: "Votre température est supérieure à 38°C",
    advice: [
      "Prenez du paracétamol si vous en avez",
      "Buvez beaucoup d'eau",
      "Reposez-vous",
      "Surveillez votre température toutes les 4 heures",
    ],
    urgent:
      "Si la fièvre persiste plus de 24h ou dépasse 39°C, contactez immédiatement votre équipe médicale ou rendez-vous aux urgences.",
  },
  pain: {
    title: "Douleur sévère signalée",
    icon: Activity,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
    description: "Vous avez indiqué une douleur ≥ 7/10",
    advice: [
      "Prenez vos antalgiques prescrits",
      "Allongez-vous confortablement",
      "Appliquez une poche de glace si approprié",
      "Respirez profondément et calmement",
    ],
    urgent:
      "Si la douleur ne diminue pas dans les 2 heures ou s'aggrave, contactez votre équipe médicale.",
  },
  hematuria: {
    title: "Hématurie persistante",
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/20",
    description: "Présence de sang dans les urines signalée",
    advice: [
      "Augmentez votre consommation d'eau",
      "Évitez les efforts physiques",
      "Notez la couleur et la quantité",
      "Surveillez l'évolution",
    ],
    urgent:
      "Si le saignement est abondant ou s'accompagne de caillots, contactez immédiatement votre équipe médicale.",
  },
  retention: {
    title: "Suspicion de rétention urinaire",
    icon: AlertCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
    description: "Difficulté ou impossibilité d'uriner signalée",
    advice: [
      "Essayez de vous détendre",
      "Prenez un bain chaud si possible",
      "Essayez la position assise",
      "Ne forcez pas",
    ],
    urgent:
      "La rétention urinaire est une urgence médicale. Si vous ne pouvez pas uriner depuis plus de 6 heures, rendez-vous aux urgences.",
  },
  infection: {
    title: "Signes d'infection possibles",
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/20",
    description: "Symptômes évocateurs d'une infection détectés",
    advice: [
      "Surveillez votre température",
      "Observez la cicatrice (rougeur, écoulement)",
      "Notez tout changement",
      "Prenez des photos si nécessaire",
    ],
    urgent:
      "Si vous avez de la fièvre, des frissons ou si la plaie devient rouge et chaude, contactez votre équipe médicale rapidement.",
  },
};

export function AlertPopup({
  type,
  value,
  isOpen,
  onClose,
  onContactTeam,
}: AlertPopupProps) {
  const config = alertConfig[type];
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
            <h4 className="font-medium text-sm mb-2">Conseils immédiats :</h4>
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
            Contacter mon équipe
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full gap-2 bg-transparent">
            <X className="h-4 w-4" />
            J'ai compris
          </Button>
          <a href="tel:15" className="w-full">
            <Button variant="destructive" className="w-full gap-2">
              <Phone className="h-4 w-4" />
              Appeler les urgences (15)
            </Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Demo component to show how alerts work
export function AlertDemo() {
  const [alertType, setAlertType] = useState<
    "fever" | "pain" | "hematuria" | "retention" | "infection" | null
  >(null);

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Démonstration des alertes</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAlertType("fever")}
        >
          Fièvre
        </Button>
        <Button variant="outline" size="sm" onClick={() => setAlertType("pain")}>
          Douleur sévère
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAlertType("hematuria")}
        >
          Hématurie
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAlertType("retention")}
        >
          Rétention
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAlertType("infection")}
        >
          Infection
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
