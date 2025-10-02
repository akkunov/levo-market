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

export type Catalog = {
    id: number;
    name: string;
    slug: string;
    attributes: CatalogAttribute[];
};
