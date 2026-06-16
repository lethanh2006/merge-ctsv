import useInitModel from '@/hooks/useInitModel';
import { KyTucXa } from '@/services/KyTucXa/typing';
import { ipCsvc } from '@/utils/ip';

const POPULATION = [{ path: 'dangKyKyTucXaRule' }];

export default () => {
    const objInit = useInitModel<KyTucXa.IPhong>('phong/ktx', undefined, undefined, ipCsvc);

    const getModel: typeof objInit.getModel = (paramCondition, filterParams, sortParam, paramPage, paramLimit, path, otherQuery, ...rest) =>
        objInit.getModel(paramCondition, filterParams, sortParam, paramPage, paramLimit, path, { population: POPULATION, ...otherQuery }, ...rest);

    return {
        ...objInit,
        getModel,
    };
};
