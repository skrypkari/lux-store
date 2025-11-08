import Header from "@/components/header";
import Footer from "@/components/footer";
import CartContent from "@/components/cart-content";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-foreground transition-colors">Home</a>
          <span>/</span>
          <span className="text-foreground font-medium">Shopping Cart</span>
        </div>

        <CartContent />
      </main>

      <Footer />
    </div>
  );
}
