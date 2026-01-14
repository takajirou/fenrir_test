"use client";

import { useState } from "react";
import styles from "@/styles/components/SearchForm.module.css";
import { IoIosSearch } from "react-icons/io";
import clsx from "clsx";

interface rangeType {
    number: number;
    text: string;
}

interface Props {
    onSearch: (keyword: string, range: number) => void;
}

const SearchForm = ({ onSearch }: Props) => {
    const [rangeParams, setRangeParams] = useState<number>(1);
    const [keyword, setKeyword] = useState<string>("");

    const ranges: rangeType[] = [
        {
            number: 1,
            text: "300m",
        },
        {
            number: 2,
            text: "500m",
        },
        {
            number: 3,
            text: "1km",
        },
        {
            number: 4,
            text: "2km",
        },
        {
            number: 5,
            text: "3km",
        },
    ];

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSearch(keyword, rangeParams);
            }}
            className={styles.FormWrap}
        >
            <div className={clsx(styles.SearchFormWrap, "TextNormal")}>
                <div className={styles.Search}>
                    <IoIosSearch size={20} />
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className={clsx(styles.SearchForm)}
                        placeholder="キーワードを入力"
                    />
                </div>
                <button type="submit" className={styles.SearchBtn}>
                    検索
                </button>
            </div>
            <div className={clsx(styles.RangeWrap, "TextNormal")}>
                <p>検索範囲</p>
                {ranges.map((range) => (
                    <button
                        key={range.number}
                        onClick={() => setRangeParams(range.number)}
                        className={clsx(
                            styles.RangeBtn,
                            rangeParams === range.number && styles.active,
                            "TextSub"
                        )}
                    >
                        {range.text}
                    </button>
                ))}
            </div>
        </form>
    );
};

export default SearchForm;
