// グルメサーチAPI

interface HotPepperPhoto {
    pc: {
        l: string;
        m: string;
        s: string;
    };
    mobile: {
        l: string;
        s: string;
    };
}

interface HotPepperGenre {
    code: string;
    name: string;
    catch: string;
}

interface HotPepperBudget {
    code: string;
    name: string;
    average: string;
}

interface HotPepperUrls {
    pc: string;
}

interface HotPepperCouponUrls {
    pc: string;
    sp: string;
}

interface HotPepperServiceArea {
    code: string;
    name: string;
}

interface HotPepperLargeServiceArea {
    code: string;
    name: string;
}

interface HotPepperLargeArea {
    code: string;
    name: string;
}

interface HotPepperMiddleArea {
    code: string;
    name: string;
}

interface HotPepperSmallArea {
    code: string;
    name: string;
}

export interface HotPepperShop {
    id: string;
    name: string;
    logo_image: string;
    name_kana: string;
    address: string;
    station_name: string;
    ktai_coupon: string;
    large_service_area: HotPepperLargeServiceArea;
    service_area: HotPepperServiceArea;
    large_area: HotPepperLargeArea;
    middle_area: HotPepperMiddleArea;
    small_area: HotPepperSmallArea;
    lat: number;
    lng: number;
    genre: HotPepperGenre;
    sub_genre: HotPepperGenre;
    budget: HotPepperBudget;
    catch: string;
    capacity: number;
    access: string;
    mobile_access: string;
    urls: HotPepperUrls;
    photo: HotPepperPhoto;
    open: string;
    close: string;
    party_capacity: number;
    other_memo: string;
    shop_detail_memo: string;
    budget_memo: string;
    wedding: string;
    course: string;
    free_drink: string;
    free_food: string;
    private_room: string;
    horigotatsu: string;
    tatami: string;
    card: string;
    non_smoking: string;
    charter: string;
    parking: string;
    barrier_free: string;
    show: string;
    karaoke: string;
    band: string;
    tv: string;
    lunch: string;
    midnight: string;
    english: string;
    pet: string;
    child: string;
    wifi: string;
    coupon_urls: HotPepperCouponUrls;
}

interface HotPepperResults {
    api_version: string;
    results_available: number;
    results_returned: number;
    results_start: number;
    shop?: HotPepperShop[];
}

export interface HotPepperApiResponse {
    results: HotPepperResults;
}

export interface Shop {
    id: string;
    name: string;
    logoImage: string;
    nameKana: string;
    address: string;
    stationName: string;
    lat: number;
    lng: number;
    genre: string;
    genreCatch: string;
    subGenre: string;
    budget: string;
    budgetAverage: string;
    budgetMemo: string;
    catch: string;
    capacity: number;
    access: string;
    mobileAccess: string;
    photo: string;
    photoMedium: string;
    photoSmall: string;
    url: string;
    couponUrlPc: string;
    couponUrlSp: string;
    open: string;
    close: string;
    partyCapacity: number;
    wifi: string;
    wedding: string;
    course: string;
    freeDrink: string;
    freeFood: string;
    privateRoom: string;
    horigotatsu: string;
    tatami: string;
    card: string;
    nonSmoking: string;
    charter: string;
    parking: string;
    barrierFree: string;
    show: string;
    karaoke: string;
    band: string;
    tv: string;
    lunch: string;
    midnight: string;
    english: string;
    pet: string;
    child: string;
}

export type HotPepperResponse = {
    total: number;
    shops: Shop[];
    pagination: {
        page: number;
        pageSize: number;
        totalCount: number;
        totalPages: number;
    };
};
export type SearchParams = {
    keyword?: string;
    genre?: string;
    lat?: string;
    lng?: string;
    range?: number;
    page: number;
};

// ジャンルマスタAPI

export type HotPepperGenreMasterResponse = {
    results: {
        api_version: string;
        results_available: number;
        results_returned: number;
        results_start: number;
        genre: HotPepperGenre[];
    };
};

export type HotPepperGenreMasterGenre = {
    code: string;
    name: string;
};

export type Genre = {
    code: string;
    name: string;
};

export type HotPepperGenreResponse = {
    apiVersion: string;
    totalCount: number;
    returnedCount: number;
    start: number;
    genres: Genre[];
};

export interface ShopCard {
    id: string;
    name: string;
    access: string;
    image: string;
    genre: string;
    budget: string;
}
