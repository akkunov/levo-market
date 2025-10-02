import {useEffect, useRef} from "react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {TagsSkeleton} from "@/app/components/skeleton/Skeleton";


type Items = {
    id: number;
    name: string;
    type: string;
};


export function AttributeList({
                                  attributes,
                                  onSelectAction,
                                  loading,
                                  hasMore,
                                  loadMoreAction,
                              }: {
    attributes: Items[] | null | undefined;
    onSelectAction: (a: Items) => void;
    loading: boolean;
    hasMore: boolean;
    loadMoreAction: () => void;
}) {
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!hasMore || loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreAction();
                }
            },
            {threshold: 1}
        );

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => {
            if (loaderRef.current) observer.disconnect();
        };
    }, [hasMore, loading, loadMoreAction]);

    return (
        <div className="flex flex-wrap gap-2">
            {attributes && attributes.map((attr) => (
                <Badge
                    onClick={() => onSelectAction(attr)}
                    key={attr.id}
                    className={`cursor-pointer flex items-center font-normal md:font-medium
                        gap-2 px-3 py-1 text-sm bg-white text-black border 
                        border-gray-200 hover:bg-gray-100`}
                >
                    {attr.name}
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-4 w-4 p-0"
                    >
                        <Plus className="h-3 w-3"/>
                    </Button>
                </Badge>
            ))}

            {loading && <TagsSkeleton count={6}/>}
            {hasMore && <div ref={loaderRef} className="h-6 w-full"/>}
        </div>
    );
}
