"use client";
import { useState } from "react";
import styles from "@/styles/components/SearchForm.module.css";
import { useHotPepperGenres } from "@/hooks/useHotPepperGenres";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";

interface rangeType {
    number: number;
    text: string;
}

interface Props {
    onSearch: (keyword: string, range: number, genre?: string) => void;
}

const SearchForm = ({ onSearch }: Props) => {
    const [rangeParams, setRangeParams] = useState<number>(3);
    const [keyword, setKeyword] = useState<string>("");
    const [selectedGenre, setSelectedGenre] = useState<string>("");
    const [isGenreOpen, setIsGenreOpen] = useState<boolean>(false);

    const { data } = useHotPepperGenres();

    const ranges: rangeType[] = [
        { number: 1, text: "300m" },
        { number: 2, text: "500m" },
        { number: 3, text: "1km" },
        { number: 4, text: "2km" },
        { number: 5, text: "3km" },
    ];

    const handleGenreSelect = (genreCode: string) => {
        setSelectedGenre(genreCode);
        setIsGenreOpen(false);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSearch(keyword, rangeParams, selectedGenre);
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
                <button
                    type="submit"
                    className={styles.SearchBtn}
                    aria-label="検索"
                >
                    検索
                </button>
            </div>

            <div className={styles.GenreFilterWrap}>
                <button
                    type="button"
                    onClick={() => setIsGenreOpen(!isGenreOpen)}
                    className={clsx(styles.GenreToggle, "TextNormal")}
                    aria-label="ジャンルを選択"
                >
                    <span>
                        {selectedGenre
                            ? data?.genres.find((g) => g.code === selectedGenre)
                                  ?.name || "ジャンルを選択"
                            : "ジャンルを選択"}
                    </span>
                    <IoIosArrowDown
                        size={20}
                        className={clsx(
                            styles.ArrowIcon,
                            isGenreOpen && styles.ArrowOpen,
                        )}
                    />
                </button>

                <div
                    className={clsx(
                        styles.GenreDropdown,
                        isGenreOpen && styles.DropdownOpen,
                    )}
                >
                    {data && (
                        <>
                            <button
                                type="button"
                                onClick={() => handleGenreSelect("")}
                                className={clsx(
                                    styles.GenreItem,
                                    "TextSub",
                                    selectedGenre === "" && styles.GenreActive,
                                )}
                                aria-label="すべて"
                            >
                                すべて
                            </button>
                            {data.genres.map((genre) => (
                                <button
                                    key={genre.code}
                                    type="button"
                                    onClick={() =>
                                        handleGenreSelect(genre.code)
                                    }
                                    className={clsx(
                                        styles.GenreItem,
                                        "TextSub",
                                        selectedGenre === genre.code &&
                                            styles.GenreActive,
                                    )}
                                    aria-label={genre.name}
                                >
                                    {genre.name}
                                </button>
                            ))}
                        </>
                    )}
                </div>
            </div>

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
        </form>
    );
};

export default SearchForm;
