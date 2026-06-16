export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: 'user/Login',
			},
		],
	},

	// GROUP TITLE
	// {
	// 	name: 'DashboardGroup',
	// 	path: '/__group__/dashboard',
	// 	disabled: true,
	// },

	///////////////////////////////////

	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: 'TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: 'TienIch/GioiThieu',
		hideInMenu: true,
	},

	// SINH VIEN
	{
		name: 'SinhVien',
		path: '/sinh-vien',
		icon: 'contacts',
		routes: [
			// {
			// 	name: 'DotCapNhatHoSo',
			// 	path: 'dot-cap-nhat-ho-so',
			// 	component: 'DaoTaoV2/SinhVien/DotCapNhatHoSo',
			// 	// component: 'TrangChu',
			// },
			{
				name: 'DanhSachSinhVien',
				path: 'danh-sach-sinh-vien',
				component: 'DaoTaoV2/SinhVien',
				// component: 'TrangChu',
			},
			// {
			// 	name: 'HoSoTheoDoiSucKhoe',
			// 	path: 'ho-so-theo-do-suc-kheo',
			// 	icon: 'HeartOutlined',
			// 	routes: [
			// 		{
			// 			name: 'DotKhamSucKhoe',
			// 			path: 'dot-kham-suc-khoe',
			// 			component: 'HoSoTheoDoiSucKhoe/DotKhamSucKhoe',
			// 		},
			// 		{
			// 			name: 'KetQuaKhamSucKhoe',
			// 			path: 'ket-qua-kham-suc-khoe',
			// 			component: 'HoSoTheoDoiSucKhoe/KetQuaKhamSucKhoe',
			// 		},
			// 	],
			// },
			// {
			// 	name: 'LopHanhChinh',
			// 	path: 'lop-hanh-chinh',
			// 	component: 'DaoTaoV2/NamHoc/LopHanhChinh',
			// },
			// {
			// 	name: 'BanCanSuLop',
			// 	path: 'ban-can-su-lop',
			// 	component: 'DaoTaoV2/NamHoc/SvLopHanhChinhNamHoc',
			// },
			// {
			// 	name: 'CoVanHocTap',
			// 	path: 'co-van-hoc-tap',
			// 	component: 'DaoTaoV2/NamHoc/CoVanLopHanhChinhNamHoc',
			// },
			// {
			// 	name: 'ThongKe',
			// 	path: 'thong-ke-sinh-vien',
			// 	component: 'DaoTaoV2/SinhVien/ThongKe',
			// 	// component: 'TrangChu',
			// },
			// // {
			// //   name: 'LopHanhChinh',
			// //   path: 'lop-hanh-chinh',
			// //   component: 'NamHoc/LopHanhChinh',
			// // },
			// // {
			// //   name: 'DotNhapHoc',
			// //   path: 'dot-nhap-hoc',
			// //   component: 'NamHoc/DotNhapHoc',
			// // },
			// // {
			// //   name: 'ChuyenTruong',
			// //   path: 'chuyen-truong',
			// // },
			// // {
			// //   name: 'KhenThuong',
			// //   path: 'khen-thuong',
			// // },
			// // {
			// //   name: 'KyLuat',
			// //   path: 'ky-luat',
			// // },
		],
	},

	//////////////////////
	// LỚP HÀNH CHÍNH

	//////////////////////
	// SU KIEN
	// {
	// 	name: 'SuKien',
	// 	icon: 'calendar',
	// 	path: '/su-kien',
	// 	routes: [
	// 		{
	// 			name: 'TuanLeCongDan',
	// 			path: 'tuan-le-cong-dan',
	// 			// component: 'SuKien',
	// 			component: 'HoatDongChung/TuanSinhHoatCongDan',
	// 		},
	// 		{
	// 			name: 'CacHoatDongChoSinhVien',
	// 			path: 'cac-hoat-dong-cho-sinh-vien',
	// 			// component: 'SuKien',
	// 			component: 'HoatDongChung/HuongNghiepViecLam',
	// 		},
	// 		{
	// 			name: 'HoatDongHuyDongGiaoDucTuTuongChinhTri',
	// 			path: 'huy-dong-giao-duc-tu-tuong-chinh-tri',
	// 			// component: 'SuKien',
	// 			component: 'HoatDongChung/HoatDongHuyDongGiaoDucTuTuongChinhTri',
	// 		},
	// 		{
	// 			name: 'DanhGiaKetQua',
	// 			path: 'danh-gia-ket-qua',
	// 			component: 'CheDoChinhSach/GiaoDucChinhTriTuTuong/QuyetDinhGDCTTT',
	// 		},
	// 		{
	// 			name: 'ThongKe',
	// 			path: 'thong-ke',
	// 			component: 'HoatDongChung/ThongKeGiaoDucChinhTriTuTuong',
	// 		},
	// 	],
	// },
	// {
	// 	path: `/qr-su-kien/:id`,
	// 	component: 'SuKien/QRCode',
	// 	layout: false,
	// 	hideInMenu: true,
	// },

	// SU KIEN V2
	// {
	// 	name: 'SuKienDRL',
	// 	icon: 'calendar',
	// 	path: '/su-kien-v2',
	// 	component: 'SuKienV2',
	// 	// access: 'accessFilter',
	// 	// maChucNang: 'ctsv|su-kien-drl',
	// },

	{
		name: 'SubmisstionRound',
		icon: 'ScheduleOutlined',
		path: '/activity-submission',
		routes: [
			{
				name: 'Management',
				path: 'dot',
				component: 'CCT/SubmisstionRound',
			},
			{
				name: 'DanhSach',
				path: 'danh-sach',
				component: 'CCT/SubmisstionRound/DanhSach',
			},
		],
	},

	{
		name: 'Activity',
		icon: 'AppstoreOutlined',
		path: '/activity-management',
		component: 'CCT/Activity',
		access: 'activityAccess',
	},

	{
		name: 'ActivityResuls',
		icon: 'TrophyOutlined',
		path: '/activity-results-approval',
		component: 'CCT/ActivityStudent',
		access: 'activityResultsAccess',
	},

	// {
	// 	path: `/qr-su-kien-v2/:id`,
	// 	component: 'SuKienV2/QRCode',
	// 	layout: false,
	// 	hideInMenu: true,
	// },
	// {
	// 	path: `/qr-tham-gia/:id`,
	// 	component: 'SuKienV2/QRCode/ThamGia',
	// 	layout: false,
	// 	hideInMenu: true,
	// },

	// quy trinh diem ren luyen ptit

	// {
	// 	name: 'DiemRenLuyen',
	// 	icon: 'FileOutlined',
	// 	path: '/diem-ren-luyen',
	// 	routes: [
	// 		{
	// 			name: 'BieuMau',
	// 			path: 'bieu-mau',
	// 			component: 'DiemRenLuyen/BieuMau',
	// 		},
	// 		{
	// 			name: 'Dot',
	// 			path: 'dot',
	// 			component: 'DiemRenLuyen/Dot',
	// 			access: 'accessFilter',
	// 			maChucNang: 'ctsv|diem-ren-luyen|dot',
	// 		},
	// 		{
	// 			name: 'LopHanhChinh',
	// 			path: 'lop-hanh-chinh',
	// 			access: 'accessFilter',
	// 			maChucNang: 'ctsv|diem-ren-luyen|dot',
	// 			routes: [
	// 				{
	// 					path: '',
	// 					hideInMenu: true,
	// 					component: 'DiemRenLuyen/LopHanhChinh',
	// 					exact: true,
	// 				},
	// 				{
	// 					path: ':id',
	// 					component: 'DiemRenLuyen/LopHanhChinh/$id',
	// 					hideInMenu: true,
	// 					exact: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: 'MinhChung',
	// 			path: 'minh-chung',
	// 			routes: [
	// 				{
	// 					name: 'CauHinh',
	// 					path: 'cau-hinh',
	// 					component: 'DiemRenLuyen/MinhChung/CauHinh',
	// 				},
	// 				{
	// 					name: 'DanhSachKhaiBao',
	// 					path: 'danh-sach-khai-bao',
	// 					access: 'accessFilter',
	// 					maChucNang: 'ctsv|diem-ren-luyen|minh-chung|khai-bao',
	// 					routes: [
	// 						{
	// 							path: '',
	// 							component: 'DiemRenLuyen/MinhChung/DanhSachKhaiBao',
	// 							hideInMenu: true,
	// 						},
	// 					],
	// 				},
	// 				{
	// 					name: 'ThongKe',
	// 					path: 'thong-ke',
	// 					component: 'DiemRenLuyen/MinhChung/ThongKe',
	// 				},
	// 			],
	// 		},

	// 		{
	// 			name: 'PhieuDiem',
	// 			path: 'phieu-diem',
	// 			component: 'DiemRenLuyen/PhieuDiem',
	// 			access: 'accessFilter',
	// 			maChucNang: 'ctsv|diem-ren-luyen|phieu-diem',
	// 		},
	// 		{
	// 			name: 'BienBanHop',
	// 			path: 'bien-ban-hop',
	// 			component: 'DiemRenLuyen/BienBanHop',
	// 			access: 'accessFilter',
	// 			maChucNang: 'ctsv|diem-ren-luyen|phieu-diem',
	// 		},
	// 		{
	// 			name: 'DonKhieuNai',
	// 			path: 'don-khieu-nai',
	// 			component: 'DiemRenLuyen/DonKhieuNai',
	// 			access: 'accessFilter',
	// 			maChucNang: 'ctsv|diem-ren-luyen|phieu-diem',
	// 		},
	// 		{
	// 			name: 'ThongKe',
	// 			path: 'thong-ke',
	// 			component: 'DiemRenLuyen/ThongKe',
	// 		},
	// 	],
	// },

	// {
	// 	name: 'HoatDongKetNoiVaPhucVuCongDong',
	// 	path: 'hoat-dong-ket-noi-va-phuc-vu-cong-dong',
	// 	icon: 'FileOutlined',
	// 	routes: [
	// 		{
	// 			name: 'DaoTaoBoiDuong',
	// 			path: 'dao-tao-boi-duong',
	// 			component: 'HoatDongChung/DaoTaoBoiDuong',
	// 			// component: 'SuKien',
	// 		},
	// 		{
	// 			name: 'HopTacNghienCuuChuyenGiao',
	// 			path: 'hop-tac-nghien-cuu-chuyen-giao',
	// 			// component: 'SuKien',
	// 			component: 'HoatDongChung/HopTacQuocTe',
	// 		},
	// 		{
	// 			name: 'ThucThiChinhSach',
	// 			path: 'thuc-thi-chinh-sach',
	// 			// component: 'SuKien',
	// 			component: 'HoatDongChung/ThucThiChinhSach',
	// 		},
	// 		{
	// 			name: 'HoatDongXaHoi',
	// 			path: 'hoat-dong-xa-hoi',
	// 			// component: 'SuKien',
	// 			component: 'HoatDongChung/HoatDongXaHoi',
	// 		},
	// 		{
	// 			name: 'Khac',
	// 			path: 'khac',
	// 			component: 'HoatDongChung/DonViNgoaiHocVien',
	// 			// component: 'SuKien',
	// 		},
	// 		{
	// 			name: 'ThongKe',
	// 			path: 'thong-ke',
	// 			component: 'HoatDongChung/ThongKePhucVuCongDong',
	// 		},
	// 	],
	// },

	// {
	// 	name: 'VanHoaVanNgheTheThao',
	// 	path: 'van-hoa-van-nghe-the-thao',
	// 	// component: 'SuKien',
	// 	icon: 'FileOutlined',
	// 	routes: [
	// 		{
	// 			name: 'QuanLyCauLacBo',
	// 			path: 'quan-ly-cau-lac-bo',
	// 			component: 'CauLacBo',
	// 		},
	// 		{
	// 			name: 'HoatDongCauLacBo',
	// 			path: 'hoat-dong-cau-lac-bo',
	// 			component: 'HoatDongChung/CauLacBo',
	// 			// component: 'SuKien',
	// 		},
	// 		{
	// 			name: 'SuKien',
	// 			path: 'su-kien',
	// 			component: 'HoatDongChung/VanHoaTheThao',
	// 			// component: 'SuKien',
	// 		},
	// 		{
	// 			name: 'ThongKe',
	// 			path: 'thong-ke',
	// 			// component: 'CauLacBo/ThongKe',
	// 			component: 'HoatDongChung/ThongKeVanHoaTheThao',
	// 		},
	// 	],
	// },

	// // Chế độ chính sách, học bổng
	// {
	// 	path: '/che-do-chinh-sach',
	// 	name: 'CheDoChinhSach',
	// 	icon: 'read',
	// 	routes: [
	// 		// DRL
	// 		{
	// 			name: 'DiemRenLuyen',
	// 			path: 'diem-ren-luyen',
	// 			icon: 'user',
	// 			routes: [
	// 				{
	// 					name: 'DotChamDiem',
	// 					path: 'dot-cham-diem',
	// 					component: 'DiemRenLuyen/DotVWA',
	// 				},
	// 				// {
	// 				// 	name: 'BieuMau',
	// 				// 	path: 'bieu-mau',
	// 				// 	component: 'DiemRenLuyen/BieuMau',
	// 				// },
	// 				{
	// 					name: 'PhieuDiem',
	// 					path: 'phieu-diem',
	// 					component: 'DiemRenLuyen/PhieuDiemVWA',
	// 				},
	// 				{
	// 					name: 'ThongKe',
	// 					path: 'thong-ke',
	// 					component: 'DiemRenLuyen/ThongKe',
	// 				},
	// 			],
	// 		},
	// 		// Khen thưởng kỷ luật
	// 		{
	// 			name: 'KhenThuongKyLuat',
	// 			path: 'khen-thuong-ky-luat',
	// 			icon: 'trophy',
	// 			routes: [
	// 				{
	// 					path: 'khen-thuong',
	// 					name: 'KhenThuong',
	// 					component: 'CheDoChinhSach/KhenThuong/QuyetDinhKhenThuong',
	// 				},
	// 				// {
	// 				// 	path: 'sang-kien',
	// 				// 	name: 'SangKien',
	// 				// 	component: 'KhenThuongKyLuat/SangKienNew',
	// 				// },
	// 				{
	// 					path: 'ky-luat',
	// 					name: 'KyLuat',
	// 					component: 'CheDoChinhSach/KyLuat/QuyetDinhKyLuat',
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: 'HocBong',
	// 			path: 'hoc-bong',
	// 			component: 'CheDoChinhSach/HocBong/QuyetDinhHocBong',
	// 		},
	// 		{
	// 			name: 'CheDoChinhSach',
	// 			path: 'che-do-chinh-sach',
	// 			component: 'CheDoChinhSach/CheDoChinhSach/QuyetDinhChinhSach',
	// 		},
	// 		{
	// 			name: 'BaoHiemXaHoi',
	// 			path: 'bao-hiem-xa-hoi',
	// 			component: 'CheDoChinhSach/BaoHiem/QuyetDinhBaoHiem',
	// 		},
	// 		{
	// 			name: 'ThongKe',
	// 			path: 'thong-ke',
	// 			component: 'CheDoChinhSach/ThongKe',
	// 		},
	// 	],
	// },

	/////////////////////////////
	// DICH VU HANH CHINH
	// {
	// 	name: 'DichVuHanhChinh',
	// 	icon: 'AuditOutlined',
	// 	path: '/dich-vu-hanh-chinh',
	// 	// access: 'nhanVien',
	// 	routes: [
	// 		{
	// 			name: 'ThongTinTongHop',
	// 			path: 'thong-tin-tong-hop',
	// 			component: 'DichVuMotCuaV2/ThongTinTongHop',
	// 			// access: 'accessFilter',
	// 			// maChucNang: 'don-dvmc-thao-tac:read-all',
	// 		},
	// 		{
	// 			name: 'QuanLyBieuMau',
	// 			path: 'bieu-mau',
	// 			component: 'DichVuMotCuaV2/QuanLyBieuMau',
	// 			// access: 'admin',
	// 			// maChucNang: 'dvmc-thao-tac:read',
	// 		},
	// 		{
	// 			name: 'QuanLyDon',
	// 			path: 'don-vmc',
	// 			component: 'DichVuMotCuaV2/QuanLyDon',
	// 			// access: 'admin',
	// 			// maChucNang: 'don-dvmc-thao-tac:read-all',
	// 		},
	// 		// {
	// 		//   name: 'ChuyenVienTiepNhanQuanLyDon',
	// 		//   path: 'chuyenvientiepnhan',
	// 		//   component: 'DichVuMotCuaV2/ChuyenVienXuLy',
	// 		//   access: 'user',
	// 		//   // maChucNang: 'don-dvmc-thao-tac:read-all',
	// 		// },
	// 		// {
	// 		//   name: 'ChuyenVienDieuPhoiQuanLyDon',
	// 		//   path: 'quanlydondieuphoi',
	// 		//   component: 'DichVuMotCuaV2/ChuyenVienDieuPhoi',
	// 		//   access: 'user',
	// 		//   // maChucNang: 'don-dvmc-thao-tac:read-all',
	// 		// },
	// 		// {
	// 		//   name: 'ChuyenVienTiepNhanQuanLyDon',
	// 		//   path: 'quanlydonchuyenvien',
	// 		//   // component: 'DichVuMotCuaV2/QuanLyDon',
	// 		//   // access: 'accessFilter',
	// 		//   maChucNang: 'don-dvmc-thao-tac:read-my',
	// 		// },
	// 	],
	// },

	//Quy trinh dong
	// {
	// 	name: 'QuyTrinh',
	// 	icon: 'AuditOutlined',
	// 	path: 'quy-trinh',
	// 	// component: 'KhaiBaoQuyTrinh',
	// 	routes: [
	// 		// {
	// 		// 	name: 'DieuPhoi',
	// 		// 	icon: 'AuditOutlined',
	// 		// 	path: 'dieu-phoi',
	// 		// 	component: 'QuyTrinhDong/TiepNhanDieuPhoiQuyTrinh/DieuPhoi',
	// 		// },
	// 		{
	// 			name: 'TiepNhan',
	// 			icon: 'AuditOutlined',
	// 			path: 'tiep-nhan',
	// 			component: 'QuyTrinhDong/TiepNhanDieuPhoiQuyTrinh/TiepNhan',
	// 		},
	// 		{
	// 			name: 'ThongKe',
	// 			path: 'thong-ke',
	// 			component: 'QuyTrinhDong/QuanLyQuyTrinh/ThongKe/indexv2',
	// 		},
	// 	],
	// },

	// {
	// 	name: 'DichVuChung',
	// 	path: 'dich-vu-chung',
	// 	icon: 'CustomerServiceOutlined',
	// 	routes: [
	// 		{
	// 			name: 'TheChat',
	// 			path: 'the-chat',
	// 			access: 'accessFilter',
	// 			maChucNang: 'qldt|the-chat|chuyen-vien',
	// 			routes: [
	// 				{
	// 					name: 'DanhMuc',
	// 					path: 'danh-muc',
	// 					component: 'TienIch/TheChat/DanhMuc',
	// 				},
	// 				{
	// 					name: 'DotDangKy',
	// 					path: 'dot-dang-ky',
	// 					component: 'TienIch/TheChat/Dot',
	// 				},
	// 				{
	// 					name: 'DanhSachSinhVien',
	// 					path: 'danh-sach-sinh-vien',
	// 					component: 'TienIch/TheChat/DanhSachSinhVien',
	// 				},
	// 			],
	// 		},
	// 	],
	// },

	// {
	// 	name: 'Minigame',
	// 	path: '/minigame',
	// 	icon: 'RocketOutlined',
	// 	access: 'accessFilter',
	// 	maChucNang: 'ctsv',
	// 	routes: [
	// 		{
	// 			name: 'VongQuayMM',
	// 			path: 'vong-quay',
	// 			routes: [
	// 				{
	// 					name: 'CauHinhVongQuay',
	// 					path: 'cau-hinh',
	// 					component: 'Minigame/VongQuayMM/CauHinhVongQuay',
	// 				},
	// 				{
	// 					name: 'LichSuQuay',
	// 					path: 'giai-thuong',
	// 					component: 'Minigame/VongQuayMM/LichSuQuay',
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: 'Voucher',
	// 			path: 'voucher',
	// 			component: 'Minigame/Voucher',
	// 		},
	// 	],
	// },

	// TIN TUC
	// {
	//   name: 'TinTuc',
	//   path: 'tin-tuc',
	//   icon: 'global',
	//   routes: [
	//     {
	//       name: 'ChuDe',
	//       path: 'chu-de',
	//       component: 'TinTuc/ChuDe',
	//       // access: 'adminAccessFilter',
	//       // maChucNang: 'chu-de-chung:read',
	//     },
	//     {
	//       name: 'TinTuc',
	//       path: 'tin-tuc',
	//       component: 'TinTuc/TinTuc',
	//       // access: 'adminAccessFilter',
	//       // maChucNang: 'tin-tuc:read',
	//     },
	//   ],
	// },

	//Nội ngoại trú
	// {
	// 	name: 'NoiNgoaiTru',
	// 	path: 'noi-ngoai-tru',
	// 	icon: 'BankOutlined',
	// 	routes: [
	// 		{
	// 			name: 'DotKhaiBaoNoiNgoaitru',
	// 			path: 'dot-khai-bao-noi-ngoai-tru',
	// 			component: 'NoiNgoaiTru/QuanLyDot',
	// 		},
	// 	],
	// },

	//Khai báo sức khỏe

	// {
	//   name: 'TracNghiem',
	//   path: 'tracnghiem',
	//   component: 'BieuMau/TracNghiem',
	// },
	// {
	//   name: 'KhaiBaoSucKhoe',
	//   path: 'khaibaosuckhoe',
	//   component: 'BieuMau/KhaiBaoSucKhoe',
	// },
	// {
	// 	name: 'CauHoiThuongGap',
	// 	path: 'cau-hoi-thuong-gap',
	// 	icon: 'QuestionCircleOutlined',
	// 	component: 'TienIch/CauHoiThuongGap',
	// },

	// {
	//   name: 'TienIch',
	//   icon: 'form',
	//   path: '/tien-ich',
	//   routes: [
	//     {
	//       name: 'KhaoSat',
	//       path: 'khao-sat',
	//       routes: [
	//         {
	//           name: 'BieuMauKhaoSat',
	//           path: 'bieu-mau-khao-sat',
	//           component: 'TienIch/KhaoSat',
	//         },
	//         {
	//           name: 'DotKhaoSat',
	//           path: 'dot-khao-sat',
	//           component: 'TienIch/KhaoSat/DotKhaoSat',
	//         },
	//       ],
	//     },
	//     // {
	//     //   name: 'TracNghiem',
	//     //   path: 'tracnghiem',
	//     //   component: 'BieuMau/TracNghiem',
	//     // },
	//     // {
	//     //   name: 'KhaiBaoSucKhoe',
	//     //   path: 'khaibaosuckhoe',
	//     //   component: 'BieuMau/KhaiBaoSucKhoe',
	//     // },
	//     {
	//       name: 'CauHoiThuongGap',
	//       path: 'cau-hoi-thuong-gap',
	//       component: 'TienIch/CauHoiThuongGap',
	//     },
	//
	//     {
	//       name: 'VanBanHuongDan',
	//       path: 'van-ban-huong-dan',
	//       component: 'TienIch/VanBanHuongDan',
	//     },
	//   ],
	// },

	// DANH MUC HE THONG
	{
		name: 'DanhMuc',
		path: '/danh-muc',
		icon: 'copy',
		access: 'danhMucAccess',
		routes: [
			// {
			// 	name: 'KhenThuong',
			// 	path: 'khen-thuong',
			// 	component: 'CheDoChinhSach/KhenThuong/CheDoKhenThuong',
			// 	// routes: [
			// 	// 	{
			// 	// 		name: 'LoaiKhenThuong',
			// 	// 		path: 'loai-khen-thuong',
			// 	// 		component: 'DanhMuc/LoaiKhenThuong',
			// 	// 	},
			// 	// 	{
			// 	// 		name: 'HinhThucKhenThuong',
			// 	// 		path: 'hinh-thuc-khen-thuong',
			// 	// 		component: 'DanhMuc/HinhThucKhenThuong',
			// 	// 	},
			// 	// 	{
			// 	// 		name: 'KhenThuong',
			// 	// 		path: 'khen-thuong',
			// 	// 		component: 'CheDoChinhSach/KhenThuong/CheDoKhenThuong',
			// 	// 	},
			// 	// ],
			// },
			// {
			// 	name: 'KyLuat',
			// 	path: 'ky-luat',
			// 	component: 'CheDoChinhSach/KyLuat/CheDoKyLuat',
			// 	// routes: [
			// 	// 	{
			// 	// 		name: 'CapKyLuat',
			// 	// 		path: 'cap-ky-luat',
			// 	// 		component: 'DanhMuc/CapKyLuat',
			// 	// 	},
			// 	// 	{
			// 	// 		name: 'HinhThucKyLuat',
			// 	// 		path: 'hinh-thuc-ky-luat',
			// 	// 		component: 'DanhMuc/HinhThucKyLuat',
			// 	// 	},
			// 	// 	{
			// 	// 		name: 'KyLuat',
			// 	// 		path: 'ky-luat',
			// 	// 		component: 'CheDoChinhSach/KyLuat/CheDoKyLuat',
			// 	// 	},
			// 	// ],
			// },
			// {
			// 	name: 'HocBong',
			// 	path: 'hoc-bong',
			// 	component: 'CheDoChinhSach/HocBong/CheDoHocBong',
			// },
			// {
			// 	name: 'BaoHiemXaHoi',
			// 	path: 'bao-hiem',
			// 	component: 'CheDoChinhSach/BaoHiem/CheDoBaoHiem',
			// },
			// {
			// 	name: 'CheDoChinhSach',
			// 	component: 'CheDoChinhSach/CheDoChinhSach/CheDoChinhSach',
			// 	path: 'che-do-chinh-sach',
			// },
			// {
			// 	name: 'GiaoDucChinhTriTuTuong',
			// 	component: 'CheDoChinhSach/GiaoDucChinhTriTuTuong/CheDoGDCTTT',
			// 	path: 'giao-duc-chinh-tri-tu-tuong',
			// },
			// {
			// 	name: 'Chung',
			// 	component: 'DanhMuc/Chung',
			// 	path: 'chung',
			// },
			{
				name: 'Attributes',
				component: 'DanhMuc/Attributes',
				path: 'attribute',
				// access: 'cctFilter',
			},
			// {
			// 	name: 'Track',
			// 	component: 'DanhMuc/Track',
			// 	path: 'track',
			// 	// access: 'cctFilter',
			// },
			{
				name: 'CCD',
				component: 'DanhMuc/CCD',
				path: 'co-curricular-domain',
				// access: 'cctFilter',
			},
			{
				name: 'Activities',
				component: 'DanhMuc/Activities',
				path: 'co-curricular-ctivities',
				// access: 'cctFilter',
			},
			{
				name: 'Competency',
				component: 'DanhMuc/Competency',
				path: 'competency',
				// access: 'cctFilter',
			},
			{
				name: 'Levels',
				component: 'DanhMuc/Levels',
				path: 'level',
				// access: 'cctFilter',
			},
			{
				name: 'Roles',
				component: 'DanhMuc/Roles',
				path: 'role',
				// access: 'cctFilter',
			},
			{
				name: 'StudentApprover',
				component: 'DanhMuc/StudentApprover',
				path: 'student-approver',
				// access: 'cctFilter',
			},
			{
				name: 'KyTucXa',
				path: 'ky-tuc-xa',
				routes: [
					{
						name: 'DanhMucChung',
						path: 'danh-muc-chung',
						component: 'KyTucXa/DanhMucChung',
					},
					{
						name: 'KhoanThu',
						path: 'khoan-thu',
						component: 'KyTucXa/CauHinhKhoanThu',
					},
					{
						name: 'Phong',
						path: 'phong',
						component: 'KyTucXa/Phong',
					},
					{
						name: 'DotDangKy',
						path: 'dot-dang-ky',
						component: 'KyTucXa/DotDangKy',
					},
					{
						name: 'NhanPhong',
						path: 'nhan-phong',
						component: 'KyTucXa/NhanPhong',
					},
					{
						name: 'DanhSachMienKyTucXa',
						path: 'danh-sach-mien-ky-tuc-xa',
						component: 'KyTucXa/DanhSachMienKyTucXa',
					},
				],
			},

			// {
			// 	name: 'Questions',
			// 	path: 'self-assessment-questions',
			// 	component: 'TienIch/KhaoSat',
			// 	// access: 'cctFilter',
			// },
		],
	},

	// THONG KE BAO CAO
	// {
	// 	name: 'ThongKe',
	// 	path: '/thong-ke',
	// 	icon: 'PieChartOutlined',
	// 	// access: 'accessFilter',
	// 	// maChucNang: 'qldt|thong-ke-bao-cao',
	// 	routes: [
	// 		{ name: 'SoLuongSinhVien', path: 'so-luong-sinh-vien', component: 'ThongKeBaoCao/SoLuongSinhVien' },
	// 		{ name: 'KetQuaHocKy', path: 'ket-qua-hoc-ky', component: 'ThongKeBaoCao/KetQuaHocKy' },
	// 	],
	// },

	// {
	// 	name: 'ThongBao',
	// 	icon: 'bell',
	// 	path: 'thong-bao',
	// 	component: 'ThongBao',
	// },

	{
		path: '/notification',
		routes: [
			{
				path: 'subscribe',
				exact: true,
				component: 'ThongBao/Subscribe',
			},
			{
				path: 'check',
				exact: true,
				component: 'ThongBao/Check',
			},
			{
				path: '',
				exact: true,
				component: 'ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: 'exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: 'exception/DangCapNhat',
		layout: false,
	},
	{
		path: '/*',
		component: 'exception/404',
		layout: false,
	},
];
