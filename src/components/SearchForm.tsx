"use client";
import { useState } from "react";
import styles from "@/styles/components/SearchForm.module.css";
import { useHotPepperGenres } from "@/hooks/useHotPepperGenres";
import { IoIosSearch } from "react-icons/io";
import DropdownSelect from "./DropDownSelect";
import clsx from "clsx";

interface rangeType {
    number: number;
    text: string;
}

interface sortType {
    value: string;
    text: string;
}

interface Props {
    onSearch: (
        keyword: string,
        range: number,
        genre?: string,
        sort?: string,
    ) => void;
}

const SearchForm = ({ onSearch }: Props) => {
    const [rangeParams, setRangeParams] = useState<number>(3);
    const [keyword, setKeyword] = useState<string>("");
    const [selectedGenre, setSelectedGenre] = useState<string>("");
    const [selectedSort, setSelectedSort] = useState<string>("nearby");

    const { data } = useHotPepperGenres();

    const ranges: rangeType[] = [
        { number: 1, text: "300m" },
        { number: 2, text: "500m" },
        { number: 3, text: "1km" },
        { number: 4, text: "2km" },
        { number: 5, text: "3km" },
    ];

    const sortOptions: sortType[] = [
        { value: "nearby", text: "距離が近い順" },
        { value: "4", text: "おすすめ順" },
        { value: "budget_asc", text: "価格帯が安い順" },
        { value: "budget_desc", text: "価格帯が高い順" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(keyword, rangeParams, selectedGenre, selectedSort);
    };

    return (
        <div className={styles.FormWrap}>
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
                <button
                    onClick={handleSubmit}
                    className={styles.SearchBtn}
                    aria-label="検索"
                >
                    検索
                </button>
            </div>

            <DropdownSelect
                value={selectedGenre}
                placeholder="ジャンルを選択"
                ariaLabel="ジャンルを選択"
                onChange={setSelectedGenre}
                options={[
                    { value: "", label: "すべて" },
                    ...(data?.genres.map((g) => ({
                        value: g.code,
                        label: g.name,
                    })) ?? []),
                ]}
            />

            <DropdownSelect
                value={selectedSort}
                placeholder="おすすめ順"
                ariaLabel="並び順を選択"
                onChange={setSelectedSort}
                options={sortOptions.map((s) => ({
                    value: s.value,
                    label: s.text,
                }))}
            />

            <div className={clsx(styles.RangeWrap, "TextNormal")}>
                <p>検索範囲</p>
                {ranges.map((range) => (
                    <button
                        key={range.number}
                        type="button"
                        onClick={() => setRangeParams(range.number)}
                        className={clsx(
                            styles.RangeBtn,
                            rangeParams === range.number && styles.active,
                            "TextSub",
                        )}
                        aria-label={range.text}
                    >
                        {range.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchForm;
