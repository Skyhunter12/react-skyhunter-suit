
import { useEffect, useState } from 'react';
import axios from 'axios';
const useApiAddress = () => {
    const [ip, setIp] = useState(null);
    const [geoPlugin, setGeoPlugin] = useState(undefined);

    const controller = new AbortController();
    const getApiAddress = () => {
        axios({
            method: 'get',
            url: 'https://api.ipify.org?format=json',
            signal: controller.signal
        }).then((res) => {
            if (res.status === 200 && res.data && res.data.ip) {
                setIp(res.data.ip);
            } else {
                throw new Error('response error');
            }
        })
        .catch((error) => {
            console.log('getApiAddress failed', error);
        });
    };

    const getGeoByIp = () => {
        axios({
            method: 'get',
            url: `http://www.geoplugin.net/json.gp?ip=${ip}`,
            signal: controller.signal
        })
            .then((res) => {
                if (res.status === 200 && res.data) {
                    setGeoPlugin(res.data);
                } else {
                    throw new Error('response error');
                }
            })
            .catch((error) => {
                console.log('getGeoByIp failed', error);
            });
    };

    useEffect(() => {
        getApiAddress();
        return () => controller.abort();
    }, []);
    useEffect(() => {
        ip && getGeoByIp();
        return () => controller.abort();
    }, [ip]);
    return {
        ip,
        geoPlugin
    };
};

export default useApiAddress;