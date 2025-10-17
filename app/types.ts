export {};

declare global {
    interface Window {
        ymaps: {
            ready: (callback: () => void) => void;
            Map: new (
                element: string | HTMLElement,
                state?: { center?: [number, number]; zoom?: number; controls?: string[] },
                options?: Record<string, unknown>
            ) => YMap;
            Placemark: new (
                coords: [number, number],
                properties?: Record<string, unknown>,
                options?: Record<string, unknown>
            ) => YPlacemark;
        };
    }

    interface YMap {
        setCenter(coords: [number, number], zoom?: number): void;
        geoObjects: {
            add(obj: YPlacemark): void;
            removeAll(): void;
        };
    }

    // вместо пустого interface
    type YPlacemark = Record<string, unknown>;
}
