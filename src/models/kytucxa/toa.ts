import useInitModel from '@/hooks/useInitModel';
import { KyTucXa } from '@/services/KyTucXa/typing';
import { ipCsvc } from '@/utils/ip';

export default () => {
	const objInit = useInitModel<KyTucXa.IToa>('toa-nha/ktx', undefined, undefined, ipCsvc);

	const getModel: typeof objInit.getModel = async (
		paramCondition,
		filterParams,
		sortParam,
		paramPage,
		paramLimit,
		path,
		otherQuery,
		isSetDanhSach,
		isAbsolutePath,
		selectParams,
		config,
	) => {
		return objInit.getModel(
			paramCondition,
			filterParams,
			sortParam,
			paramPage,
			paramLimit,
			path || 'toa-nha/ktx',
			otherQuery,
			isSetDanhSach,
			isAbsolutePath !== undefined ? isAbsolutePath : !path,
			selectParams,
			config,
		);
	};

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
		objInit.setLoading(true);
		try {
			const payload = {
				condition: conditionParam,
				sort: sortParam,
				filters: filterParam,
				select: selectParams?.join(' '),
				...(otherQuery ?? {}),
			};
			// By passing path = 'toa-nha/ktx' and isAbsolutePath = true, getService evaluates to `${ipCsvc}/toa-nha/ktx` without trailing slash!
			const response = await objInit.getService(
				payload as any,
				pathParam || 'toa-nha/ktx',
				!pathParam, // if pathParam is not provided, use our absolute path 'toa-nha/ktx'
				config?.dataPartitionCode ? { 'x-data-partition-code': config.dataPartitionCode } : undefined,
			);
			const data = response?.data?.data ?? [];
			if (isSetDanhSach !== false) objInit.setDanhSach(data);
			if (isSetRecord) objInit.setRecord(data?.[0]);

			return data;
		} catch (er) {
			if (isSetDanhSach !== false) {
				objInit.setDanhSach([]);
				objInit.setTotal(0);
			}
			return Promise.reject(er);
		} finally {
			objInit.setLoading(false);
		}
	};

	return {
		...objInit,
		getModel,
		getAllModel,
	};
};
