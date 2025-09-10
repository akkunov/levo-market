import { FC } from "react";
import './index.css';

type Props = {
    label: string;
    className?: string;
}

export const Radio:FC<Props> = ({className, label}) => {
    return (
        <label className={`container ${className}`}>
            {label}
            <input type="radio" name="radio"/>
            <span className="checkmark"></span>
        </label>
    );
}