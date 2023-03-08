import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const getCSRFCookie = (name: string) => {
    if (name) {
        const cookieValue = document.cookie.split("; ").find((row) => row.startsWith(name))?.split('=')[1]

        return cookieValue;
    }
}
