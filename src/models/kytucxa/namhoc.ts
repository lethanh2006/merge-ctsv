import useInitModel from '@/hooks/useInitModel';
import { KyTucXa } from '@/services/KyTucXa/typing';
import { ipDaoTao } from '@/utils/ip';

export default () => {
    const objInit = useInitModel<KyTucXa.INamHoc>('nam-hoc', undefined, undefined, ipDaoTao);

    return {
        ...objInit,
    };
};
