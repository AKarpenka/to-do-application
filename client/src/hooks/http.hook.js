import { useCallback } from "react";

export const useHttp = () => {

    const request = useCallback(async (urlPath, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        const url = `${process.env.REACT_APP_SERVERURL}/${urlPath}`;

        try {
            const response = await fetch(url, {method, body, headers});
            
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    }, []);

    return {request}
}