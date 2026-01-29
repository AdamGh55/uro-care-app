"use client";

import { useState } from "react";
import {
  Search,
  BookOpen,
  Stethoscope,
  Pill,
  Apple,
  Droplets,
  Heart,
  ChevronRight,
  Play,
  FileText,
  Star,
  StarOff,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  {
    id: "surgery",
    name: "Chirurgies",
    icon: Stethoscope,
    color: "bg-primary/10 text-primary",
    description: "Fiches sur les interventions urologiques",
  },
  {
    id: "preparation",
    name: "Préparation",
    icon: FileText,
    color: "bg-accent/10 text-accent",
    description: "Conseils avant l'intervention",
  },
  {
    id: "postop",
    name: "Post-opératoire",
    icon: Heart,
    color: "bg-success/10 text-success",
    description: "Suivi après chirurgie",
  },
  {
    id: "urology",
    name: "Urologie générale",
    icon: BookOpen,
    color: "bg-chart-4/10 text-chart-4",
    description: "Informations sur les pathologies",
  },
  {
    id: "nutrition",
    name: "Nutrition & Hydratation",
    icon: Apple,
    color: "bg-warning/10 text-warning",
    description: "Conseils alimentaires",
  },
  {
    id: "medications",
    name: "Médicaments",
    icon: Pill,
    color: "bg-destructive/10 text-destructive",
    description: "Fiches médicaments",
  },
];

