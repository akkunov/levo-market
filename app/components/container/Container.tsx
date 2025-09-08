import { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
    className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
    return (
        <div className={`max-w-7xl mx-auto px-4 ${className}`}>
            {children}
        </div>
    );
}
