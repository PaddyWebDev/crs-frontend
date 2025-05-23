"use client"
import Link from "next/link"
import Image from "next/image"
import { Search, Clock, Star, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GuestNavbar from "@/components/guest-navbar"
import SearchForm from "./_components/SearchForm"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <GuestNavbar />

      {/* Hero Section */}
      <div className="relative mt-[10dvh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=2070&auto=format&fit=crop"
            alt="Food background"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-28 lg:py-32 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">Flavor Finder</h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
            Discover recipes tailored to your taste and preferences
          </p>

          <SearchForm />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Categories Section with improved visuals */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Explore Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/guest/category?query=${category.id}`} className="group">
                <div className="bg-card rounded-xl p-3 md:p-4 text-center transition-all hover:bg-primary/5 hover:shadow-md flex flex-col items-center gap-2 md:gap-3 border border-border">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden relative mb-1 md:mb-2 group-hover:scale-105 transition-transform">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium text-sm md:text-base">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recommended Section */}
        <section className="mb-12 md:mb-16">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Recommended For You</h2>
            <Link href="/recommendations" className="text-primary hover:underline flex items-center gap-1 group">
              <span className="hidden sm:inline">View all</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {recommendedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>

        {/* Explore Recipes Section */}
        <section className="mb-12 md:mb-16 bg-muted/30 py-6 md:py-10 px-4 md:px-6 rounded-2xl">
          <Tabs defaultValue="trending">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
              <h2 className="text-2xl md:text-3xl font-bold">Explore Recipes</h2>
              <TabsList className="bg-background/80 backdrop-blur-sm">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="trending" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {trendingRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {newRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {popularRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Quick & Easy Section */}
        <section>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Quick & Easy</h2>
            <Link href="/quick-easy" className="text-primary hover:underline flex items-center gap-1 group">
              <span className="hidden sm:inline">View all</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {quickRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      </div>

    </div>
  )
}

function RecipeCard({ recipe }: any) {
  return (
    <Card className="overflow-hidden h-full flex flex-col group hover:shadow-lg transition-all duration-300 border-border">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 md:top-3 right-2 md:right-3">
          <Badge
            variant={
              recipe.difficulty === "Easy" ? "success" : recipe.difficulty === "Medium" ? "warning" : "destructive"
            }
            className="shadow-md text-xs"
          >
            {recipe.difficulty}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-3 md:p-4 pb-0">
        <CardTitle className="text-base md:text-lg line-clamp-1">{recipe.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-4 pt-2 flex-grow">
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
      </CardContent>
      <CardFooter className="p-3 md:p-4 pt-0 flex justify-between items-center border-t border-border/50 mt-auto">
        <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
          <Clock className="h-3 w-3 md:h-4 md:w-4" />
          <span>{recipe.time} mins</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 md:h-4 md:w-4 fill-amber-400 text-amber-400" />
          <span className="font-medium text-xs md:text-sm">{recipe.rating}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

// Sample data with real stock images
const recommendedRecipes = [
  {
    id: 1,
    title: "Creamy Garlic Parmesan Pasta",
    description: "A rich and creamy pasta dish with garlic and parmesan cheese that's ready in just 20 minutes.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2070&auto=format&fit=crop",
    time: 20,
    difficulty: "Easy",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Honey Glazed Salmon",
    description: "Delicious salmon fillets glazed with honey, soy sauce, and lemon for a perfect weeknight dinner.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
    time: 25,
    difficulty: "Medium",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Vegetable Stir Fry",
    description: "A colorful mix of fresh vegetables stir-fried with a savory sauce for a healthy meal option.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    time: 15,
    difficulty: "Easy",
    rating: 4.5,
  },
  {
    id: 4,
    title: "Classic Margherita Pizza",
    description: "Homemade pizza with fresh mozzarella, tomatoes, and basil on a crispy thin crust.",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2070&auto=format&fit=crop",
    time: 40,
    difficulty: "Medium",
    rating: 4.9,
  },
]

const trendingRecipes = [
  {
    id: 5,
    title: "Avocado Toast with Poached Egg",
    description: "Creamy avocado spread on toasted bread topped with a perfectly poached egg and red pepper flakes.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2080&auto=format&fit=crop",
    time: 15,
    difficulty: "Easy",
    rating: 4.6,
  },
  {
    id: 6,
    title: "Spicy Thai Basil Chicken",
    description: "A flavorful stir-fry with chicken, Thai basil, and chili peppers that packs a punch.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2070&auto=format&fit=crop",
    time: 30,
    difficulty: "Medium",
    rating: 4.8,
  },
  {
    id: 7,
    title: "Mushroom Risotto",
    description: "Creamy Italian rice dish with sautéed mushrooms, white wine, and parmesan cheese.",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop",
    time: 45,
    difficulty: "Hard",
    rating: 4.7,
  },
  {
    id: 8,
    title: "Chocolate Lava Cake",
    description: "Decadent chocolate dessert with a molten center, perfect for chocolate lovers.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2127&auto=format&fit=crop",
    time: 25,
    difficulty: "Medium",
    rating: 4.9,
  },
]

const newRecipes = [
  {
    id: 9,
    title: "Quinoa Buddha Bowl",
    description: "Nutritious bowl with quinoa, roasted vegetables, avocado, and tahini dressing.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop",
    time: 35,
    difficulty: "Easy",
    rating: 4.5,
  },
  {
    id: 10,
    title: "Lemon Herb Roasted Chicken",
    description: "Whole roasted chicken with lemon, garlic, and fresh herbs for a flavorful main dish.",
    image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?q=80&w=2074&auto=format&fit=crop",
    time: 75,
    difficulty: "Medium",
    rating: 4.8,
  },
  {
    id: 11,
    title: "Strawberry Spinach Salad",
    description: "Fresh spinach salad with strawberries, feta cheese, and balsamic vinaigrette.",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2000&auto=format&fit=crop",
    time: 10,
    difficulty: "Easy",
    rating: 4.4,
  },
  {
    id: 12,
    title: "Beef and Broccoli Stir Fry",
    description: "Classic Chinese-inspired dish with tender beef strips and crisp broccoli in a savory sauce.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=2025&auto=format&fit=crop",
    time: 30,
    difficulty: "Medium",
    rating: 4.6,
  },
]

const popularRecipes = [
  {
    id: 13,
    title: "Homemade Chicken Noodle Soup",
    description: "Comforting soup with tender chicken, vegetables, and egg noodles in a flavorful broth.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop",
    time: 60,
    difficulty: "Medium",
    rating: 4.9,
  },
  {
    id: 14,
    title: "Classic Beef Lasagna",
    description: "Layers of pasta, rich meat sauce, and creamy cheese for the ultimate comfort food.",
    image: "https://images.unsplash.com/photo-1619895092538-128341789043?q=80&w=2070&auto=format&fit=crop",
    time: 90,
    difficulty: "Hard",
    rating: 4.8,
  },
  {
    id: 15,
    title: "Banana Bread",
    description: "Moist and delicious banana bread with walnuts and a hint of cinnamon.",
    image: "https://images.unsplash.com/photo-1605286978633-2dec93ff88a2?q=80&w=2070&auto=format&fit=crop",
    time: 65,
    difficulty: "Easy",
    rating: 4.7,
  },
  {
    id: 16,
    title: "Shrimp Scampi",
    description: "Garlicky shrimp cooked in butter and white wine, served over pasta.",
    image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?q=80&w=2070&auto=format&fit=crop",
    time: 25,
    difficulty: "Medium",
    rating: 4.6,
  },
]

const quickRecipes = [
  {
    id: 17,
    title: "5-Minute Breakfast Smoothie",
    description: "Quick and nutritious smoothie with banana, berries, yogurt, and honey.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=2071&auto=format&fit=crop",
    time: 5,
    difficulty: "Easy",
    rating: 4.5,
  },
  {
    id: 18,
    title: "Microwave Mug Cake",
    description: "Chocolate cake in a mug that cooks in the microwave in just 2 minutes.",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=2036&auto=format&fit=crop",
    time: 5,
    difficulty: "Easy",
    rating: 4.3,
  },
  {
    id: 19,
    title: "Tuna Salad Sandwich",
    description: "Classic tuna salad with mayo, celery, and onion on toasted bread.",
    image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=2064&auto=format&fit=crop",
    time: 10,
    difficulty: "Easy",
    rating: 4.4,
  },
  {
    id: 20,
    title: "Instant Ramen Upgrade",
    description: "Quick ramen noodles elevated with fresh vegetables, egg, and seasonings.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=2080&auto=format&fit=crop",
    time: 15,
    difficulty: "Easy",
    rating: 4.2,
  },
]

const categories = [
  {
    id: "breakfast",
    name: "Breakfast",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "lunch",
    name: "Lunch",
    image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=2187&auto=format&fit=crop",
  },
  {
    id: "dinner",
    name: "Dinner",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=2058&auto=format&fit=crop",
  },
  {
    id: "desserts",
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2187&auto=format&fit=crop",
  },
  {
    id: "vegetarian",
    name: "Vegetarian",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2184&auto=format&fit=crop",
  },
  {
    id: "vegan",
    name: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "gluten-free",
    name: "Gluten Free",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?q=80&w=2187&auto=format&fit=crop",
  },
  {
    id: "keto",
    name: "Keto",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2153&auto=format&fit=crop",
  },
  {
    id: "quick",
    name: "Quick & Easy",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2020&auto=format&fit=crop",
  },
  {
    id: "italian",
    name: "Italian",
    image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "asian",
    name: "Asian",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "mexican",
    name: "Mexican",
    image: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?q=80&w=2187&auto=format&fit=crop",
  },
]

