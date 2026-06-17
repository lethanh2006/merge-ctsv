import useInitModel from '@/hooks/useInitModel';
import { ipCsvc } from '@/utils/ip';
import axios from '@/utils/axios';
import { message } from 'antd';

export default () => {
	const objInit = useInitModel<any>('danh-sach-mien-ky-tuc-xa/sinh-vien', undefined, undefined, ipCsvc);

	const getModel = async (
		paramCondition?: any,
		filterParams?: any,
		sortParam?: any,
		paramPage?: number,
		paramLimit?: number,
		path?: string,
		otherQuery?: any,
		isSetDanhSach?: boolean,
		isAbsolutePath?: boolean,
		selectParams?: string[],
		config?: any,
	) => {
		const danhSachId = otherQuery?.danhSachId || paramCondition?.danhSachId || objInit.condition?.danhSachId;
		if (!danhSachId) {
			if (isSetDanhSach !== false) {
				objInit.setDanhSach([]);
				objInit.setTotal(0);
			}
			return [];
		}

		objInit.setLoading(true);
		try {
			const res = await axios.get(`${ipCsvc}/danh-sach-mien-ky-tuc-xa/${danhSachId}/sinh-vien`);
			const rawData = res?.data?.data?.result || res?.data?.data || res?.data || [];
			const data = Array.isArray(rawData) ? rawData : [];
			const list = data.map((item: any) => ({
				_id: item._id,
				danhSachId: item.danhSachId || danhSachId,
				code: item.maSinhVien,
				username: item.maSinhVien,
				fullname: item.hoTen || item.tenSinhVien || '',
				khoaSinhVien: item.khoaSinhVien || '',
				trangThaiMinhChung: item.trangThaiMinhChung,
				ghiChuDuyet: item.ghiChuDuyet || '',
				urlMinhChung: item.urlMinhChung || '',
				ssoId: item.ssoId || '',
				nguoiDuyet: item.nguoiDuyet || '',
			}));

			if (isSetDanhSach !== false) {
				objInit.setDanhSach(list);
				objInit.setTotal(list.length);
			}
			return list;
		} catch (err) {
			console.error(err);
			if (isSetDanhSach !== false) {
				objInit.setDanhSach([]);
				objInit.setTotal(0);
			}
			return [];
		} finally {
			objInit.setLoading(false);
		}
	};

	const postModel = async (
		payload: any,
		getData?: any,
		closeModal?: boolean,
		messageText?: string,
	) => {
		objInit.setFormSubmiting(true);
		try {
			const student = {
				maSinhVien: payload.code,
				hoTen: payload.fullname,
				khoaSinhVien: payload.khoaSinhVien || '',
				urlMinhChung: payload.urlMinhChung || '',
			};
			const danhSachId = payload.danhSachId;
			if (!danhSachId) {
				throw new Error('Thiếu ID danh sách (học kỳ)');
			}
			const res = await axios.post(`${ipCsvc}/danh-sach-mien-ky-tuc-xa/${danhSachId}/sinh-vien`, {
				danhSach: [student],
			});
			message.success(messageText || 'Thêm mới thành công');
			if (getData) getData();
			else getModel({ danhSachId });
			if (closeModal !== false) objInit.setVisibleForm(false);
			return res.data?.data;
		} catch (err) {
			console.error(err);
			message.error('Thêm mới thất bại');
			return Promise.reject(err);
		} finally {
			objInit.setFormSubmiting(false);
		}
	};

	const putModel = async (
		id: string | number,
		payload: any,
		getData?: any,
		notGet?: boolean,
		closeModal?: boolean,
		messageText?: string,
	) => {
		objInit.setFormSubmiting(true);
		try {
			const body = {
				danhSachId: payload.danhSachId,
				maSinhVien: payload.code || payload.maSinhVien,
				hoTen: payload.fullname || payload.hoTen,
				khoaSinhVien: payload.khoaSinhVien || '',
				urlMinhChung: payload.urlMinhChung || '',
				trangThaiMinhChung: payload.trangThaiMinhChung || 'Chờ duyệt',
			};
			const res = await axios.put(`${ipCsvc}/danh-sach-mien-ky-tuc-xa/don/${id}`, body);
			message.success(messageText || 'Lưu thành công');
			if (getData) getData();
			else if (!notGet) getModel({ danhSachId: payload.danhSachId });
			if (closeModal !== false) objInit.setVisibleForm(false);
			return res.data?.data;
		} catch (err) {
			console.error(err);
			message.error('Cập nhật thất bại');
			return Promise.reject(err);
		} finally {
			objInit.setFormSubmiting(false);
		}
	};

	return {
		...objInit,
		getModel,
		postModel,
		putModel,
	};
};
