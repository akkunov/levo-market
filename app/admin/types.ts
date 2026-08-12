import {Property} from "csstype";
import Float = Property.Float;

export type Items = {
    id: number;
    name: string;
    type: string;
};

export type Attribute = {
    items: Items[];
    page: number;
    total: number;
    limit: number;
    totalPages: number;
};

export type CatalogAttribute = {
    id: number;
    name: string;
    catalogAttributeId: number;
};

export interface Catalog {
    id: number;
    name: string;
    slug: string;
    parentId?: number | null;
    children?: Catalog[];
    attributes?: CatalogAttribute[];
}

type productAttributes = {
    id: number;
    productId: number;
    attributeId: number;
    value: string;
    attribute: {
        id: number;
        name: string;
        type: string;
        options: string[];
    };
}

export type ProductItems = {
    id:number;
    title:string;
    catalogId: number;
    image:string;
    price: Float;
    catalog: Omit<Catalog, "attributes">
    attributes?:productAttributes[];
}
export type Product = {
    items: ProductItems[];
    limit: number;
    total: number;
    totalPages:number;
}

export type ProductOCatalog = {
    id: number;
    name: string;
    slug: string;
    "createdAt": string,
    "updatedAt":string,
    products: Omit<ProductItems, "catalog">[]
}