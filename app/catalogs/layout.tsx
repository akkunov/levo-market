

import { ReactNode } from "react";

import ReactQueryProvider from "@/app/hoc/ReactQueryProvider";
import {Header} from "@/app/components/header/Header";

interface CatalogLayoutProps {
    children: ReactNode;
}

export default function CatalogLayout({ children }: CatalogLayoutProps) {




    return (
        <ReactQueryProvider>
            <Header />
                <main className="col-span-12 md:col-span-9 mt-12">{children}</main>
        </ReactQueryProvider>

    );
}
