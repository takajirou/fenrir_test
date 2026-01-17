"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchForm from "@/components/SearchForm";
import ShopList from "@/components/ShopList";
import Pagination from "@/components/Pagination";
import { SearchParams, ShopCard } from "@/types/api/hotpepper";
import { useGeolocationParams } from "@/hooks/useGeolocationPrams";
import { useHotPepperShops } from "@/hooks/useHotPepperShops";
import styles from "@/styles/ShopSearch.module.css";

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [baseParams, setBaseParams] = useState<SearchParams>(() => ({
        keyword: searchParams.get("keyword") || "",
        range: Number(searchParams.get("range")) || 3,
        genre: searchParams.get("genre") || "",
        page: Number(searchParams.get("page")) || 1,
    }));

    const { params } = useGeolocationParams(baseParams);
    const { data, isLoading, isFetching } = useHotPepperShops(params);

    useEffect(() => {
        const params = new URLSearchParams();

        if (baseParams.keyword) params.set("keyword", baseParams.keyword);
        if (baseParams.range) params.set("range", String(baseParams.range));
        if (baseParams.genre) params.set("genre", baseParams.genre);
        if (baseParams.page) params.set("page", String(baseParams.page));

        const queryString = params.toString();
        const newUrl = queryString ? `?${queryString}` : "/";

        router.replace(newUrl, { scroll: false });
    }, [baseParams, router]);

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
