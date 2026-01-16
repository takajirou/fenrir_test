import { NextRequest, NextResponse } from "next/server";
import {
    HotPepperApiResponse,
    HotPepperShop,
    Shop,
} from "@/types/api/hotpepper";

const HOTPEPPER_API_URL =
    "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/";

const PAGE_SIZE = 15;

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const keyword = searchParams.get("keyword") || "";
        const lat = searchParams.get("lat") || "";
        const lng = searchParams.get("lng") || "";
        const range = searchParams.get("range") || "3";
        const genre = searchParams.get("genre") || "";
        const page = Number(searchParams.get("page") || "1");

        const start = (page - 1) * PAGE_SIZE + 1;

        const params: Record<string, string> = {
            key: process.env.HOTPEPPER_API_KEY!,
            format: "json",
            count: PAGE_SIZE.toString(),
            start: start.toString(),
        };

        if (keyword) params.keyword = keyword;
        if (genre) params.genre = genre;

        if (lat && lng) {
            params.lat = lat;
            params.lng = lng;
            params.range = range;
        }

        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${HOTPEPPER_API_URL}?${queryString}`);

        if (!response.ok) {
            throw new Error("HotPepperAPI request failed");
        }

        const data: HotPepperApiResponse = await response.json();

        const shops: Shop[] = data.results.shop
            ? data.results.shop.map((shop: HotPepperShop) => ({
                  id: shop.id,
                  name: shop.name,
                  logoImage: shop.logo_image,
                  nameKana: shop.name_kana,
                  address: shop.address,
                  stationName: shop.station_name,
                  lat: shop.lat,
                  lng: shop.lng,
                  genre: shop.genre?.name || "",
                  genreCatch: shop.genre?.catch || "",
                  subGenre: shop.sub_genre?.name || "",
                  budget: shop.budget?.name || "",
                  budgetAverage: shop.budget?.average || "",
                  budgetMemo: shop.budget_memo || "",
                  catch: shop.catch || "",
                  capacity: shop.capacity || 0,
                  access: shop.access || "",
                  mobileAccess: shop.mobile_access || "",
                  photo: shop.photo?.pc?.l || "",
                  photoMedium: shop.photo?.pc?.m || "",
                  photoSmall: shop.photo?.pc?.s || "",
                  url: shop.urls?.pc || "",
                  couponUrlPc: shop.coupon_urls?.pc || "",
                  couponUrlSp: shop.coupon_urls?.sp || "",
                  open: shop.open || "",
                  close: shop.close || "",
                  partyCapacity: shop.party_capacity || 0,
                  wifi: shop.wifi || "",
                  wedding: shop.wedding || "",
                  course: shop.course || "",
                  freeDrink: shop.free_drink || "",
                  freeFood: shop.free_food || "",
                  privateRoom: shop.private_room || "",
                  horigotatsu: shop.horigotatsu || "",
                  tatami: shop.tatami || "",
                  card: shop.card || "",
                  nonSmoking: shop.non_smoking || "",
                  charter: shop.charter || "",
                  parking: shop.parking || "",
                  barrierFree: shop.barrier_free || "",
                  show: shop.show || "",
                  karaoke: shop.karaoke || "",
                  band: shop.band || "",
                  tv: shop.tv || "",
                  lunch: shop.lunch || "",
                  midnight: shop.midnight || "",
                  english: shop.english || "",
                  pet: shop.pet || "",
                  child: shop.child || "",
              }))
            : [];

        return NextResponse.json({
            shops,
            pagination: {
                page,
                pageSize: PAGE_SIZE,
                totalCount: data.results.results_available,
                totalPages: Math.ceil(
                    data.results.results_available / PAGE_SIZE
                ),
            },
        });
    } catch (error) {
        console.error("Hot Pepper API Error:", error);
        return NextResponse.json(
            { error: "レストラン情報の取得に失敗しました" },
            { status: 500 }
        );
    }
}
