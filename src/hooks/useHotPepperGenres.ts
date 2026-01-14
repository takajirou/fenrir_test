import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { HotPepperGenreResponse } from "@/types/api/hotpepper";
import { apiClient } from "@/lib/axios";

const fetchHotPepperGenres = async (): Promise<HotPepperGenreResponse> => {
    const response = await apiClient.get<HotPepperGenreResponse>(
        "/hotpepper/genre"
    );

    return response.data;
};

export const useHotPepperGenres = () => {
    return useQuery<HotPepperGenreResponse, AxiosError>({
        queryKey: ["hotpepperGenres"],
        queryFn: fetchHotPepperGenres,
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        refetchOnWindowFocus: false,
    });
};
