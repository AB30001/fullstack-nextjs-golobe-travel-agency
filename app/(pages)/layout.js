import { NavNordic } from "@/components/sections/NavNordic";
import { Footer } from "@/components/sections/Footer";

export default async function PagesLayout({ children }) {
  return (
    <>
      <NavNordic type="default" />
      {children}
      <Footer />
    </>
  );
}
