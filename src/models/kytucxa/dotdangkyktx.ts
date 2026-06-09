import useInitModel from '@/hooks/useInitModel';
import { KyTucXa } from '@/services/KyTucXa/typing';

export default () => {
    const objInit = useInitModel<KyTucXa.IDotDangKy>('dot-dang-ky-ky-tuc-xa');

    return {
        ...objInit,
    };
};
