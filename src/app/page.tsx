"use client";

import { useState, useMemo } from "react";
import SearchForm from "@/components/SearchForm";
import ShopList from "@/components/ShopList";
import { SearchParams } from "@/types/api/hotpepper";
import { useGeolocationParams } from "@/hooks/useGeolocationPrams";
import { useHotPepperShops } from "@/hooks/useHotPepperShops";
import { ShopCard } from "@/types/api/hotpepper";
import styles from "@/styles/ShopSearch.module.css";

export default function Home() {
    const [baseParams, setBaseParams] = useState<SearchParams>({
        keyword: "",
        range: 3,
        genre: "",
    });

    const { params } = useGeolocationParams(baseParams);
    const { data, isLoading, isFetching } = useHotPepperShops(params);

    const shops: ShopCard[] = useMemo(() => {
        if (!data?.shops) return [];

        return data.shops.map((shop) => ({
            id: shop.id,
            name: shop.name,
            access: shop.access,
            image: shop.photo || "",
            genre: shop.genre,
            budget: shop.budget || "予算情報なし",
        }));
    }, [data]);

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

            <ShopList shops={shops} isLoading={isLoading || isFetching} />
        </div>
    );
}
