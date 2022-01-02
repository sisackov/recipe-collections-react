import { useEffect, useState } from 'react';

const useDataFetcher = (callback, args = []) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [data, setData] = useState([]);

    // useEffect(() => {
    const fetchData = async () => {
        console.log('fetching...');
        try {
            setIsLoading(true);
            const resultData = await callback.apply(null, args);
            setData(resultData);
        } catch (e) {
            setErrorMsg(e);
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
    // }, [callback, args]);

    return [data, isLoading, errorMsg];
};

export default useDataFetcher;
