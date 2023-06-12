import { getItems } from "./storage"

export const isAuth = () => {
    return getItems() != null ? true : false;
}