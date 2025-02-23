import useAppState from "../hooks/appState";

export const geoLocatorProduct = (productsArr) => {
    const { ipInfo } = useAppState();

    if (ipInfo?.country_name === "Nigeria") {
        return productsArr.filter(product => product.store?.currency?.symbol === "#");
    } else {
        return productsArr.filter(product => product.store?.currency?.symbol === "$");
    }
};
