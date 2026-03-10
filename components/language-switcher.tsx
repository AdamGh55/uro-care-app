"use client"

import * as React from "react"
import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export function LanguageSwitcher() {
    const { locale, setLocale, t } = useLanguage()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" title={t("navigation.switchLanguage")}>
                    <Globe className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">{t("navigation.switchLanguage")}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => setLocale("en")}
                    className={locale === "en" ? "bg-accent" : ""}
                >
                    English
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLocale("fr")}
                    className={locale === "fr" ? "bg-accent" : ""}
                >
                    Français
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
