import Navbar from "@/components/navigation";
import { CartProvider } from "@/app/(main)/context/cartcontext";
export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
      <CartProvider>
  {children}
</CartProvider>
      </main>
    </div>
  );
}