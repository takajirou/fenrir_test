import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "@/lib/axios";
import { HotPepperResponse, SearchParams } from "@/types/api/hotpepper";

const fetchHotPepperShops = async (
    params: SearchParams
): Promise<HotPepperResponse> => {
    const response = await apiClient.get<HotPepperResponse>("/hotpepper", {
        params,
    });

    return response.data;
};

export const useHotPepperShops = (params: SearchParams) => {
    return useQuery<HotPepperResponse, AxiosError>({
        queryKey: ["hotpepperShops", params],
        queryFn: () => fetchHotPepperShops(params),
        enabled:
            Boolean(params.keyword) ||
            Boolean(params.genre) ||
            (Boolean(params.lat) && Boolean(params.lng)),
        staleTime: 1000 * 60 * 5,
    });
};
