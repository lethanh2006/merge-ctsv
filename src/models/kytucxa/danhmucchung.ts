import { EOperatorType } from '@/components/Table/constant';
import useInitModel from '@/hooks/useInitModel';
import { KyTucXa } from '@/services/KyTucXa/typing';
import { ipCsvc } from '@/utils/ip';

export default () => {
    const objInit = useInitModel<KyTucXa.IDanhMucChung>(
        'danh-muc-chung',
        undefined,
        undefined,
        ipCsvc,
        undefined,
        [{ field: 'maLoai' as keyof KyTucXa.IDanhMucChung, operator: EOperatorType.INCLUDE, values: ['TIEN_ICH_PHONG', 'LOAI_PHONG_KTX'] }]
    );

    const getAllModel: typeof objInit.getAllModel = (isSetRecord, sortParam, conditionParam, filterParam, ...rest) => {
        const finalFilters = [
            { field: 'maLoai' as keyof KyTucXa.IDanhMucChung, operator: EOperatorType.INCLUDE, values: ['TIEN_ICH_PHONG', 'LOAI_PHONG_KTX'] },
            ...(filterParam || []),
        ];
        return objInit.getAllModel(isSetRecord, sortParam, conditionParam, finalFilters, ...rest);
    };

    return {
        ...objInit,
        getAllModel,
    };
};
