import useInitModel from '@/hooks/useInitModel';
import { KyTucXa } from '@/services/KyTucXa/typing';
import { ipCsvc } from '@/utils/ip';
import axios from '@/utils/axios';

export default () => {
    const objInit = useInitModel<KyTucXa.IDanhSachMienKTX>('danh-sach-mien-ky-tuc-xa', undefined, undefined, ipCsvc);

    const postMienDangKySinhVien = (danhSachId: string, danhSach: { maSinhVien: string; hoTen: string; khoaSinhVien: string }[], headers?: any) => {
        return axios.post(`${ipCsvc}/danh-sach-mien-ky-tuc-xa/${danhSachId}/sinh-vien`, { danhSach }, { headers });
    };

    const postDuyet = (id: string, headers?: any) => {
        return axios.post(`${ipCsvc}/danh-sach-mien-ky-tuc-xa/sinh-vien/${id}/duyet`, {}, { headers });
    };

    const postTuChoi = (id: string, body?: any, headers?: any) => {
        return axios.post(`${ipCsvc}/danh-sach-mien-ky-tuc-xa/sinh-vien/${id}/tu-choi`, body, { headers });
    };

    const deleteSinhVien = (id: string, headers?: any) => {
        return axios.delete(`${ipCsvc}/danh-sach-mien-ky-tuc-xa/sinh-vien/${id}`, { headers });
    };

    const getSinhVien = (danhSachId: string, headers?: any) => {
        return axios.get(`${ipCsvc}/danh-sach-mien-ky-tuc-xa/${danhSachId}/sinh-vien`, { headers });
    };

    const putDonMienKTX = (id: string, body: any, headers?: any) => {
        return axios.put(`${ipCsvc}/danh-sach-mien-ky-tuc-xa/don/${id}`, body, { headers });
    };


    return {
        ...objInit,
        postMienDangKySinhVien,
        postDuyet,
        postTuChoi,
        deleteSinhVien,
        getSinhVien,
        putDonMienKTX,
    };
};
