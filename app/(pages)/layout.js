import { NavMinimal } from "@/components/sections/NavMinimal";
import { Footer } from "@/components/sections/Footer";

export default async function PagesLayout({ children }) {
  return (
    <>
      <NavMinimal />
      {children}
      <Footer />
    </>
  );
}
