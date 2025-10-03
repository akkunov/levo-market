

import { ReactNode } from "react";

import ReactQueryProvider from "@/app/hoc/ReactQueryProvider";

interface CatalogLayoutProps {
    children: ReactNode;
}

export default function CatalogLayout({ children }: CatalogLayoutProps) {




    return (
        <ReactQueryProvider>
                <main className="col-span-12 md:col-span-9">{children}</main>
        </ReactQueryProvider>

    );
}
