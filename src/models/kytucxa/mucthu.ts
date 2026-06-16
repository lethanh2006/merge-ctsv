import useInitModel from '@/hooks/useInitModel';
import { KyTucXa } from '@/services/KyTucXa/typing';
import { ipTaiChinh } from '@/utils/ip';

export default () => {
    const objInit = useInitModel<KyTucXa.IMucThu>('muc-thu', undefined, undefined, ipTaiChinh);

    const getAllModel: typeof objInit.getAllModel = async (
        isSetRecord,
        sortParam,
        conditionParam,
        filterParam,
        pathParam,
        isSetDanhSach,
        selectParams,
        otherQuery,
        config,
    ) => {
        const defaultFilter: any[] = [
            {
                field: ['khoanThu', 'maNguonThu'],
                operator: 'eq',
                values: ['KTX'],
            },
        ];

        return objInit.getAllModel(
            isSetRecord,
            sortParam,
            conditionParam,
            filterParam ? [...defaultFilter, ...filterParam] : defaultFilter,
            pathParam,
            isSetDanhSach,
            selectParams,
            otherQuery,
            config,
        );
    };

    return {
        ...objInit,
        getAllModel,
    };
};
