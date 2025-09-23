import {FC} from "react"
import Container from "@/app/components/container/Container";
import Link from "next/link";
import {mockCategories} from "@/app/components/catalog/Catalog";
import {BsInstagram} from "react-icons/bs";
import {SiTelegram, SiWhatsapp} from "react-icons/si";

export const Footer: FC = () => {
    return (
        <footer className={`flex flex-col bg-[#101828] py-8`}>
            <Container>
                <div className={`flex flex-row`}>
                    <li className={`text-sm text-white  grid grid-cols-1 max-w-1/2 p-2 gap-2 pb-8`}>
                        <ul>
                            <Link href={`#`}
                                  className={`inline-flex items-center gap-2 hover:underline hover:text-gray-300`}>Instagram <BsInstagram/></Link>
                        </ul>
                        <ul>
                            <Link href={`#`}
                                  className={`inline-flex items-center gap-2 hover:underline hover:text-gray-300`}>Telegram <SiTelegram/></Link>
                        </ul>
                        <ul>
                            <Link href={`#`}
                                  className={`inline-flex items-center gap-2 hover:underline hover:text-gray-300`}>WhatsApp <SiWhatsapp/>
                            </Link>
                        </ul>
                        <ul>
                            <Link href={`mailto:akunov313131@gmail.com`}
                                  className={`inline-flex items-center gap-2 hover:underline hover:text-gray-300`}>Levo@meraket.com </Link>
                        </ul>
                        <ul>
                            <Link href={`tel:+996551069004`}
                                  className={`inline-flex items-center gap-2 hover:underline hover:text-gray-300`}>По
                                любым вопросам звоните: 0551 069 004 </Link>
                        </ul>
                    </li>

                    <li className={`text-sm text-white grid grid-cols-auto max-w-1/2 p-2 gap-2 pb-8`}>
                        {mockCategories.map((items) => {
                            return (
                                <ul key={items.id}>
                                    <Link href="#" className={`hover:underline hover:text-gray-300`}>{items.name}</Link>
                                </ul>
                            )
                        })}
                    </li>
                </div>
            </Container>
            <div className={`h-[1px] bg-gray-400 w-full`}>
            </div>
            <Container>
                <a className={`text-sm text-[#99a1af] items-start px-4 md:px4-4 box-border`}>© 2025 LEVO — официальный
                    сайт бытовой техники. Все права защищены.</a>
            </Container>

        </footer>
    )
}

export default Footer;
