import { FC } from "react";
import './index.css';

type Props = {
    label: string;
    className?: string;
    checked: boolean;
    onChange: (value: string) => void;
}

export const Radio: FC<Props> = ({ className, label, checked, onChange }) => {
    return (
        <label className={`container ${className}`}>
            {label}
            <input
                type="radio"
                name="radio"
                checked={checked}
                onChange={() => onChange(label)} // 👈 передаём label наверх
                readOnly // чтобы React не ругался на controlled input
            />
            <span className="checkmark"></span>
        </label>
    );
};
