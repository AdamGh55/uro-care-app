export type Locale = "en" | "fr";

// Define the structure of our dictionary to ensure type safety between English and French
export type AppDictionary = {
    common: {
        loading: string;
        cancel: string;
        save: string;
        continue: string;
        contact: string;
        logIn: string;
        signUp: string;
        submit: string;
    };
    landing: {
        nav: {
            features: string;
            clinics: string;
        };
        hero: {
            trusted: string;
            title: string;
            subtitle: string;
            cta: string;
            demo: string;
            badges: {
                hipaa: string;
                specialists: string;
                monitoring: string;
            };
        };
        impact: {
            tag: string;
            badge: string;
            stats: string;
            desc1: string;
            desc2: string;
            cards: {
                c1Tag: string;
                c1Title: string;
                c1Desc: string;
                c2Tag: string;
                c2Title: string;
                c2Desc: string;
            }
        };
        values: {
            title1: string;
            title2: string;
            standard: string;
            foundation: string;
            items: {
                compassion: string;
                collaboration: string;
                transparency: string;
                flexibility: string;
                excellence: string;
            };
            descriptions: {
                compassion: string;
                collaboration: string;
                transparency: string;
                flexibility: string;
                excellence: string;
            };
        };
        model: {
            tag: string;
            title: string;
            desc: string;
            overlay1: string;
            overlay2: string;
        };
        testimonials: {
            tag: string;
            title: string;
            reviews: {
                r1Title: string;
                r1Text: string;
                r1Role: string;
                r2Text: string;
                r2Surgery: string;
                r3Title: string;
                r3Text: string;
                r3Role: string;
            }
        };
        blog: {
            tag: string;
            title: string;
            desc: string;
            cardTag: string;
            cardTitle: string;
            cardDesc: string;
            readMore: string;
        };
        newsletter: {
            title: string;
            desc: string;
            placeholder: string;
            btn: string;
        };
        footer: {
            col1: string;
            col1Links: { home: string; about: string; features: string; blog: string; contact: string };
            col2: string;
            col2Links: { journey: string; alerts: string; messaging: string; library: string; tour: string; checkin: string };
            col3: string;
            col3Links: { specialists: string; join: string; dashboard: string; how: string };
            copyright: string;
        };
    };
    navigation: {
        patientDashboard: string;
        myTasks: string;
        dailyCheckIn: string;
        messages: string;
        doctorDashboard: string;
        patients: string;
        alerts: string;
        logOut: string;
        switchLanguage: string;
        timeline: string;
        journal: string;
        tour: string;
        library: string;
        profile: string;
    };
    auth: {
        login: {
            backHome: string;
            welcome: string;
            selectSpace: string;
            patient: string;
            patientDesc: string;
            patientDetails: string;
            patientBtn: string;
            doctor: string;
            doctorDesc: string;
            doctorDetails: string;
            doctorBtn: string;
        };
        onboarding: {
            badge: string;
            codeTitle: string;
            codeDesc: string;
            enterCode: string;
            verifyBtn: string;
            noCodeInfo: string;
            stepOf: string;
            step1Title: string;
            firstName: string;
            lastName: string;
            email: string;
            emailPlaceholder: string;
            password: string;
            passwordPlaceholder: string;
            prev: string;
            next: string;
            finish: string;
        };
    };
    patient: {
        dashboard: {
            hello: string;
            postOpDay: string;
            surgery: string;
            nextTask: string;
            allDone: string;
            todayCheckin: string;
            completed: string;
            notDone: string;
            activeAlerts: string;
            nextAppt: string;
            nextStepsTitle: string;
            viewAll: string;
            nextStepsDesc: string;
            timelineProgress: string;
            due: string;
            inProgress: string;
            dailyCheckinTitle: string;
            dailyCheckinDesc: string;
            checkinComplete: string;
            checkinTime: string;
            viewHistory: string;
            checkinRequired: string;
            checkinRequiredDesc: string;
            startCheckin: string;
            trendsTitle: string;
            trendsDesc: string;
            painLevel: string;
            improving: string;
            increasing: string;
            stable: string;
            fromYesterday: string;
            temperature: string;
            decreasing: string;
            rising: string;
        };
    };
};

