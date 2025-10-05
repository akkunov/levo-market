

import { ReactNode } from "react";

import ReactQueryProvider from "@/app/hoc/ReactQueryProvider";
import {Header} from "@/app/components/header/Header";
import Container from "@/app/components/container/Container";

interface CatalogLayoutProps {
    children: ReactNode;
}

export default function CatalogLayout({ children }: CatalogLayoutProps) {




    return (
        <ReactQueryProvider>
            <Header/>
                <main>
                    <Container className={`mx-auto pt-16`}>
                        {children}
                    </Container>

                </main>
        </ReactQueryProvider>

    );
}
