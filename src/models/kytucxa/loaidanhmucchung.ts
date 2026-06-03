import useInitModel from '@/hooks/useInitModel';
import { KyTucXa } from '@/services/KyTucXa/typing';
import { ipCsvc } from '@/utils/ip';

export default () => {
  const objInit = useInitModel<KyTucXa.ILoaiDanhMucChung>('loai-danh-muc-chung', undefined, undefined, ipCsvc);
  const { setLoading, getService, setDanhSach } = objInit;

  const getAllLoaiDanhMucChungPublicModel = async (): Promise<KyTucXa.ILoaiDanhMucChung[]> => {
    setLoading(true);

    try {
      const res = await getService({}, 'public/loai-danh-muc-chung/all', true);
      const data = Array.isArray(res?.data) ? res?.data : (res?.data?.data ?? []);
      setDanhSach(data);
      return data;
    } catch (err) {
      setDanhSach([]);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    ...objInit,
    getAllLoaiDanhMucChungPublicModel,
  };
};
