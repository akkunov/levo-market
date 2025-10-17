export {};

declare global {
    interface Window {
        ymaps: typeof ymaps;
    }

    namespace ymaps {
        class Map {
            constructor(
                element: string | HTMLElement,
                state?: {
                    center?: [number, number];
                    zoom?: number;
                    controls?: string[];
                },
                options?: Record<string, unknown>
            );

            setCenter(coords: [number, number], zoom?: number): void;
            geoObjects: {
                add(obj: Placemark): void;
                removeAll(): void;
            };
        }

        class Placemark {
            constructor(
                coords: [number, number],
                properties?: Record<string, unknown>,
                options?: Record<string, unknown>
            );
        }

        function ready(callback: () => void): void;
    }
}