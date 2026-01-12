import { useMemo } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { SearchParams } from "@/types/api/hotpepper";

interface Result {
    params: SearchParams;
    loading: boolean;
    error: string | null;
}

export const useGeolocationParams = (baseParams: SearchParams): Result => {
    const { lat, lng, loading, error } = useGeolocation();

    const params = useMemo<SearchParams>(() => {
        if (lat === null || lng === null) {
            return baseParams;
        }

        return {
            ...baseParams,
            lat: String(lat),
            lng: String(lng),
        };
    }, [baseParams, lat, lng]);

    return {
        params,
        loading,
        error,
    };
};
