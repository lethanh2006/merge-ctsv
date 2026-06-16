import StepChonDoiTuong from '@/pages/KyTucXa/DotDangKy/components/StepChonDoiTuong';
import StepThongTin from '@/pages/KyTucXa/DotDangKy/components/StepThongTin';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Form, Steps, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

const FormDotDangKyKTX = () => {
	const [form] = Form.useForm();
	const { record, visibleForm, edit, setVisibleForm, putModel, postModel, formSubmiting } =
		useModel('kytucxa.dotdangky');
	const { postSinhVienDangKy } = useModel('kytucxa.dotdangkyktx');
	const loaiDot = Form.useWatch('loaiDot', form) ?? 'Theo khoa';
	const [currentStep, setCurrentStep] = useState(0);
	const [selectedToaNhaIds, setSelectedToaNhaIds] = useState<string[]>([]);
	const [selectedPhongIds, setSelectedPhongIds] = useState<string[]>([]);
	const [selectedKhoaNganh, setSelectedKhoaNganh] = useState<string[]>([]);
	const [selectedKhoaRows, setSelectedKhoaRows] = useState<
		Array<{
			ma: string;
			maKhoaSinhVien?: string;
			khoaSinhVien?: {
				ten?: string;
			};
		}>
	>([]);
	const [khoaToaConfig, setKhoaToaConfig] = useState<Record<string, string[]>>({});

	const { danhSach: allPhong } = useModel('theodoitaisanvattu.phong');

	const { getAllModel: getAllToaNha } = useModel('theodoitaisanvattu.toanha');
	const { danhSach: allKhoaSinhVien, getAllModel: getAllKhoaSinhVien } = useModel('daotaov2.namhoc.khoasinhvien');

	useEffect(() => {
		if (visibleForm) {
			getAllToaNha();
			getAllKhoaSinhVien(undefined, { namHocBatDau: -1 });
			setCurrentStep(0);
		}
	}, [visibleForm]);

	useEffect(() => {
		setCurrentStep(0);
	}, [record?._id]);

	useEffect(() => {
		const nextRows = selectedKhoaNganh.map((ma) => {
			const khoaSv = allKhoaSinhVien.find((item) => item.ma === ma);
			return {
				ma,
				maKhoaSinhVien: ma,
				khoaSinhVien: khoaSv,
			};
		});
		setSelectedKhoaRows(nextRows);
	}, [selectedKhoaNganh, allKhoaSinhVien]);

	useEffect(() => {
		if (!visibleForm) {
			resetFieldsForm(form);
			setSelectedToaNhaIds([]);
			setSelectedPhongIds([]);
			setSelectedKhoaNganh([]);
			setSelectedKhoaRows([]);
			setKhoaToaConfig({});
			return;
		}

		if (record?._id) {
			const initialLoaiDot = record?.loaiDot ?? (record?.cauHinhKhoaToa?.length ? 'Theo khoa' : 'Theo danh sách');
			const danhSachToaNha = record?.danhSachToaNha ?? [];
			const danhSachPhong = record?.danhSachPhong ?? [];
			const cauHinh = record?.cauHinhKhoaToa ?? [];
			const khoaNganh = cauHinh.length ? cauHinh.map((item: any) => item.maKhoaSinhVien) : (record?.maKhoaNganh ?? []);
			const nextKhoaToaConfig = cauHinh.reduce<Record<string, string[]>>((accumulator: any, item: any) => {
				accumulator[item.maKhoaSinhVien] = item.danhSachToaNha ?? [];
				return accumulator;
			}, {});

			form.setFieldsValue({
				...record,
				loaiDot: initialLoaiDot,
				maKhoaNganh: khoaNganh,
				danhSachToaNha,
				hanDuyetMien: record?.hanDuyetMien ?? null,
			});
			setSelectedKhoaNganh(khoaNganh);
			setSelectedKhoaRows(cauHinh as any);
			setKhoaToaConfig(nextKhoaToaConfig);
			setSelectedToaNhaIds(danhSachToaNha);
			setSelectedPhongIds(danhSachPhong);
		} else {
			form.setFieldsValue({
				loaiDot: 'Theo khoa',
				maKhoaNganh: [],
				danhSachToaNha: [],
				hanDuyetMien: null,
			});
			setSelectedToaNhaIds([]);
			setSelectedPhongIds([]);
			setSelectedKhoaNganh([]);
			setSelectedKhoaRows([]);
			setKhoaToaConfig({});
		}
	}, [record?._id, visibleForm]);

	useEffect(() => {
		if (!visibleForm) return;
		if (edit) return;
		if (!allPhong || allPhong.length === 0) return;

		const nextPhongIds = allPhong
			.filter((phong: any) => {
				const maToaNha = phong.maToaNha ?? phong.toaNha?.ma;
				return maToaNha && selectedToaNhaIds.includes(maToaNha);
			})
			.map((phong: any) => phong.ma);
		setSelectedPhongIds(nextPhongIds);
	}, [selectedToaNhaIds, allPhong, visibleForm, edit]);

	const handleNextStep = async () => {
		try {
			const fieldsToValidate = [
				'tenDot',
				'maHocKy',
				'ngayChuyenVao',
				'ngayChuyenRa',
				'thoiGianBatDau',
				'thoiGianKetThuc',
				'loaiDot',
				'hanDuyetMien',
				'ghiChu',
			];
			const values = await form.validateFields(fieldsToValidate);

			if (dayjs(values.ngayChuyenRa).isBefore(dayjs(values.ngayChuyenVao))) {
				message.error('Ngày chuyển ra phải sau ngày chuyển vào');
				return;
			}

			if (values.hanDuyetMien && dayjs(values.hanDuyetMien).isAfter(dayjs(values.ngayChuyenRa))) {
				message.error('Hạn duyệt miễn phải trước ngày chuyển ra');
				return;
			}

			setCurrentStep(1);
		} catch (error) {
			console.log('Validation failed:', error);
		}
	};

	const onFinish = async (values: KyTucXa.IDotDangKyKTX) => {
		if (dayjs(values.ngayChuyenRa).isBefore(dayjs(values.ngayChuyenVao))) {
			message.error('Ngày chuyển ra phải sau ngày chuyển vào');
			return;
		}

		if (values.hanDuyetMien && dayjs(values.hanDuyetMien).isAfter(dayjs(values.ngayChuyenRa))) {
			message.error('Hạn duyệt miễn phải trước ngày chuyển ra');
			return;
		}

		if (loaiDot === 'Theo khoa') {
			if (!selectedKhoaNganh.length) {
				message.error('Vui lòng chọn ít nhất 1 khóa sinh viên');
				return;
			}
			if (selectedKhoaRows.some((row) => !(khoaToaConfig[row.maKhoaSinhVien ?? row.ma]?.length ?? 0))) {
				message.error('Mỗi khóa sinh viên phải có ít nhất 1 tòa nhà');
				return;
			}
		}

		if (loaiDot === 'Theo danh sách') {
			if (!selectedToaNhaIds.length) {
				message.error('Vui lòng chọn ít nhất 1 tòa nhà');
				return;
			}
			if (!selectedPhongIds.length) {
				message.error('Vui lòng chọn ít nhất 1 phòng');
				return;
			}
		}

		const { danhSachToaNha, danhSach, ...restValues } = values as any;
		const payload: Partial<KyTucXa.IDotDangKyKTX> = {
			...restValues,
			loaiDot,
			ngayChuyenVao: values?.ngayChuyenVao ? dayjs(values.ngayChuyenVao).toISOString() : undefined,
			ngayChuyenRa: values?.ngayChuyenRa ? dayjs(values.ngayChuyenRa).toISOString() : undefined,
			maKhoaNganh: values?.maKhoaNganh ?? [],
			cauHinhKhoaToa:
				loaiDot === 'Theo khoa'
					? selectedKhoaRows.map((row) => ({
						maKhoaSinhVien: row.maKhoaSinhVien ?? row.ma,
						danhSachToaNha: khoaToaConfig[row.maKhoaSinhVien ?? row.ma] ?? [],
					}))
					: [],
			hanDuyetMien: values?.hanDuyetMien ? dayjs(values.hanDuyetMien).toISOString() : null,
			danhSachToaNha: loaiDot === 'Theo danh sách' ? selectedToaNhaIds : [],
			danhSachPhong: loaiDot === 'Theo danh sách' ? selectedPhongIds : [],
		};

		if (edit) {
			const dotId = record?._id ?? '';
			await putModel(dotId, payload).catch((er) => console.log(er));
			if (danhSach?.length) {
				await postSinhVienDangKy?.(dotId, danhSach).catch((er) => console.log(er));
			}
		} else {
			const res = await postModel(payload).catch((er) => console.log(er));
			const newDotId = res?._id;
			if (newDotId && danhSach?.length) {
				await postSinhVienDangKy?.(newDotId, danhSach).catch((er) => console.log(er));
			}
		}
	};

	return (
		<Card title={`${edit ? 'Chỉnh sửa' : 'Thêm mới'} đợt đăng ký ký túc xá`}>
			<Form layout='vertical' onFinish={onFinish} form={form}>
				<Steps
					current={currentStep}
					style={{ marginBottom: 18, paddingTop: 0 }}
					onChange={(step) => {
						if (record?._id || step < currentStep) {
							setCurrentStep(step);
						}
					}}
					type='navigation'
				>
					<Steps.Step title='Thông tin đợt' />
					<Steps.Step title='Chọn đối tượng' disabled={!record?._id && currentStep === 0} />
				</Steps>

				<div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
					<StepThongTin />
				</div>

				<div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
					<StepChonDoiTuong
						form={form}
						loaiDot={loaiDot}
						selectedKhoaNganh={selectedKhoaNganh}
						setSelectedKhoaNganh={setSelectedKhoaNganh}
						selectedKhoaRows={selectedKhoaRows}
						khoaToaConfig={khoaToaConfig}
						setKhoaToaConfig={setKhoaToaConfig}
						selectedToaNhaIds={selectedToaNhaIds}
						setSelectedToaNhaIds={setSelectedToaNhaIds}
						selectedPhongIds={selectedPhongIds}
						setSelectedPhongIds={setSelectedPhongIds}
					/>
				</div>

				<div className='form-footer'>
					{currentStep === 0 ? (
						<>
							<Button onClick={handleNextStep} type='primary'>
								Tiếp theo
							</Button>
							<Button onClick={() => setVisibleForm(false)}>Hủy</Button>
						</>
					) : (
						<>
							<Button loading={formSubmiting} htmlType='submit' type='primary'>
								{!edit ? 'Thêm mới' : 'Lưu lại'}
							</Button>
							<Button onClick={() => setCurrentStep(0)}>
								Quay lại
							</Button>
						</>
					)}
				</div>
			</Form>
		</Card>
	);
};

export default FormDotDangKyKTX;
