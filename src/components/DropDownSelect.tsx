"use client";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import styles from "../styles/components/DropDownSelect.module.css";

export interface DropdownOption {
    value: string;
    label: string;
}

interface Props {
    value: string;
    options: DropdownOption[];
    placeholder: string;
    onChange: (value: string) => void;
    ariaLabel: string;
}

const DropdownSelect = ({
    value,
    options,
    placeholder,
    onChange,
    ariaLabel,
}: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const selectedLabel =
        options.find((o) => o.value === value)?.label ?? placeholder;

    return (
        <div className={clsx(styles.Wrap, "TextNormal")}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={styles.Toggle}
                aria-label={ariaLabel}
            >
                <span>{selectedLabel}</span>
                <IoIosArrowDown
                    size={20}
                    className={clsx(styles.Arrow, open && styles.Open)}
                />
            </button>

            <div className={clsx(styles.Dropdown, open && styles.Opened)}>
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                            onChange(option.value);
                            setOpen(false);
                        }}
                        className={clsx(
                            styles.Item,
                            value === option.value && styles.Active,
                        )}
                        aria-label={option.label}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DropdownSelect;
