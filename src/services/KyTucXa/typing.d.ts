import type { ETrangThaiDotDangKy, ETrangThaiPhong, ETrangThaiSinhVien, EGioiTinh, ELoaiKhoanThu, ERuleType, ETrangThaiCheckIn } from './constant';

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

	export interface IDotDangKy {
        _id: string;
        tenDot: string;
        maHocKy: string;
        thoiGianBatDau: string;
        thoiGianKetThuc: string;
        maKhoaNganh: string[];
		danhSachToaNha?: string[];
		danhSachPhong?: string[];
        ghiChu: string;
        soLuongDon: number;
    }

	export interface ILoaiDanhMucChung {
		_id: string;
		ma: string;
		maLoai: string;
		ten: string;
		tenEn?: string | null;
		ghiChu: string | null;
		anh: string | null;
		dataPartitionCode: string | null;
		createdAt?: string;
		updatedAt?: string;
	}

	export interface ICheckInSinhVien {
		_id: string,
		ssoId: string,
		maSinhVien: string,
		hoTen: string,
		maPhong: string,
		maToaNha: string,
		ngayBatDau: string,
		ngayKetThuc: string,
		trangThai: ETrangThaiCheckIn,
		dangKyId: string,
		ghiChu: string
	}

}
