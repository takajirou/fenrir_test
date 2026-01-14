"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import { SearchParams } from "@/types/api/hotpepper";
import { useGeolocationParams } from "@/hooks/useGeolocationPrams";
import { useHotPepperShops } from "@/hooks/useHotPepperShops";
import styles from "@/styles/ShopSearch.module.css";

export default function Home() {
    const [baseParams, setBaseParams] = useState<SearchParams>({
        keyword: "",
        range: 3,
        genre: "",
    });

    const {
        params,
        loading: geoLoading,
        error: geoError,
    } = useGeolocationParams(baseParams);

    const { data, isLoading, isFetching } = useHotPepperShops(params);

    console.log(data);

    return (
        <div className={styles.wrap}>
            <SearchForm
                onSearch={(keyword, range, genre) =>
                    setBaseParams((prev) => ({
                        ...prev,
                        keyword,
                        range,
                        genre,
                    }))
                }
            />
            <p>{data?.totalCount}</p>
        </div>
    );
}
