"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import { SearchParams } from "@/types/api/hotpepper";
import { useGeolocationParams } from "@/hooks/useGeolocationPrams";
import { useHotPepperShops } from "@/hooks/useHotPepperShops";

export default function Home() {
    const [baseParams, setBaseParams] = useState<SearchParams>({
        keyword: "",
        range: 3,
    });

    const {
        params,
        loading: geoLoading,
        error: geoError,
    } = useGeolocationParams(baseParams);

    const { data, isLoading, isFetching } = useHotPepperShops(params);

    console.log(data);

    return (
        <div>
            <SearchForm
                onSearch={(keyword, range) =>
                    setBaseParams((prev) => ({ ...prev, keyword, range }))
                }
            />
            <p>{data?.totalCount}</p>
        </div>
    );
}
