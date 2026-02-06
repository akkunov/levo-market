import Hero from "./components/hero/Hero";
import {Catalog} from "@/app/components/catalog/Catalog";
import Footer from "@/app/components/footer/footer";
import {Header} from "@/app/components/header/Header";

export default function Home() {
  return (
      <>
          <Header />
          <main>
              <Hero />
          </main>

          {/*//секция каталогов*/}
          <section className="bg-[#EEEFF2] pb-8 p-2" id={'hero-catalog'}>
              <Catalog />
          </section>
          <Footer />
      </>

  );
}
