import useInitModel from '@/hooks/useInitModel';
import { KyTucXa } from '@/services/KyTucXa/typing';
import { ipCsvc } from '@/utils/ip';
import axios from '@/utils/axios';

export default () => {
    const objInit = useInitModel<KyTucXa.IDotDangKy>('dot-dang-ky-ky-tuc-xa');

    const postSinhVienDangKy = (dotId: string, danhSachMaSinhVien: { maSinhVien: string; hoTen: string, khoaSinhVien: string }[], headers?: any) => {
        const payloadList = (danhSachMaSinhVien || []).map((item) => ({
            maSinhVien: item.maSinhVien,
            hoTen: item.hoTen || '',
            khoaSinhVien: item.khoaSinhVien || '',
        }));
        return axios.post(`${ipCsvc}/dot-dang-ky-ky-tuc-xa/${dotId}/sinh-vien-dang-ky`, { danhSachMaSinhVien: payloadList }, { headers });
    };
    const getSinhVienDangKy = (dotId: string, headers?: any) => {
        return axios.get(`${ipCsvc}/dot-dang-ky-ky-tuc-xa/${dotId}/sinh-vien-dang-ky`, { headers });
    };
    const deleteSinhVienDangKy = (dotId: string, id: string, headers?: any) => {
        return axios.delete(`${ipCsvc}/dot-dang-ky-ky-tuc-xa/${dotId}/sinh-vien-dang-ky/${id}`, { headers });
    };
    return {
        ...objInit,
        postSinhVienDangKy,
        getSinhVienDangKy,
        deleteSinhVienDangKy,
    };
};
