import useInitModel from '@/hooks/useInitModel';
import { KyTucXa } from '@/services/KyTucXa/typing.d';
import { ipCsvc } from '@/utils/ip';

export default () => {
    const objInit = useInitModel<KyTucXa.IDotDangKyKTX>('dot-dang-ky-ky-tuc-xa', undefined, undefined, ipCsvc);

    return {
        ...objInit,
    };
};
