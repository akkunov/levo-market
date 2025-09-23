import Hero from "./components/hero/Hero";
import {Catalog} from "@/app/components/catalog/Catalog";

export default function Home() {
  return (
      <>
          <main>
              <Hero />
          </main>

          {/*//секция каталогов*/}
          <section className="bg-[#EEEFF2]" id={'hero-catalog'}>
              <Catalog />
          </section>
      </>

  );
}
