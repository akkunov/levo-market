import {FC} from "react"
import Container from "@/app/components/container/Container";
import Link from "next/link";
import {mockCategories} from "@/app/components/catalog/Catalog";
import {BsInstagram} from "react-icons/bs";

export const Footer: FC = () => {
    return (
        <footer className={`flex flex-col bg-[#101828] py-8 `} id={`contacts`}>
            <Container>
                <div className={`flex flex-row px-4 gap-4`}>
                    <ul className="text-sm text-white grid grid-cols-1 max-w-1/2 p-2 gap-2 pb-8">
                        <li>
                            <Link
                                href="https://www.instagram.com/levo_kg/"
                                className="inline-flex items-center gap-2 hover:underline hover:text-gray-300"
                                target={'_blank'}
                            >
                                Instagram <BsInstagram/>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="mailto:levo.market.help@gmail.com"
                                className="inline-flex items-center gap-2 hover:underline hover:text-gray-300"
                                target={'_blank'}
                            >
                                levo.market.help@gmail.com
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contacts"
                                className="inline-flex items-center gap-2 hover:underline hover:text-gray-300"
                            >
                                Наши сервисные центры
                            </Link>
                        </li>
                    </ul>
                    <ul className={`text-sm text-white grid grid-cols-auto max-w-1/2 p-2 gap-2 pb-8`}>
                        {mockCategories.map((items) => {
                            return (
                                <li key={items.id}>
                                    <Link href={`/catalogs/${items.slug}`}
                                          className={`hover:underline hover:text-gray-300`}>{items.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </Container>
            <div className={`h-[1px] bg-gray-400 w-full`}>
            </div>
            <Container>
                <a className={`text-sm text-[#99a1af] items-start px-4 md:px4-4 box-border`}>© 2025 LEVO — официальный
                    сайт бытовой техники. Все права защищены.</a>

                <div className="text-gray-400 text-sm mt-6 px-4 max-w-3xl leading-relaxed">
                    <p>
                        <strong>LEVO KG</strong> — официальный магазин бытовой техники в Кыргызстане.
                        У нас вы можете <Link href="/catalogs/stiralnay-mashina">купить стиральные машины</Link>,{" "}
                        <Link href="/catalogs/Xolodilniki">холодильники</Link>,{" "}
                        <Link href="/catalogs/Morozilnik">морозильники</Link> и{" "}
                        <Link href="/catalogs/kondicionery">кондиционеры</Link> Levo с доставкой по Бишкеку и регионам.
                    </p>
                </div>
            </Container>

        </footer>
    )
}

export default Footer;
