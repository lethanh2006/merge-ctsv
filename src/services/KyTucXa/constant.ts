export enum ETrangThaiSinhVien {
	CHUA_DUYET = 'CHUA_DUYET',
	DA_DUYET = 'DA_DUYET',
	KHONG_DUYET = 'KHONG_DUYET',
}

export const transTrangThaiSinhVien: Record<ETrangThaiSinhVien, string> = {
	[ETrangThaiSinhVien.CHUA_DUYET]: 'Chưa duyệt',
	[ETrangThaiSinhVien.DA_DUYET]: 'Đã duyệt',
	[ETrangThaiSinhVien.KHONG_DUYET]: 'Không duyệt',
};

export const colorTrangThaiSinhVien: Record<ETrangThaiSinhVien, string> = {
	[ETrangThaiSinhVien.CHUA_DUYET]: 'blue',
	[ETrangThaiSinhVien.DA_DUYET]: 'green',
	[ETrangThaiSinhVien.KHONG_DUYET]: 'orange',
};

export enum EGioiTinh {
	NAM = 'Nam',
	NU = 'Nữ',
}

export enum ELoaiSinhVien {
	VIET_NAM = 'Việt Nam',
	QUOC_TE = 'Quốc tế',
}

export enum ELoaiKhoanThu {
	KTX = 'KTX',
}

export enum ERuleType {
	GIOI_TINH = 'GIOI_TINH',
	MAX_PER_KHOA = 'MAX_PER_KHOA',
	MIN_AGE = 'MIN_AGE',
	MAX_AGE = 'MAX_AGE',
}

export const transRuleType: Record<ERuleType, string> = {
	[ERuleType.GIOI_TINH]: 'Giới tính',
	[ERuleType.MAX_PER_KHOA]: 'Giới hạn mỗi khoa',
	[ERuleType.MIN_AGE]: 'Tuổi tối thiểu',
	[ERuleType.MAX_AGE]: 'Tuổi tối đa',
};

export const colorRuleType: Record<ERuleType, string> = {
	[ERuleType.GIOI_TINH]: 'blue',
	[ERuleType.MAX_PER_KHOA]: 'purple',
	[ERuleType.MIN_AGE]: 'orange',
	[ERuleType.MAX_AGE]: 'volcano',
};

export enum ECurrency {
	VND = 'VND',
	USD = 'USD',
	EUR = 'EUR',
}

export const currencyOptions = Object.values(ECurrency).map((v) => ({
	value: v,
	label: v,
}));

export enum ELoaiDoiTuong {
	TOA_NHA = 'TOA_NHA',
	PHONG = 'PHONG',
}

export const transLoaiDoiTuong: Record<ELoaiDoiTuong, string> = {
	[ELoaiDoiTuong.TOA_NHA]: 'Tòa nhà',
	[ELoaiDoiTuong.PHONG]: 'Phòng',
};

export const loaiDoiTuongOptions = Object.values(ELoaiDoiTuong).map((v) => ({
	value: v,
	label: transLoaiDoiTuong[v],
}));

export enum ETrangThaiCheckIn {
	DANG_O = 'Đang ở',
	DA_RA = 'Đã ra',
}
