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
        checkin: {
            title: string;
            subtitle: string;
            stepOf: string;
            steps: {
                symptoms: string;
                vitals: string;
                urination: string;
                wound: string;
                summary: string;
            };
            painScale: string;
            noPain: string;
            severePain: string;
            painAlert: string;
            nausea: string;
            dizziness: string;
            fatigueTitle: string;
            fatigue: {
                mild: string;
                moderate: string;
                severe: string;
            };
            temperature: string;
            tempNormal: string;
            tempAlert: string;
            heartRate: string;
            hrNormal: string;
            urinationProblems: string;
            urinationProblemsList: {
                none: string;
                mild: string;
                severe: string;
            };
            burning: string;
            hematuria: string;
            transit: string;
            transitList: {
                normal: string;
                constipation: string;
                diarrhea: string;
            };
            gas: string;
            woundConcerns: string;
            woundList: {
                none: string;
                redness: string;
                swelling: string;
                fluid: string;
            };
            photoTitle: string;
            photoDesc: string;
            photoBtn: string;
            medsTitle: string;
            medsList: {
                yes: string;
                partial: string;
                no: string;
            };
            notesTitle: string;
            notesPlaceholder: string;
            summaryTitle: string;
            summaryFields: {
                pain: string;
                temp: string;
                nausea: string;
                dizziness: string;
                fatigue: string;
                urination: string;
                hematuria: string;
                transit: string;
                wound: string;
                meds: string;
            };
            summaryWarnTitle: string;
            summaryWarnDesc: string;
            btnPrev: string;
            btnNext: string;
            btnSubmit: string;
            submittedTitle: string;
            submittedWarnTitle: string;
            submittedWarnBadge: string;
            submittedOkTitle: string;
            submittedOkBadge: string;
            btnDashboard: string;
            btnJournal: string;
            yes: string;
            no: string;
        };
        alerts: {
            fever: {
                title: string;
                desc: string;
                advice: { "1": string; "2": string; "3": string; "4": string; };
                urgent: string;
            };
            pain: {
                title: string;
                desc: string;
                advice: { "1": string; "2": string; "3": string; "4": string; };
                urgent: string;
            };
            hematuria: {
                title: string;
                desc: string;
                advice: { "1": string; "2": string; "3": string; "4": string; };
                urgent: string;
            };
            retention: {
                title: string;
                desc: string;
                advice: { "1": string; "2": string; "3": string; "4": string; };
                urgent: string;
            };
            infection: {
                title: string;
                desc: string;
                advice: { "1": string; "2": string; "3": string; "4": string; };
                urgent: string;
            };
            settings: {
                immediateAdvice: string;
                btnContact: string;
                btnUnderstood: string;
                btnEmergency: string;
                demoTitle: string;
                demoFever: string;
                demoPain: string;
                demoHematuria: string;
                demoRetention: string;
                demoInfection: string;
            };
        };
        timeline: {
            title: string;
            subtitle: string;
            progressTitle: string;
            tasksCompleted: string;
            filters: {
                all: string;
                dueSoon: string;
                completed: string;
            };
            phases: {
                before: string;
                surgeryDay: string;
                after: string;
                followUp: string;
            };
            status: {
                done: string;
                inProgress: string;
                notStarted: string;
            };
            buttons: {
                remind: string;
                done: string;
            };
            reminder: {
                title: string;
                desc: string;
                dateLabel: string;
                timeLabel: string;
                cancel: string;
                setReminder: string;
            };
        };
        journal: {
            title: string;
            subtitle: string;
            fullHistory: string;
            painTrend: string;
            tempTrend: string;
            trends: {
                improving: string;
                worsening: string;
                stable: string;
                decreasing: string;
                rising: string;
            };
            historyTitle: string;
            historyDesc: string;
            status: {
                normal: string;
                attention: string;
            };
            details: {
                title: string;
                symptoms: string;
                painLevel: string;
                nausea: string;
                dizziness: string;
                fatigue: string;
                vitals: string;
                temperature: string;
                heartRate: string;
                surgerySpecific: string;
                bleeding: string;
                urination: string;
                wound: string;
            };
            history: {
                title: string;
                subtitle: string;
                avgPain: string;
                pts: string;
                avgTemp: string;
                woundPhotos: string;
                tabs: {
                    charts: string;
                    photos: string;
                    entries: string;
                };
                painChartTitle: string;
                pain: string;
                painLow: string;
                painModerate: string;
                painSevere: string;
                tempChartTitle: string;
                temperature: string;
                tempNormal: string;
                tempWarning: string;
                tempFever: string;
                photosTitle: string;
                photoPlaceholder: string;
                medication: string;
                medsTaken: string;
                medsNotTaken: string;
                photoAdded: string;
            };
        };
        messages: {
            title: string;
            subtitle: string;
            newMessage: string;
            search: string;
            conversationList: string;
            doctorName: string;
            careTeam: string;
            typeMessage: string;
            send: string;
            loading: string;
            dialogDesc: string;
            dialogPlaceholder: string;
            cancel: string;
            sendMessage: string;
        };
        library: {
            back: string;
            video: string;
            intro: string;
            introDesc: string;
            keyPoints: string;
            keyPointsList: {
                info: string;
                practical: string;
                signs: string;
                resources: string;
            };
            recommendations: string;
            recommendationsDesc: string;
            needHelp: string;
            helpDesc: string;
            readingTime: string;
            videoIncluded: string;
            title: string;
            subtitle: string;
            search: string;
            tabs: {
                categories: string;
                all: string;
                favorites: string;
            };
            allCategories: string;
            articleCount: string;
            readTimeSuffix: string;
            noFavorites: string;
            noFavoritesDesc: string;
        };
        tour: {
            title: string;
            subtitle: string;
            stepXofY: string;
            stepsViewed: string;
            clickToStart: string;
            durationLabel: string;
            practicalAdvice: string;
            previous: string;
            understood: string;
            next: string;
        };
        profile: {
            title: string;
            subtitle: string;
            surgeryInfo: string;
            surgeryType: string;
            surgeryDate: string;
            surgeon: string;
            recoveryDay: string;
            postOpDay: string;
            emergencyContact: string;
            notificationSettings: string;
            manageNotifications: string;
            pushNotifications: string;
            receiveReminders: string;
            dailyReminderTime: string;
            whenToRemind: string;
            logout: string;
        };
        doctor: {
            dashboard: {
                settings: string;
                support: string;
                subtitle: string;
                activePatients: string;
                activePatientsDesc: string;
                checkinAlerts: string;
                checkinAlertsDesc: string;
                latestCheckins: string;
                noRecentCheckins: string;
                recentPatients: string;
                recentPatientsDesc: string;
                searchPatient: string;
                name: string;
                status: string;
                procedure: string;
                surgeryDate: string;
                actions: string;
                viewRecord: string;
                sendMessage: string;
                archive: string;
                patient: string;
                patientStatus: {
                    preOp: string;
                    waiting: string;
                };
            };
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
        },
        checkin: {
            title: "Daily Check-in",
            subtitle: "How are you feeling today?",
            stepOf: "Step {current} of {total}",
            steps: {
                symptoms: "General Symptoms",
                vitals: "Vitals",
                urination: "Urination & Transit",
                wound: "Wound & Meds",
                summary: "Summary"
            },
            painScale: "Pain Level (VAS): {level}/10",
            noPain: "No pain",
            severePain: "Severe pain",
            painAlert: "Warning: severe pain reported",
            nausea: "Do you have nausea?",
            dizziness: "Do you feel dizzy?",
            fatigueTitle: "What is your fatigue level?",
            fatigue: {
                mild: "Mild",
                moderate: "Moderate",
                severe: "Severe"
            },
            temperature: "Temperature (°C)",
            tempNormal: "Normal range: 36.1°C - 37.2°C",
            tempAlert: "Warning: temperature above 38°C",
            heartRate: "Heart Rate (optional)",
            hrNormal: "Normal resting rate: 60-100 bpm",
            urinationProblems: "Difficulty urinating (dysuria)?",
            urinationProblemsList: {
                none: "None",
                mild: "Mild",
                severe: "Severe"
            },
            burning: "Burning sensation during urination?",
            hematuria: "Blood in urine (hematuria)?",
            transit: "How is your transit?",
            transitList: {
                normal: "Normal",
                constipation: "Constipation",
                diarrhea: "Diarrhea"
            },
            gas: "Emission of gas/stool?",
            woundConcerns: "Scar condition?",
            woundList: {
                none: "Normal",
                redness: "Redness",
                swelling: "Swelling",
                fluid: "Discharge"
            },
            photoTitle: "Scar photo (optional)",
            photoDesc: "Take a picture of your scar",
            photoBtn: "Take photo",
            medsTitle: "Have you taken your medications?",
            medsList: {
                yes: "Yes, all",
                partial: "Partially",
                no: "No"
            },
            notesTitle: "Additional Notes",
            notesPlaceholder: "Describe any other symptoms or concerns...",
            summaryTitle: "Verify your answers before submitting:",
            summaryFields: {
                pain: "Pain (VAS)",
                temp: "Temperature",
                nausea: "Nausea",
                dizziness: "Dizziness",
                fatigue: "Fatigue",
                urination: "Urination difficulty",
                hematuria: "Hematuria",
                transit: "Transit",
                wound: "Scar condition",
                meds: "Medications taken"
            },
            summaryWarnTitle: "Attention",
            summaryWarnDesc: "Some of your answers require special attention. Your care team will be alerted.",
            btnPrev: "Previous",
            btnNext: "Next",
            btnSubmit: "Submit check-in",
            submittedTitle: "Check-in Submitted",
            submittedWarnTitle: "We recommend you contact your care team.",
            submittedWarnBadge: "Some values require attention",
            submittedOkTitle: "Everything looks normal today! Continue your recovery.",
            submittedOkBadge: "All values are normal",
            btnDashboard: "Back to dashboard",
            btnJournal: "View journal",
            yes: "Yes",
            no: "No"
        },
        alerts: {
            fever: {
                title: "Fever detected",
                desc: "Your temperature is above 38°C",
                advice: {
                    "1": "Take paracetamol if you have any",
                    "2": "Drink plenty of water",
                    "3": "Rest",
                    "4": "Monitor your temperature every 4 hours"
                },
                urgent: "If the fever persists for more than 24 hours or exceeds 39°C, contact your medical team immediately or go to the emergency room."
            },
            pain: {
                title: "Severe pain reported",
                desc: "You reported a pain level ≥ 7/10",
                advice: {
                    "1": "Take your prescribed painkillers",
                    "2": "Lie down comfortably",
                    "3": "Apply an ice pack if appropriate",
                    "4": "Breathe deeply and calmly"
                },
                urgent: "If the pain does not subside within 2 hours or gets worse, contact your medical team."
            },
            hematuria: {
                title: "Persistent hematuria",
                desc: "Presence of blood in urine reported",
                advice: {
                    "1": "Increase your water intake",
                    "2": "Avoid physical exertion",
                    "3": "Note the color and quantity",
                    "4": "Monitor the evolution"
                },
                urgent: "If bleeding is heavy or accompanied by clots, contact your medical team immediately."
            },
            retention: {
                title: "Suspected urinary retention",
                desc: "Difficulty or inability to urinate reported",
                advice: {
                    "1": "Try to relax",
                    "2": "Take a warm bath if possible",
                    "3": "Try sitting",
                    "4": "Do not force"
                },
                urgent: "Urinary retention is a medical emergency. If you haven't been able to urinate for more than 6 hours, go to the emergency room."
            },
            infection: {
                title: "Possible signs of infection",
                desc: "Symptoms suggestive of an infection detected",
                advice: {
                    "1": "Monitor your temperature",
                    "2": "Observe the scar (redness, discharge)",
                    "3": "Note any changes",
                    "4": "Take photos if necessary"
                },
                urgent: "If you have a fever, chills, or if the wound becomes red and hot, contact your medical team quickly."
            },
            settings: {
                immediateAdvice: "Immediate advice:",
                btnContact: "Contact my team",
                btnUnderstood: "I understand",
                btnEmergency: "Call emergencies (911)",
                demoTitle: "Alerts Demonstration",
                demoFever: "Fever",
                demoPain: "Severe Pain",
                demoHematuria: "Hematuria",
                demoRetention: "Retention",
                demoInfection: "Infection"
            }
        },
        timeline: {
            title: "Recovery Timeline",
            subtitle: "Track your progress through each phase of your recovery.",
            progressTitle: "Overall Progress",
            tasksCompleted: "{completed} of {total} tasks completed",
            filters: {
                all: "All",
                dueSoon: "Due Soon",
                completed: "Completed"
            },
            phases: {
                before: "Before surgery",
                surgeryDay: "Surgery day",
                after: "After surgery",
                followUp: "Follow-up"
            },
            status: {
                done: "Done",
                inProgress: "In Progress",
                notStarted: "Not Started"
            },
            buttons: {
                remind: "Remind",
                done: "Done"
            },
            reminder: {
                title: "Set Reminder",
                desc: "Get notified about: {task}",
                dateLabel: "Reminder Date",
                timeLabel: "Reminder Time",
                cancel: "Cancel",
                setReminder: "Set Reminder"
            }
        },
        journal: {
            title: "Journal",
            subtitle: "View your history and track your recovery trends.",
            fullHistory: "Full History",
            painTrend: "Pain Trend",
            tempTrend: "Temperature Trend",
            trends: {
                improving: "improving",
                worsening: "worsening",
                stable: "stable",
                decreasing: "decreasing",
                rising: "rising"
            },
            historyTitle: "Check-in History",
            historyDesc: "Click on an entry to view details",
            status: {
                normal: "Normal",
                attention: "Attention"
            },
            details: {
                title: "Check-in Details",
                symptoms: "General Symptoms",
                painLevel: "Pain Level",
                nausea: "Nausea",
                dizziness: "Dizziness",
                fatigue: "Fatigue",
                vitals: "Vitals",
                temperature: "Temperature",
                heartRate: "Heart Rate",
                surgerySpecific: "Surgery-specific",
                bleeding: "Bleeding",
                urination: "Urination Problems",
                wound: "Wound Concerns"
            },
            history: {
                title: "Journal History",
                subtitle: "Evolution of your symptoms since the intervention",
                avgPain: "Average Pain",
                pts: "pts",
                avgTemp: "Average Temp.",
                woundPhotos: "Wound Photos",
                tabs: {
                    charts: "Charts",
                    photos: "Photos",
                    entries: "Entries"
                },
                painChartTitle: "Pain Evolution (VAS)",
                pain: "Pain",
                painLow: "0-3: Mild",
                painModerate: "4-6: Moderate",
                painSevere: "7-10: Severe",
                tempChartTitle: "Temperature Evolution",
                temperature: "Temperature",
                tempNormal: "< 37.5°C: Normal",
                tempWarning: "37.5-38°C: Low grade fever",
                tempFever: "> 38°C: Fever",
                photosTitle: "Scar Photos",
                photoPlaceholder: "Scar Photo",
                medication: "Medication",
                medsTaken: "Taken",
                medsNotTaken: "Not taken",
                photoAdded: "Photo added"
            }
        },
        messages: {
            title: "Messages",
            subtitle: "Communicate with your care team",
            newMessage: "New Message",
            search: "Search messages...",
            conversationList: "conversation list",
            doctorName: "Dr. Chen's Office",
            careTeam: "Your care team",
            typeMessage: "Type a message...",
            send: "Send",
            loading: "Loading conversation...",
            dialogDesc: "Send a message to your care team.",
            dialogPlaceholder: "Type your message here...",
            cancel: "Cancel",
            sendMessage: "Send Message"
        },
        library: {
            back: "Back to library",
            video: "Explanatory video",
            intro: "Introduction",
            introDesc: "This sheet presents the essential information about {title}. The information contained here has been validated by our medical team.",
            keyPoints: "Key Points",
            keyPointsList: {
                info: "Important information concerning the procedure or subject",
                practical: "Practical advice for your daily life",
                signs: "Signs to watch out for and when to consult",
                resources: "Additional resources available"
            },
            recommendations: "Recommendations",
            recommendationsDesc: "Follow the advice of your healthcare team and do not hesitate to ask questions during your consultations. Every patient is unique and recommendations can be adapted to your personal situation.",
            needHelp: "Need help?",
            helpDesc: "If you have questions, use the secure messaging to contact your healthcare team.",
            readingTime: "{time} read",
            videoIncluded: "Video included",
            title: "Urology Library",
            subtitle: "Educational content validated by our experts",
            search: "Search an article...",
            tabs: {
                categories: "Categories",
                all: "All articles",
                favorites: "Favorites"
            },
            allCategories: "All categories",
            articleCount: "articles",
            readTimeSuffix: "read",
            noFavorites: "No favorites",
            noFavoritesDesc: "Add articles to your favorites to find them easily"
        },
        tour: {
            title: "Operating Room Virtual Tour",
            subtitle: "Discover the patient journey on the day of your intervention",
            stepXofY: "Step {step} of {total}",
            stepsViewed: "{count} steps viewed",
            clickToStart: "Click to start the video",
            durationLabel: "Duration:",
            practicalAdvice: "Practical advice",
            previous: "Previous",
            understood: "Understood",
            next: "Next"
        },
        profile: {
            title: "Profile",
            subtitle: "Manage your account and preferences.",
            surgeryInfo: "Surgery Information",
            surgeryType: "Surgery Type",
            surgeryDate: "Surgery Date",
            surgeon: "Surgeon",
            recoveryDay: "Recovery Day",
            postOpDay: "Post-op Day {day}",
            emergencyContact: "Emergency Contact",
            notificationSettings: "Notification Settings",
            manageNotifications: "Manage how and when you receive notifications.",
            pushNotifications: "Push Notifications",
            receiveReminders: "Receive reminders for check-ins and tasks",
            dailyReminderTime: "Daily Reminder Time",
            whenToRemind: "When to remind you about check-ins",
            logout: "Log out"
        },
        doctor: {
            dashboard: {
                settings: "Settings",
                support: "Support",
                subtitle: "Overview of your patients and upcoming interventions.",
                activePatients: "Active Patients",
                activePatientsDesc: "+2 since last week",
                checkinAlerts: "Check-in Alerts",
                checkinAlertsDesc: "Patients requiring attention",
                latestCheckins: "Latest Check-ins",
                noRecentCheckins: "No recent check-ins.",
                recentPatients: "Recent Patients",
                recentPatientsDesc: "Manage records and track patient status.",
                searchPatient: "Search a patient...",
                name: "Name",
                status: "Status",
                procedure: "Procedure",
                surgeryDate: "Surgery Date",
                actions: "Actions",
                viewRecord: "View record",
                sendMessage: "Send message",
                archive: "Archive",
                patient: "Patient",
                patientStatus: {
                    preOp: "Pre-operative",
                    waiting: "Waiting"
                }
            }
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
        },
        checkin: {
            title: "Check-in quotidien",
            subtitle: "Comment vous sentez-vous aujourd'hui ?",
            stepOf: "Étape {current} sur {total}",
            steps: {
                symptoms: "Symptômes généraux",
                vitals: "Constantes",
                urination: "Mictions & Transit",
                wound: "Plaie & Médicaments",
                summary: "Récapitulatif"
            },
            painScale: "Niveau de douleur (EVA) : {level}/10",
            noPain: "Pas de douleur",
            severePain: "Douleur intense",
            painAlert: "Attention : douleur sévère signalée",
            nausea: "Avez-vous des nausées ?",
            dizziness: "Avez-vous des vertiges ?",
            fatigueTitle: "Comment est votre niveau de fatigue ?",
            fatigue: {
                mild: "Légère",
                moderate: "Modérée",
                severe: "Sévère"
            },
            temperature: "Température (°C)",
            tempNormal: "Plage normale : 36.1°C - 37.2°C",
            tempAlert: "Attention : température supérieure à 38°C",
            heartRate: "Fréquence cardiaque (optionnel)",
            hrNormal: "Fréquence normale au repos : 60-100 bpm",
            urinationProblems: "Difficultés à uriner (dysurie) ?",
            urinationProblemsList: {
                none: "Aucune",
                mild: "Légères",
                severe: "Sévères"
            },
            burning: "Brûlures urinaires ?",
            hematuria: "Sang dans les urines (hématurie) ?",
            transit: "Comment est votre transit ?",
            transitList: {
                normal: "Normal",
                constipation: "Constipation",
                diarrhea: "Diarrhée"
            },
            gas: "Émission de gaz/selles ?",
            woundConcerns: "État de la cicatrice ?",
            woundList: {
                none: "Normal",
                redness: "Rougeur",
                swelling: "Gonflement",
                fluid: "Écoulement"
            },
            photoTitle: "Photo de la cicatrice (optionnel)",
            photoDesc: "Prenez une photo de votre cicatrice",
            photoBtn: "Prendre une photo",
            medsTitle: "Avez-vous pris vos médicaments ?",
            medsList: {
                yes: "Oui, tous",
                partial: "Partiellement",
                no: "Non"
            },
            notesTitle: "Remarques supplémentaires",
            notesPlaceholder: "Décrivez tout autre symptôme ou préoccupation...",
            summaryTitle: "Vérifiez vos réponses avant d'envoyer :",
            summaryFields: {
                pain: "Douleur (EVA)",
                temp: "Température",
                nausea: "Nausées",
                dizziness: "Vertiges",
                fatigue: "Fatigue",
                urination: "Difficultés urinaires",
                hematuria: "Hématurie",
                transit: "Transit",
                wound: "État cicatrice",
                meds: "Médicaments pris"
            },
            summaryWarnTitle: "Attention",
            summaryWarnDesc: "Certaines de vos réponses nécessitent une attention particulière. Votre équipe soignante sera alertée.",
            btnPrev: "Précédent",
            btnNext: "Suivant",
            btnSubmit: "Envoyer le check-in",
            submittedTitle: "Check-in envoyé",
            submittedWarnTitle: "Nous vous recommandons de contacter votre équipe soignante.",
            submittedWarnBadge: "Certaines valeurs nécessitent attention",
            submittedOkTitle: "Tout semble normal aujourd'hui ! Continuez votre récupération.",
            submittedOkBadge: "Toutes les valeurs sont normales",
            btnDashboard: "Retour au tableau de bord",
            btnJournal: "Voir le journal",
            yes: "Oui",
            no: "Non"
        },
        alerts: {
            fever: {
                title: "Fièvre détectée",
                desc: "Votre température est supérieure à 38°C",
                advice: {
                    "1": "Prenez du paracétamol si vous en avez",
                    "2": "Buvez beaucoup d'eau",
                    "3": "Reposez-vous",
                    "4": "Surveillez votre température toutes les 4 heures"
                },
                urgent: "Si la fièvre persiste plus de 24h ou dépasse 39°C, contactez immédiatement votre équipe médicale ou rendez-vous aux urgences."
            },
            pain: {
                title: "Douleur sévère signalée",
                desc: "Vous avez indiqué une douleur ≥ 7/10",
                advice: {
                    "1": "Prenez vos antalgiques prescrits",
                    "2": "Allongez-vous confortablement",
                    "3": "Appliquez une poche de glace si approprié",
                    "4": "Respirez profondément et calmement"
                },
                urgent: "Si la douleur ne diminue pas dans les 2 heures ou s'aggrave, contactez votre équipe médicale."
            },
            hematuria: {
                title: "Hématurie persistante",
                desc: "Présence de sang dans les urines signalée",
                advice: {
                    "1": "Augmentez votre consommation d'eau",
                    "2": "Évitez les efforts physiques",
                    "3": "Notez la couleur et la quantité",
                    "4": "Surveillez l'évolution"
                },
                urgent: "Si le saignement est abondant ou s'accompagne de caillots, contactez immédiatement votre équipe médicale."
            },
            retention: {
                title: "Suspicion de rétention urinaire",
                desc: "Difficulté ou impossibilité d'uriner signalée",
                advice: {
                    "1": "Essayez de vous détendre",
                    "2": "Prenez un bain chaud si possible",
                    "3": "Essayez la position assise",
                    "4": "Ne forcez pas"
                },
                urgent: "La rétention urinaire est une urgence médicale. Si vous ne pouvez pas uriner depuis plus de 6 heures, rendez-vous aux urgences."
            },
            infection: {
                title: "Signes d'infection possibles",
                desc: "Symptômes évocateurs d'une infection détectés",
                advice: {
                    "1": "Surveillez votre température",
                    "2": "Observez la cicatrice (rougeur, écoulement)",
                    "3": "Notez tout changement",
                    "4": "Prenez des photos si nécessaire"
                },
                urgent: "Si vous avez de la fièvre, des frissons ou si la plaie devient rouge et chaude, contactez votre équipe médicale rapidement."
            },
            settings: {
                immediateAdvice: "Conseils immédiats :",
                btnContact: "Contacter mon équipe",
                btnUnderstood: "J'ai compris",
                btnEmergency: "Appeler les urgences (15)",
                demoTitle: "Démonstration des alertes",
                demoFever: "Fièvre",
                demoPain: "Douleur sévère",
                demoHematuria: "Hématurie",
                demoRetention: "Rétention",
                demoInfection: "Infection"
            }
        },
        timeline: {
            title: "Chronologie de récupération",
            subtitle: "Suivez vos progrès à chaque phase de votre récupération.",
            progressTitle: "Progression globale",
            tasksCompleted: "{completed} sur {total} tâches terminées",
            filters: {
                all: "Tout",
                dueSoon: "Bientôt",
                completed: "Terminé"
            },
            phases: {
                before: "Avant l'intervention",
                surgeryDay: "Jour J",
                after: "Après l'intervention",
                followUp: "Suivi"
            },
            status: {
                done: "Terminé",
                inProgress: "En cours",
                notStarted: "Non commencé"
            },
            buttons: {
                remind: "Rappel",
                done: "Fait"
            },
            reminder: {
                title: "Définir un rappel",
                desc: "Être alerté concernant : {task}",
                dateLabel: "Date du rappel",
                timeLabel: "Heure du rappel",
                cancel: "Annuler",
                setReminder: "Définir le rappel"
            }
        },
        journal: {
            title: "Journal",
            subtitle: "Consultez votre historique et suivez vos tendances de récupération.",
            fullHistory: "Historique complet",
            painTrend: "Tendance douleur",
            tempTrend: "Tendance température",
            trends: {
                improving: "en amélioration",
                worsening: "en aggravation",
                stable: "stable",
                decreasing: "en baisse",
                rising: "en hausse"
            },
            historyTitle: "Historique des Check-ins",
            historyDesc: "Cliquez sur une entrée pour voir les détails",
            status: {
                normal: "Normal",
                attention: "Attention"
            },
            details: {
                title: "Détails du Check-in",
                symptoms: "Symptômes généraux",
                painLevel: "Niveau de douleur",
                nausea: "Nausées",
                dizziness: "Vertiges",
                fatigue: "Fatigue",
                vitals: "Constantes",
                temperature: "Température",
                heartRate: "Fréquence cardiaque",
                surgerySpecific: "Spécifique à l'intervention",
                bleeding: "Saignement",
                urination: "Problèmes urinaires",
                wound: "État de la plaie"
            },
            history: {
                title: "Historique du journal",
                subtitle: "Évolution de vos symptômes depuis l'intervention",
                avgPain: "Douleur moyenne",
                pts: "pts",
                avgTemp: "Température moyenne",
                woundPhotos: "Photos de plaie",
                tabs: {
                    charts: "Graphiques",
                    photos: "Photos",
                    entries: "Entrées"
                },
                painChartTitle: "Évolution de la douleur (EVA)",
                pain: "Douleur",
                painLow: "0-3: Faible",
                painModerate: "4-6: Modérée",
                painSevere: "7-10: Sévère",
                tempChartTitle: "Évolution de la température",
                temperature: "Température",
                tempNormal: "< 37.5°C: Normal",
                tempWarning: "37.5-38°C: Subfébrile",
                tempFever: "> 38°C: Fièvre",
                photosTitle: "Photos de la cicatrice",
                photoPlaceholder: "Photo de cicatrice",
                medication: "Médicaments",
                medsTaken: "Pris",
                medsNotTaken: "Non pris",
                photoAdded: "Photo ajoutée"
            }
        },
        messages: {
            title: "Messages",
            subtitle: "Communiquez avec votre équipe de soins",
            newMessage: "Nouveau message",
            search: "Rechercher des messages...",
            conversationList: "liste de conversation",
            doctorName: "Cabinet du Dr. Chen",
            careTeam: "Votre équipe de soins",
            typeMessage: "Tapez un message...",
            send: "Envoyer",
            loading: "Chargement de la conversation...",
            dialogDesc: "Envoyez un message à votre équipe de soins.",
            dialogPlaceholder: "Tapez votre message ici...",
            cancel: "Annuler",
            sendMessage: "Envoyer le message"
        },
        library: {
            back: "Retour à la bibliothèque",
            video: "Vidéo explicative",
            intro: "Introduction",
            introDesc: "Cette fiche vous présente les informations essentielles sur {title}. Les informations contenues ici ont été validées par notre équipe médicale.",
            keyPoints: "Points clés",
            keyPointsList: {
                info: "Information importante concernant la procédure ou le sujet",
                practical: "Conseils pratiques pour votre quotidien",
                signs: "Signes à surveiller et quand consulter",
                resources: "Ressources complémentaires disponibles"
            },
            recommendations: "Recommandations",
            recommendationsDesc: "Suivez les conseils de votre équipe soignante et n'hésitez pas à poser des questions lors de vos consultations. Chaque patient est unique et les recommandations peuvent être adaptées à votre situation personnelle.",
            needHelp: "Besoin d'aide ?",
            helpDesc: "Si vous avez des questions, utilisez la messagerie sécurisée pour contacter votre équipe soignante.",
            readingTime: "{time} lecture",
            videoIncluded: "Vidéo incluse",
            title: "Bibliothèque Urologique",
            subtitle: "Contenus éducatifs validés par nos experts",
            search: "Rechercher un article...",
            tabs: {
                categories: "Catégories",
                all: "Tous les articles",
                favorites: "Favoris"
            },
            allCategories: "Toutes les catégories",
            articleCount: "articles",
            readTimeSuffix: "de lecture",
            noFavorites: "Aucun favori",
            noFavoritesDesc: "Ajoutez des articles en favoris pour les retrouver facilement"
        },
        tour: {
            title: "Visite virtuelle du bloc",
            subtitle: "Découvrez le parcours patient le jour de votre intervention",
            stepXofY: "Étape {step} sur {total}",
            stepsViewed: "{count} étapes vues",
            clickToStart: "Cliquez pour démarrer la vidéo",
            durationLabel: "Durée:",
            practicalAdvice: "Conseils pratiques",
            previous: "Précédent",
            understood: "J'ai compris",
            next: "Suivant"
        },
        profile: {
            title: "Profil",
            subtitle: "Gérez votre compte et vos préférences.",
            surgeryInfo: "Informations sur l'intervention",
            surgeryType: "Type d'intervention",
            surgeryDate: "Date de l'intervention",
            surgeon: "Chirurgien",
            recoveryDay: "Jour de récupération",
            postOpDay: "Jour {day} post-op",
            emergencyContact: "Contact d'urgence",
            notificationSettings: "Paramètres de notification",
            manageNotifications: "Gérez comment et quand vous recevez des notifications.",
            pushNotifications: "Notifications push",
            receiveReminders: "Recevez des rappels pour les suivis et les tâches",
            dailyReminderTime: "Heure du rappel quotidien",
            whenToRemind: "À quelle heure vous rappeler les suivis",
            logout: "Se déconnecter"
        },
        doctor: {
            dashboard: {
                settings: "Paramètres",
                support: "Support",
                subtitle: "Aperçu de vos patients et interventions à venir.",
                activePatients: "Patients Actifs",
                activePatientsDesc: "+2 depuis la semaine dernière",
                checkinAlerts: "Alertes Check-in",
                checkinAlertsDesc: "Patients nécessitant attention",
                latestCheckins: "Derniers Check-ins",
                noRecentCheckins: "Aucun check-in récent.",
                recentPatients: "Patients récents",
                recentPatientsDesc: "Gérez les dossiers et suivez l'état des patients.",
                searchPatient: "Rechercher un patient...",
                name: "Nom",
                status: "Statut",
                procedure: "Intervention",
                surgeryDate: "Date Opération",
                actions: "Actions",
                viewRecord: "Voir le dossier",
                sendMessage: "Envoyer un message",
                archive: "Archiver",
                patient: "Patient",
                patientStatus: {
                    preOp: "Pré-opératoire",
                    waiting: "En attente"
                }
            }
        }
    }
};

export const dictionaries: Record<Locale, AppDictionary> = { en, fr };
