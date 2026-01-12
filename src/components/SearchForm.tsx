"use client";

import { useState } from "react";

interface rangeType {
    number: number;
    text: string;
}

interface Props {
    onSearch: (keyword: string, range: number) => void;
}

const SearchForm = ({ onSearch }: Props) => {
    const [range, setRange] = useState<number>(1);
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
                onSearch(keyword, range);
            }}
        >
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            {ranges.map((range) => (
                <button
                    key={range.number}
                    onClick={() => setRange(range.number)}
                >
                    {range.text}
                </button>
            ))}
            <button type="submit">検索</button>
        </form>
    );
};

export default SearchForm;
