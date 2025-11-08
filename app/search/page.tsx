import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchResults from "@/components/search-results";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <span>/</span>
            <span className="text-foreground font-medium">Search Results</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Search Results
          </h1>
          
          {query && (
            <p className="text-lg text-muted-foreground">
              Showing results for "<span className="text-foreground font-semibold">{query}</span>"
            </p>
          )}
        </div>

        <SearchResults initialQuery={query} />
      </main>

      <Footer />
    </div>
  );
}
