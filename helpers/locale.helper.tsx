import { en } from "locales/en.locale";
import { pt } from "locales/pt.locale";


type localeType = typeof en | typeof pt;

export function setLocale(locale: string | undefined): localeType {
    switch (locale) {
        case 'pt':
            return pt;
        default:
            return en;
    }
}