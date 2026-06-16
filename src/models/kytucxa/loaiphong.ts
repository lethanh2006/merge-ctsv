import useInitModel from '@/hooks/useInitModel';
import { KyTucXa } from '@/services/KyTucXa/typing';
import { ipCsvc } from '@/utils/ip';

export default () => {
    const objInit = useInitModel<KyTucXa.IDanhMucChung>(
        'danh-muc-chung',
        undefined,
        { maLoai: 'LOAI_PHONG_KTX' },
        ipCsvc
    );

    const getAllModel: typeof objInit.getAllModel = (isSetRecord, sortParam, conditionParam, ...rest) => {
        const finalCondition = {
            maLoai: 'LOAI_PHONG_KTX',
            ...(conditionParam || {}),
        };
        return objInit.getAllModel(isSetRecord, sortParam, finalCondition, ...rest);
    };

    return {
        ...objInit,
        getAllModel,
    };
};
