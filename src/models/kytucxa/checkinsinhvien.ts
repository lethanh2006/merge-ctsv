import useInitModel from '@/hooks/useInitModel';
import type { KyTucXa } from '@/services/KyTucXa/typing.d';
import { ipCsvc } from '@/utils/ip';

export default () => {
    const objInit = useInitModel<KyTucXa.ICheckInSinhVien>('sinh-vien-ktx', undefined, undefined, ipCsvc);

    return {
        ...objInit,
    };
};
