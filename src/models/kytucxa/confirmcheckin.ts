import useInitModel from '@/hooks/useInitModel';
import { KyTucXa } from '@/services/KyTucXa/typing.d';
import { ipCsvc } from '@/utils/ip';

export default () => {
    const objInit = useInitModel<KyTucXa.ICheckInSinhVien>('dang-ky-ky-tuc-xa/nhan-phong', undefined, undefined, ipCsvc);

    return {
        ...objInit,
    };
};
