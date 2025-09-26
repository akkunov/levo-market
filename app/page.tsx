import Hero from "./components/hero/Hero";
import {Catalog} from "@/app/components/catalog/Catalog";
import Footer from "@/app/components/footer/footer";
import {UploadImage} from "@/app/components/uploadImage/uploadForm";

export default function Home() {
  return (
      <>
          <main>
              <Hero />
          </main>

          {/*//секция каталогов*/}
          <section className="bg-[#EEEFF2] pb-8" id={'hero-catalog'}>
              <Catalog />
          </section>
          <UploadImage />
          <Footer />
      </>

  );
}