const articles = [
  {
    id: 1,
    category: "surgery",
    title: "Prostatectomie radicale",
    description: "Tout savoir sur l'ablation de la prostate",
    readTime: "8 min",
    hasVideo: true,
    isFavorite: false,
  },
  {
    id: 2,
    category: "surgery",
    title: "Cystoscopie",
    description: "Examen endoscopique de la vessie",
    readTime: "5 min",
    hasVideo: true,
    isFavorite: true,
  },
  {
    id: 3,
    category: "surgery",
    title: "Lithotripsie",
    description: "Traitement des calculs rénaux par ondes de choc",
    readTime: "6 min",
    hasVideo: false,
    isFavorite: false,
  },
  {
    id: 4,
    category: "surgery",
    title: "Adénomectomie",
    description: "Chirurgie de l'hyperplasie bénigne de la prostate",
    readTime: "7 min",
    hasVideo: true,
    isFavorite: false,
  },
  {
    id: 5,
    category: "preparation",
    title: "Préparation à la chirurgie",
    description: "Étapes essentielles avant votre intervention",
    readTime: "4 min",
    hasVideo: false,
    isFavorite: true,
  },
  {
    id: 6,
    category: "preparation",
    title: "Le jeûne pré-opératoire",
    description: "Pourquoi et comment bien jeûner",
    readTime: "3 min",
    hasVideo: false,
    isFavorite: false,
  },
  {
    id: 7,
    category: "preparation",
    title: "Douche antiseptique",
    description: "Protocole de préparation cutanée",
    readTime: "2 min",
    hasVideo: true,
    isFavorite: false,
  },
  {
    id: 8,
    category: "preparation",
    title: "Gestion des anticoagulants",
    description: "Arrêt et reprise des traitements",
    readTime: "5 min",
    hasVideo: false,
    isFavorite: false,
  },
  {
    id: 9,
    category: "postop",
    title: "Gestion de la douleur",
    description: "Conseils pour soulager la douleur post-opératoire",
    readTime: "4 min",
    hasVideo: false,
    isFavorite: true,
  },
  {
    id: 10,
    category: "postop",
    title: "Soins de la cicatrice",
    description: "Comment prendre soin de votre plaie",
    readTime: "3 min",
    hasVideo: true,
    isFavorite: false,
  },
  {
    id: 11,
    category: "postop",
    title: "Signes d'alerte",
    description: "Quand contacter votre médecin",
    readTime: "4 min",
    hasVideo: false,
    isFavorite: false,
  },
  {
    id: 12,
    category: "postop",
    title: "Reprise des activités",
    description: "Retour progressif à la vie quotidienne",
    readTime: "5 min",
    hasVideo: false,
    isFavorite: false,
  },
  {
    id: 13,
    category: "urology",
    title: "Lithiases rénales",
    description: "Prévention et traitement des calculs",
    readTime: "6 min",
    hasVideo: true,
    isFavorite: false,
  },
  {
    id: 14,
    category: "urology",
    title: "Hyperplasie bénigne de la prostate",
    description: "Comprendre l'HBP et ses traitements",
    readTime: "7 min",
    hasVideo: true,
    isFavorite: false,
  },
  {
    id: 15,
    category: "urology",
    title: "Incontinence urinaire",
    description: "Types, causes et solutions",
    readTime: "6 min",
    hasVideo: false,
    isFavorite: false,
  },
  {
    id: 16,
    category: "urology",
    title: "Infections urinaires",
    description: "Prévention et traitement",
    readTime: "4 min",
    hasVideo: false,
    isFavorite: false,
  },
  {
    id: 17,
    category: "nutrition",
    title: "Hydratation optimale",
    description: "Combien boire et quoi boire",
    readTime: "3 min",
    hasVideo: false,
    isFavorite: true,
  },
  {
    id: 18,
    category: "nutrition",
    title: "Alimentation et calculs rénaux",
    description: "Régime pour prévenir les lithiases",
    readTime: "5 min",
    hasVideo: false,
    isFavorite: false,
  },
  {
    id: 19,
    category: "nutrition",
    title: "Aliments à éviter",
    description: "Ce qui peut irriter la vessie",
    readTime: "3 min",
    hasVideo: false,
    isFavorite: false,
  },
  {
    id: 20,
    category: "medications",
    title: "Alpha-bloquants",
    description: "Utilisation et effets secondaires",
    readTime: "4 min",
    hasVideo: false,
    isFavorite: false,
  },
  {
    id: 21,
    category: "medications",
    title: "Antibiotiques en urologie",
    description: "Guide des traitements antibiotiques",
    readTime: "5 min",
    hasVideo: false,
    isFavorite: false,
  },
  {
    id: 22,
    category: "medications",
    title: "Antalgiques post-opératoires",
    description: "Bien utiliser vos médicaments contre la douleur",
    readTime: "4 min",
    hasVideo: false,
    isFavorite: false,
  },
];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<
    (typeof articles)[0] | null
  >(null);
  const [favorites, setFavorites] = useState<number[]>(
    articles.filter((a) => a.isFavorite).map((a) => a.id)
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? article.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const favoriteArticles = articles.filter((a) => favorites.includes(a.id));

  if (selectedArticle) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => setSelectedArticle(null)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à la bibliothèque
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {
                    categories.find((c) => c.id === selectedArticle.category)
                      ?.name
                  }
                </Badge>
                <CardTitle className="text-2xl">
                  {selectedArticle.title}
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  {selectedArticle.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(selectedArticle.id)}
              >
                {favorites.includes(selectedArticle.id) ? (
                  <Star className="h-5 w-5 fill-warning text-warning" />
                ) : (
                  <StarOff className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedArticle.hasVideo && (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Vidéo explicative</p>
                </div>
              </div>
            )}

            <div className="prose prose-sm max-w-none">
              <h3>Introduction</h3>
              <p>
                Cette fiche vous présente les informations essentielles sur{" "}
                {selectedArticle.title.toLowerCase()}. Les informations
                contenues ici ont été validées par notre équipe médicale.
              </p>

              <h3>Points clés</h3>
              <ul>
                <li>
                  Information importante concernant la procédure ou le sujet
                </li>
                <li>Conseils pratiques pour votre quotidien</li>
                <li>Signes à surveiller et quand consulter</li>
                <li>Ressources complémentaires disponibles</li>
              </ul>

              <h3>Recommandations</h3>
              <p>
                Suivez les conseils de votre équipe soignante et n'hésitez pas à
                poser des questions lors de vos consultations. Chaque patient
                est unique et les recommandations peuvent être adaptées à votre
                situation personnelle.
              </p>

              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mt-4">
                <h4 className="text-primary mt-0">Besoin d'aide ?</h4>
                <p className="mb-0">
                  Si vous avez des questions, utilisez la messagerie sécurisée
                  pour contacter votre équipe soignante.
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Badge variant="outline">{selectedArticle.readTime} lecture</Badge>
              {selectedArticle.hasVideo && (
                <Badge variant="outline" className="gap-1">
                  <Play className="h-3 w-3" /> Vidéo incluse
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Bibliothèque Urologique
        </h1>
        <p className="text-muted-foreground">
          Contenus éducatifs validés par nos experts
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un article..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="all">Tous les articles</TabsTrigger>
          <TabsTrigger value="favorites">
            Favoris ({favoriteArticles.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4 mt-4">
          {selectedCategory ? (
            <>
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory(null)}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Toutes les catégories
              </Button>

              <div className="grid gap-3">
                {filteredArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{article.title}</h3>
                            {article.hasVideo && (
                              <Play className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {article.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {article.readTime} de lecture
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(article.id);
                            }}
                          >
                            {favorites.includes(article.id) ? (
                              <Star className="h-4 w-4 fill-warning text-warning" />
                            ) : (
                              <StarOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const articleCount = articles.filter(
                  (a) => a.category === category.id
                ).length;
                return (
                  <Card
                    key={category.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {articleCount} articles
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-3 mt-4">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedArticle(article)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {categories.find((c) => c.id === article.category)?.name}
                      </Badge>
                      {article.hasVideo && (
                        <Play className="h-3 w-3 text-primary" />
                      )}
                    </div>
                    <h3 className="font-medium">{article.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {article.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(article.id);
                      }}
                    >
                      {favorites.includes(article.id) ? (
                        <Star className="h-4 w-4 fill-warning text-warning" />
                      ) : (
                        <StarOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-3 mt-4">
          {favoriteArticles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <StarOff className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium mb-1">Aucun favori</h3>
                <p className="text-sm text-muted-foreground">
                  Ajoutez des articles en favoris pour les retrouver facilement
                </p>
              </CardContent>
            </Card>
          ) : (
            favoriteArticles.map((article) => (
              <Card
                key={article.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedArticle(article)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {
                            categories.find((c) => c.id === article.category)
                              ?.name
                          }
                        </Badge>
                        {article.hasVideo && (
                          <Play className="h-3 w-3 text-primary" />
                        )}
                      </div>
                      <h3 className="font-medium">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {article.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(article.id);
                        }}
                      >
                        <Star className="h-4 w-4 fill-warning text-warning" />
                      </Button>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