const en: AppDictionary = {
    common: {
        loading: "Loading...",
        cancel: "Cancel",
        save: "Save",
        continue: "Continue",
        contact: "Contact",
        logIn: "Log In",
        signUp: "Sign Up",
        submit: "Submit"
    },
    landing: {
        nav: {
            features: "Features",
            clinics: "Clinicians",
        },
        hero: {
            trusted: "Trusted by 10,000+ Patients",
            title: "Your Trusted Partner in Modern Healthcare.",
            subtitle: "We connect patients and specialists effortlessly. From pre-op preparation to full recovery, experience a smarter, safer journey.",
            cta: "Start Here",
            demo: "Watch Demo",
            badges: {
                hipaa: "HIPAA Compliant",
                specialists: "Verified Specialists",
                monitoring: "24/7 Monitoring",
            }
        },
        impact: {
            tag: "About Us",
            badge: "Our Impact",
            stats: "Healthcare Professionals \nSupporting Lives Worldwide",
            desc1: "UroCare Clinic",
            desc2: " connects doctors and patients effortlessly, providing smarter, safer, and compassionate healthcare from diagnosis to full recovery.",
            cards: {
                c1Tag: "Connected Care",
                c1Title: "Smart Care",
                c1Desc: "Smart digital health tracking ensures accurate insights and better outcomes.",
                c2Tag: "Data Privacy",
                c2Title: "Secure Data",
                c2Desc: "Protecting patient data through secure, HIPAA-compliant digital health systems."
            }
        },
        values: {
            title1: "A Simplified Path to",
            title2: "Comprehensive Medical Care",
            standard: "UroCare Standard",
            foundation: "We believe {value} is the foundation of modern healing.",
            items: {
                compassion: "Compassion",
                collaboration: "Collaboration",
                transparency: "Transparency",
                flexibility: "Flexibility",
                excellence: "Excellence"
            },
            descriptions: {
                compassion: "We treat every patient with the same care we'd give our own family.",
                collaboration: "Your entire care team works together in realtime sync.",
                transparency: "Clear pricing, clear steps. No hidden surprises, ever.",
                flexibility: "Care that adapts to your schedule, not the other way around.",
                excellence: "World-class specialists committed to the best possible outcomes."
            }
        },
        model: {
            tag: "Approach",
            title: "The UroCare Total Care™ Model",
            desc: "Providing patient-centered care through expert guidance, innovative solutions, and personalized support every step of the way.",
            overlay1: "Our UroCare™ model unites doctors, specialists, and wellness experts.",
            overlay2: "From diagnostics to recovery, we ensure holistic healing."
        },
        testimonials: {
            tag: "Testimonials",
            title: "Real Stories, Real Healing — From Our Community",
            reviews: {
                r1Title: "Friendly staff review",
                r1Text: "\"The team made every step stress-free and supportive. I finally feel confident about my treatment.\"",
                r1Role: "Regular Patient",
                r2Text: "\"UroCare didn't just treat my condition; they treated me as a person. The continuous monitoring gave me my life back.\"",
                r2Surgery: "Kidney Surgery • 2024",
                r3Title: "Seamless experience",
                r3Text: "\"User friendly, clear instructions, and I felt connected to my care team the whole time.\"",
                r3Role: "Regular Patient"
            }
        },
        blog: {
            tag: "Blog",
            title: "Explore Expert Insights for a Healthier, Happier Life",
            desc: "Discover expert health insights, wellness advice, and medical updates to help you make informed decisions.",
            cardTag: "Health",
            cardTitle: "A Daily Habit for a Healthier Heart you create.",
            cardDesc: "Using corporate services is a fluctuating degree cause of world is the best brighter but ...",
            readMore: "Read More"
        },
        newsletter: {
            title: "Stay ahead of your recovery journey",
            desc: "Get expert insights, wellness guides, and urological health news — delivered monthly.",
            placeholder: "Enter Your Email",
            btn: "Subscribe"
        },
        footer: {
            col1: "Quick Links",
            col1Links: { home: "Home", about: "About", features: "Features", blog: "Blog", contact: "Contact" },
            col2: "Our Platform",
            col2Links: { journey: "Patient Journey", alerts: "Alert System", messaging: "Secure Messaging", library: "Health Library", tour: "Virtual Tour", checkin: "Check-in Tools" },
            col3: "Professionals",
            col3Links: { specialists: "Our Specialists", join: "Join as Specialist", dashboard: "Pro Dashboard", how: "How It Works" },
            copyright: "© 2026 UroCare. All rights reserved."
        }
    },
    navigation: {
        patientDashboard: "Dashboard",
        myTasks: "My Tasks",
        dailyCheckIn: "Daily Check-in",
        messages: "Messages",
        doctorDashboard: "Dashboard",
        patients: "Patients",
        alerts: "Alerts",
        logOut: "Log out",
        switchLanguage: "Change Language",
        timeline: "My Journey",
        journal: "Journal",
        tour: "Virtual Tour",
        library: "Library",
        profile: "Profile"
    },
    auth: {
        login: {
            backHome: "Back to home",
            welcome: "Welcome to UroCare",
            selectSpace: "Select your portal to continue",
            patient: "Patient",
            patientDesc: "Access your personal portal",
            patientDetails: "View your medical file, appointments, and messages.",
            patientBtn: "Log In",
            doctor: "Professional",
            doctorDesc: "Reserved for clinicians",
            doctorDetails: "Manage patients, create invitations, and track care plans.",
            doctorBtn: "Pro Portal"
        },
        onboarding: {
            badge: "Profile Creation",
            codeTitle: "Access Code Required",
            codeDesc: "UroCare registration is strictly by clinician invitation.",
            enterCode: "Enter your code",
            verifyBtn: "Verify code",
            noCodeInfo: "If you don't have a code, please contact your urologist.",
            stepOf: "Step {current} of {total}",
            step1Title: "Account Creation",
            firstName: "First Name (Set by doctor)",
            lastName: "Last Name (Set by doctor)",
            email: "Email *",
            emailPlaceholder: "your@email.com",
            password: "Password *",
            passwordPlaceholder: "Choose a secure password",
            prev: "Previous",
            next: "Next",
            finish: "Finish"
        }
    },
    patient: {
        dashboard: {
            hello: "Hello, {name}",
            postOpDay: "Post-op Day {day}",
            surgery: "Surgery: {date}",
            nextTask: "Next Task",
            allDone: "All done!",
            todayCheckin: "Today's Check-in",
            completed: "Completed",
            notDone: "Not done",
            activeAlerts: "Active Alerts",
            nextAppt: "Next Appointment",
            nextStepsTitle: "Next Steps",
            viewAll: "View all",
            nextStepsDesc: "Your upcoming tasks in the recovery timeline",
            timelineProgress: "Timeline Progress",
            due: "Due: {date}",
            inProgress: "In progress",
            dailyCheckinTitle: "Daily Check-in",
            dailyCheckinDesc: "Complete your daily health assessment",
            checkinComplete: "Check-in Complete",
            checkinTime: "You completed today's check-in at {time}",
            viewHistory: "View history",
            checkinRequired: "Check-in Required",
            checkinRequiredDesc: "Complete your daily health assessment to track your recovery progress.",
            startCheckin: "Start Check-in",
            trendsTitle: "Your Trends",
            trendsDesc: "How your symptoms have been changing",
            painLevel: "Pain Level",
            improving: "Improving",
            increasing: "Increasing",
            stable: "Stable",
            fromYesterday: "from yesterday",
            temperature: "Temperature",
            decreasing: "Decreasing",
            rising: "Rising"
        }
    }
};

