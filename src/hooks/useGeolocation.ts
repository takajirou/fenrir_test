import { useEffect, useState } from "react";

interface GeolocationState {
    lat: number | null;
    lng: number | null;
    error: string | null;
    loading: boolean;
}

export const useGeolocation = () => {
    const [state, setState] = useState<GeolocationState>({
        lat: null,
        lng: null,
        error: null,
        loading: true,
    });

    useEffect(() => {
        let cancelled = false;

        const onSuccess = (position: GeolocationPosition) => {
            if (cancelled) return;

            setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                error: null,
                loading: false,
            });
        };

        const onError = (error: GeolocationPositionError) => {
            if (cancelled) return;

            const message =
                error.code === error.PERMISSION_DENIED
                    ? "位置情報の利用が拒否されました"
                    : "位置情報の取得に失敗しました";

            setState({
                lat: null,
                lng: null,
                error: message,
                loading: false,
            });
        };

        if (!navigator.geolocation) {
            onError({
                code: 0,
                message: "GeolocationAPIがサポートされていません",
                PERMISSION_DENIED: 1,
                POSITION_UNAVAILABLE: 2,
                TIMEOUT: 3,
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        });

        return () => {
            cancelled = true;
        };
    }, []);

    return state;
};
