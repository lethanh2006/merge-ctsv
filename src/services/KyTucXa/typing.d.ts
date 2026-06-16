import type { ETrangThaiDotDangKyKTX, ETrangThaiPhong, ETrangThaiSinhVienKTX, EGioiTinh, ELoaiKhoanThu, ERuleType } from './constant';

declare module KyTucXa {
	export interface IToa {
		_id: string;
		ma: string;
		ten: string;
		diaChi: string;
	}

	export interface IPhong {
		_id: string;
		ma: string;
		ten?: string;

		maloaiPhongKtx?: string;
		maGioiTinh?: EGioiTinh | string;
		soLuongToiDa?: number;
		soLuongHienTai?: number;
		cachBoTri?: string;
		maKhoanThuPhong?: string;
		maKhoanThuCoc?: string;
		moTa?: string;
		danhSachAnh?: string[];
		danhSachTienIch: ITienIch[];
		maToaNha?: string;
		soPhongTam?: number;

		dangKyKyTucXaRule?: {
			_id?: string;
			phongId?: string;
			gioiTinh?: EGioiTinh | string;
			maxPerKhoa?: number | null;
			quocTichPhong?: string | null;
		};
	}

	export interface IKhoanThu {
		_id: string;
		maNamHoc: string;
		ten: string;
		loai: ELoaiKhoanThu;
		maDoiTuong: string;
		unitLabel: string;
		maMucThu: string;
		tenMucThu: string;
		unitAmount: number;
		currency: string;
	}

	export interface INamHoc {
		_id: string;
		ma: string;
		ten: string;
		thoiGianBatDau: string;
	}

	export interface IUnitLabel {
		_id: string;
		ma: string;
		donViTinh: string;
	}

	export interface IMucThu {
		_id: string;
		ma: string;
		name: string;
		unitAmount: number;
	}

	export interface IDanhMucChung {
		_id: string;
		maLoai: string;
		ma: string;
		ten: string;
		cauHinh?: {
			tienIchChung?: boolean;
		}
		anh?: string;
		ghiChu?: string;
	}

	export interface ITienIch {
		maDanhMucTienIch: string;
		soLuong: number;
	}

	export interface ICauHinhKhoaToa {
		maKhoaSinhVien: string;
		danhSachToaNha: string[];
	}

	export interface ISinhVienDangKyKTX {
		_id: string;
		maSinhVien?: string;
		ma?: string;
		hoTen?: string;
		tenSinhVien?: string;
		maKhoaSinhVien?: string;
		khoaSinhVien?: {
			ma?: string;
			ten?: string;
		};
	}

	export interface IDotDangKy {
		_id: string;
		tenDot: string;
		maHocKy: string;
		thoiGianBatDau: string;
		thoiGianKetThuc: string;
		ngayChuyenVao: string;
		ngayChuyenRa: string;
		loaiDot?: 'Theo khoa' | 'Theo danh sách';
		cauHinhKhoaToa?: ICauHinhKhoaToa[];
		hanDuyetMien?: string | null;
		maKhoaNganh: string[];
		danhSachToaNha?: string[];
		danhSachPhong?: string[];
		ghiChu: string;
		soLuongDon: number;
	}



	export interface IDanhSachMienKTX {
		_id: string;
		maHocKy: string;
		tenHocKy: string;
		hanNopMinhChung: string;
		ghiChu: string;
	}


	export interface IDanhSachMienKTXSinhVien {
		_id: string;
		danhSachId: string;
		maSinhVien: string;
		ssoId: string;
		hoTen: string;
		urlMinhChung: string;
		trangThaiMinhChung?: ETrangThaiMienDangKyKTX | string;
		ngayDuyet: string;
		nguoiDuyet: string;
		ghiChuDuyet: string;

	}
}