const fr: AppDictionary = {
    common: {
        loading: "Chargement...",
        cancel: "Annuler",
        save: "Enregistrer",
        continue: "Continuer",
        contact: "Contact",
        logIn: "Connexion",
        signUp: "S'inscrire",
        submit: "Soumettre"
    },
    landing: {
        nav: {
            features: "Fonctionnalités",
            clinics: "Cliniciens",
        },
        hero: {
            trusted: "Fait confiance à plus de 10 000 patients",
            title: "Votre partenaire de confiance en santé moderne.",
            subtitle: "Nous connectons les patients et les spécialistes sans effort. De la préparation préopératoire au rétablissement complet, vivez un parcours plus sûr et plus intelligent.",
            cta: "Commencer ici",
            demo: "Voir la démo",
            badges: {
                hipaa: "Conforme HIPAA",
                specialists: "Spécialistes vérifiés",
                monitoring: "Surveillance 24/7",
            }
        },
        impact: {
            tag: "À propos",
            badge: "Notre impact",
            stats: "Professionnels de santé \nSoutenant des vies partout",
            desc1: "La Clinique UroCare",
            desc2: " connecte médecins et patients facilement, offrant des soins de santé plus intelligents, plus sûrs et compatissants, du diagnostic au rétablissement complet.",
            cards: {
                c1Tag: "Soins connectés",
                c1Title: "Soins Intelligents",
                c1Desc: "Le suivi numérique intelligent de la santé garantit des informations précises et de meilleurs résultats.",
                c2Tag: "Confidentialité des données",
                c2Title: "Données Sécurisées",
                c2Desc: "Protéger les données des patients grâce à des systèmes de santé numériques sécurisés et conformes à l'HIPAA."
            }
        },
        values: {
            title1: "Un chemin simplifié vers",
            title2: "des soins médicaux complets",
            standard: "Standard UroCare",
            foundation: "Nous croyons que {value} est le fondement de la guérison moderne.",
            items: {
                compassion: "Compassion",
                collaboration: "Collaboration",
                transparency: "Transparence",
                flexibility: "Flexibilité",
                excellence: "Excellence"
            },
            descriptions: {
                compassion: "Nous traitons chaque patient avec le même soin que nous donnerions à notre propre famille.",
                collaboration: "Toute votre équipe de soins collabore en temps réel.",
                transparency: "Prix clairs, étapes claires. Pas de surprises cachées, jamais.",
                flexibility: "Des soins qui s'adaptent à votre emploi du temps, et non l'inverse.",
                excellence: "Des spécialistes de renommée mondiale engagés à obtenir les meilleurs résultats possibles."
            }
        },
        model: {
            tag: "Approche",
            title: "Le modèle global UroCare Total Care™",
            desc: "Fournir des soins centrés sur le patient grâce à des conseils d'experts, des solutions innovantes et un soutien personnalisé à chaque étape.",
            overlay1: "Notre modèle UroCare™ unit médecins, spécialistes et experts en bien-être.",
            overlay2: "Des diagnostics à la récupération, nous assurons une guérison holistique."
        },
        testimonials: {
            tag: "Témoignages",
            title: "De vraies histoires, de vraies guérisons — De notre communauté",
            reviews: {
                r1Title: "Avis sur le personnel chaleureux",
                r1Text: "\"L'équipe a rendu chaque étape sans stress et m'a soutenu. Je me sens enfin confiant concernant mon traitement.\"",
                r1Role: "Patient régulier",
                r2Text: "\"UroCare n'a pas seulement traité ma maladie ; ils m'ont traité comme une personne. La surveillance continue m'a redonné ma vie.\"",
                r2Surgery: "Chirurgie du rein • 2024",
                r3Title: "Expérience fluide",
                r3Text: "\"Convivial, instructions claires, et je me suis senti connecté à mon équipe de soins tout le temps.\"",
                r3Role: "Patient régulier"
            }
        },
        blog: {
            tag: "Blog",
            title: "Découvrez des avis d'experts pour une vie plus saine et heureuse",
            desc: "Découvrez des conseils de santé d'experts, des avis sur le bien-être et des mises à jour médicales pour vous aider à prendre des décisions éclairées.",
            cardTag: "Santé",
            cardTitle: "Une habitude quotidienne pour un cœur plus sain que vous créez.",
            cardDesc: "L'utilisation de services corporatifs est une cause fluctuante dans le monde, c'est mieux, mais ...",
            readMore: "Lire la suite"
        },
        newsletter: {
            title: "Gardez une longueur d'avance sur votre rétablissement",
            desc: "Obtenez des avis d'experts, des guides de bien-être et des nouvelles urologiques — livrés chaque mois.",
            placeholder: "Entrez votre email",
            btn: "S'abonner"
        },
        footer: {
            col1: "Liens Rapides",
            col1Links: { home: "Accueil", about: "À propos", features: "Fonctionnalités", blog: "Blog", contact: "Contact" },
            col2: "Notre Plateforme",
            col2Links: { journey: "Parcours patient", alerts: "Système d'alertes", messaging: "Messagerie sécurisée", library: "Bibliothèque de santé", tour: "Visite virtuelle", checkin: "Outils de check-in" },
            col3: "Professionnels",
            col3Links: { specialists: "Nos spécialistes", join: "Rejoindre en tant que spécialiste", dashboard: "Tableau de bord Pro", how: "Comment ça marche" },
            copyright: "© 2026 UroCare. Tous droits réservés."
        }
    },
    navigation: {
        patientDashboard: "Tableau de Bord",
        myTasks: "Mes Tâches",
        dailyCheckIn: "Suivi Quotidien",
        messages: "Messages",
        doctorDashboard: "Tableau de Bord",
        patients: "Patients",
        alerts: "Alertes",
        logOut: "Se déconnecter",
        switchLanguage: "Changer de langue",
        timeline: "Mon parcours",
        journal: "Journal",
        tour: "Visite du bloc",
        library: "Bibliothèque",
        profile: "Profil"
    },
    auth: {
        login: {
            backHome: "Retour à l'accueil",
            welcome: "Bienvenue sur UroCare",
            selectSpace: "Sélectionnez votre espace pour continuer",
            patient: "Patient",
            patientDesc: "Accédez à votre espace personnel",
            patientDetails: "Consultez votre dossier, vos rendez-vous et vos messages.",
            patientBtn: "Me connecter",
            doctor: "Professionnel",
            doctorDesc: "Accès réservé aux médecins",
            doctorDetails: "Gérez vos patients, créez des invitations et suivez les parcours de soins.",
            doctorBtn: "Espace Pro"
        },
        onboarding: {
            badge: "Création du profil",
            codeTitle: "Code d'accès requis",
            codeDesc: "L'inscription à UroCare se fait uniquement sur invitation de votre praticien.",
            enterCode: "Entrez votre code",
            verifyBtn: "Vérifier le code",
            noCodeInfo: "Si vous n'avez pas de code, veuillez contacter votre urologue.",
            stepOf: "Étape {current} sur {total}",
            step1Title: "Création du compte",
            firstName: "Prénom (Défini par le médecin)",
            lastName: "Nom (Défini par le médecin)",
            email: "Email *",
            emailPlaceholder: "votre@email.com",
            password: "Mot de passe *",
            passwordPlaceholder: "Choisissez un mot de passe sécurisé",
            prev: "Précédent",
            next: "Suivant",
            finish: "Terminer"
        }
    },
    patient: {
        dashboard: {
            hello: "Bonjour, {name}",
            postOpDay: "Jour post-op {day}",
            surgery: "Chirurgie: {date}",
            nextTask: "Prochaine tâche",
            allDone: "Tout est terminé !",
            todayCheckin: "Suivi du jour",
            completed: "Terminé",
            notDone: "Non fait",
            activeAlerts: "Alertes actives",
            nextAppt: "Prochain RDV",
            nextStepsTitle: "Prochaines étapes",
            viewAll: "Voir tout",
            nextStepsDesc: "Vos prochaines tâches dans le parcours de récupération",
            timelineProgress: "Progression",
            due: "À faire avant le: {date}",
            inProgress: "En cours",
            dailyCheckinTitle: "Suivi quotidien",
            dailyCheckinDesc: "Complétez votre évaluation de santé quotidienne",
            checkinComplete: "Suivi terminé",
            checkinTime: "Vous avez complété le suivi aujourd'hui à {time}",
            viewHistory: "Historique",
            checkinRequired: "Suivi requis",
            checkinRequiredDesc: "Complétez votre évaluation quotidienne pour suivre votre récupération.",
            startCheckin: "Commencer le suivi",
            trendsTitle: "Vos tendances",
            trendsDesc: "Évolution de vos symptômes",
            painLevel: "Niveau de douleur",
            improving: "En amélioration",
            increasing: "En augmentation",
            stable: "Stable",
            fromYesterday: "par rapport à hier",
            temperature: "Température",
            decreasing: "En baisse",
            rising: "En hausse"
        }
    }
};

export const dictionaries: Record<Locale, AppDictionary> = { en, fr };
