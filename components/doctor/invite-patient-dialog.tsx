"use client";

import { useState } from "react";
import { Copy, Plus, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function InvitePatientDialog() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<"form" | "result">("form");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [copied, setCopied] = useState(false);

    const generateCode = () => {
        /* Validation disabled for testing
        if (!firstName || !lastName) {
            toast.error("Veuillez remplir le nom et le prénom");
            return;
        }
        */

        // Random code generator
        const code = "URO-" + Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedCode(code);

        // Save to LocalStorage (Mock Database)
        const newInvite = {
            code,
            firstName,
            lastName,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };

        const existingInvites = JSON.parse(localStorage.getItem('urocare_invites') || '[]');
        localStorage.setItem('urocare_invites', JSON.stringify([...existingInvites, newInvite]));

        setStep("result");
        toast.success(`Code généré pour ${firstName} ${lastName}`);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        toast.success("Code copié dans le presse-papier");
        setTimeout(() => setCopied(false), 2000);
    };

    const reset = () => {
        setStep("form");
        setFirstName("");
        setLastName("");
        setGeneratedCode("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nouveau Patient
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Inviter un patient</DialogTitle>
                    <DialogDescription>
                        Générez un code pour un nouveau patient. Ses informations seront pré-remplies.
                    </DialogDescription>
                </DialogHeader>

                {step === "form" ? (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Prénom</Label>
                                <Input
                                    id="firstName"
                                    placeholder="ex: Jean"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Nom</Label>
                                <Input
                                    id="lastName"
                                    placeholder="ex: Dupont"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Ces informations seront verrouillées pour le patient lors de l'inscription.
                        </p>
                    </div>
                ) : (
                    <div className="py-6 flex flex-col items-center justify-center space-y-4">
                        <div className="bg-muted p-6 rounded-xl border-dashed border-2 border-primary/20 text-center w-full">
                            <p className="text-sm text-muted-foreground mb-2">Code d'accès généré</p>
                            <div className="text-3xl font-mono font-bold tracking-wider text-primary">
                                {generatedCode}
                            </div>
                        </div>

                        <p className="text-sm text-center text-muted-foreground">
                            Partagez ce code avec <strong>{firstName} {lastName}</strong>.
                        </p>
                    </div>
                )}

                <DialogFooter>
                    {step === "form" ? (
                        <Button onClick={generateCode}>Générer le code</Button>
                    ) : (
                        <div className="flex gap-2 w-full">
                            <Button variant="outline" className="flex-1" onClick={reset}>
                                Terminer
                            </Button>
                            <Button className="flex-1 gap-2" onClick={copyToClipboard}>
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                {copied ? "Copié !" : "Copier"}
                            </Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
