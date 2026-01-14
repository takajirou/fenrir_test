import { NextResponse } from "next/server";
import {
    HotPepperGenreMasterResponse,
    HotPepperGenreMasterGenre,
    Genre,
} from "@/types/api/hotpepper";

const HOTPEPPER_GENRE_API_URL =
    "http://webservice.recruit.co.jp/hotpepper/genre/v1/";

export async function GET() {
    try {
        const params = new URLSearchParams({
            key: process.env.HOTPEPPER_API_KEY!,
            format: "json",
        });

        const response = await fetch(
            `${HOTPEPPER_GENRE_API_URL}?${params.toString()}`,
            {
                cache: "force-cache",
            }
        );

        if (!response.ok) {
            throw new Error("HotPepperGenreAPI requestfailed");
        }

        const data: HotPepperGenreMasterResponse = await response.json();

        const genres: Genre[] = data.results.genre.map(
            (genre: HotPepperGenreMasterGenre) => ({
                code: genre.code,
                name: genre.name,
            })
        );

        return NextResponse.json({
            apiVersion: data.results.api_version,
            totalCount: data.results.results_available,
            returnedCount: data.results.results_returned,
            start: data.results.results_start,
            genres,
        });
    } catch (error) {
        console.error("Hot Pepper Genre API Error:", error);
        return NextResponse.json(
            { error: "ジャンルマスタの取得に失敗しました" },
            { status: 500 }
        );
    }
}
