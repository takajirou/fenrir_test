"use client";

import { useState, useMemo } from "react";
import SearchForm from "@/components/SearchForm";
import ShopList from "@/components/ShopList";
import Pagination from "@/components/Pagination";
import { SearchParams, ShopCard } from "@/types/api/hotpepper";
import { useGeolocationParams } from "@/hooks/useGeolocationPrams";
import { useHotPepperShops } from "@/hooks/useHotPepperShops";
import styles from "@/styles/ShopSearch.module.css";

export default function Home() {
    const [baseParams, setBaseParams] = useState<SearchParams>({
        keyword: "",
        range: 3,
        genre: "",
        page: 1,
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

    const handleSearch = (keyword: string, range: number, genre?: string) => {
        setBaseParams((prev) => ({
            ...prev,
            keyword,
            range,
            genre,
            page: 1,
        }));
    };

    const handlePageChange = (page: number) => {
        setBaseParams((prev) => ({
            ...prev,
            page,
        }));
    };

    return (
        <div className={styles.wrap}>
            <SearchForm onSearch={handleSearch} />

            <ShopList shops={shops} isLoading={isLoading || isFetching} />

            {data && (
                <Pagination
                    currentPage={data.pagination.page}
                    totalPages={data.pagination.totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
