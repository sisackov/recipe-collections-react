// import { useEffect, useState } from 'react';

// const useDataFetcher = (callback, args = []) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [errorMsg, setErrorMsg] = useState('');
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             console.log('useDataFetcher...');
//             try {
//                 setIsLoading(true);
//                 const resultData = await callback(...args);
//                 setData(resultData);
//             } catch (e) {
//                 setErrorMsg(e);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     return [data, isLoading, errorMsg];
// };

// export default useDataFetcher;
