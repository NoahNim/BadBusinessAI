import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const getCSRFCookie = (name: string) => {
    if (name) {
        const cookieValue = document.cookie.split("; ").find((row) => row.startsWith(name))?.split('=')[1]

        console.log(cookieValue)

        return cookieValue;
    }
}

export const listCookies = () => {
    let theCookies = document.cookie.split(';');
    let aString = [];
    for (let i = 1; i <= theCookies.length; i++) {
        aString.push(theCookies[i])
    }
    return aString;
}