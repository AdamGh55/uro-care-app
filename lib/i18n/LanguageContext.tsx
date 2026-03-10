"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { dictionaries, Locale, AppDictionary } from "./dictionaries"

type LanguageContextType = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>("en");

    // Load saved locale from localStorage on mount
    useEffect(() => {
        const savedLocale = localStorage.getItem("urocare-locale") as Locale;
        if (savedLocale && (savedLocale === "en" || savedLocale === "fr")) {
            setLocaleState(savedLocale);
        }
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem("urocare-locale", newLocale);
    };

    // Helper function to resolve dot-notation paths (e.g., 'common.cancel')
    const t = (path: string): string => {
        const keys = path.split(".");
        let current: any = dictionaries[locale];

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation key not found: ${path}`);
                return path; // Fallback to the key itself
            }
            current = current[key];
        }
        return current;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
