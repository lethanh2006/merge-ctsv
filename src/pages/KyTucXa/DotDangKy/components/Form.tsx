import MyDatePicker from '@/components/MyDatePicker';
import FormItemKhoaNganh from '@/pages/DaoTaoV2/KhoaNganhDotDangKy/FormItemKhoaNganh';
import SelectHocKy from '@/pages/HocKy/components/SelectHocKy';
import RoomTable from '@/pages/KyTucXa/DotDangKy/components/RoomTable';
import SelectToaNha from '@/pages/KyTucXa/DotDangKy/components/SelectToaNha';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import type { KyTucXa } from '@/services/KyTucXa/typing';

const FormDotDangKyKTX = () => {
	const [form] = Form.useForm();
	const { record, visibleForm, edit, setVisibleForm, putModel, postModel, formSubmiting } = useModel('kytucxa.dotdangky');
	const [selectedToaNhaIds, setSelectedToaNhaIds] = useState<string[]>([]);
	const [selectedPhongIds, setSelectedPhongIds] = useState<string[]>([]);

	const { danhSach: allPhong, getAllModel: getAllPhong } = useModel('theodoitaisanvattu.phong');

	const { getAllModel: getAllToaNha } = useModel('theodoitaisanvattu.toanha');

	const selectedPhongRowKeys = allPhong
		.filter((phong: any) => selectedPhongIds.includes(phong.ma))
		.map((phong: any) => phong._id);

	useEffect(() => {
		if (visibleForm) {
			getAllPhong();
			getAllToaNha();
		}
	}, [visibleForm]);

	useEffect(() => {
		if (!visibleForm) {
			resetFieldsForm(form);
			setSelectedToaNhaIds([]);
			setSelectedPhongIds([]);
			return;
		}

		if (record?._id) {
			const danhSachToaNha = record?.danhSachToaNha ?? [];
			const danhSachPhong = record?.danhSachPhong ?? [];

			form.setFieldsValue({
				...record,
				maKhoaNganh: record?.maKhoaNganh ?? [],
				danhSachToaNha,
			});
			setSelectedToaNhaIds(danhSachToaNha);
			setSelectedPhongIds(danhSachPhong);
		} else {
			form.setFieldsValue({
				maKhoaNganh: [],
				danhSachToaNha: [],
			});
			setSelectedToaNhaIds([]);
			setSelectedPhongIds([]);
		}
	}, [record?._id, visibleForm]);

	useEffect(() => {
		if (!visibleForm) return;
		if (!allPhong || allPhong.length === 0) return;

		setSelectedPhongIds((prev) => {
			const filtered = prev.filter((phongMa) => {
				const phong = allPhong.find((p: any) => p.ma === phongMa);
				if (!phong) return true;
				const maToaNha = phong.maToaNha ?? phong.toaNha?.ma;
				return maToaNha && selectedToaNhaIds.includes(maToaNha);
			});
			if (JSON.stringify(filtered) === JSON.stringify(prev)) return prev;
			return filtered;
		});
	}, [selectedToaNhaIds, allPhong, visibleForm]);

	const onFinish = async (values: KyTucXa.IDotDangKy) => {
		const { danhSachToaNha, ...restValues } = values as KyTucXa.IDotDangKy;
		const payload: Partial<KyTucXa.IDotDangKy> = {
			...restValues,
			maKhoaNganh: values?.maKhoaNganh ?? [],
			danhSachToaNha: selectedToaNhaIds,
			danhSachPhong: selectedPhongIds,
		};

		if (edit) {
			await putModel(record?._id ?? '', payload).catch((er) => console.log(er));
		} else {
			await postModel(payload).catch((er) => console.log(er));
		}
	};

	return (
		<Card title={`${edit ? 'Chỉnh sửa' : 'Thêm mới'} đợt đăng ký ký túc xá`}>
			<Form layout='vertical' onFinish={onFinish} form={form}>
				<Row gutter={[12, 0]}>
					<Col span={24} md={12}>
						<Form.Item name='tenDot' label='Tên đợt' rules={[...rules.required, ...rules.text, ...rules.length(250)]}>
							<Input placeholder='Nhập tên đợt' />
						</Form.Item>
					</Col>
					<Col span={24} md={12}>
						<Form.Item name='maHocKy' label='Học kỳ' rules={[...rules.required]}>
							<SelectHocKy selectMa />
						</Form.Item>
					</Col>
					<Col span={24} md={12}>
						<Form.Item name='thoiGianBatDau' label='Thời gian bắt đầu' rules={[...rules.required]}>
							<MyDatePicker showTime={{ showHour: true, showMinute: true }} format='HH:mm DD/MM/YYYY' />
						</Form.Item>
					</Col>
					<Col span={24} md={12}>
						<Form.Item name='thoiGianKetThuc' label='Thời gian kết thúc' rules={[...rules.required]}>
							<MyDatePicker showTime={{ showHour: true, showMinute: true }} format='HH:mm DD/MM/YYYY' />
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item name='maKhoaNganh' label='Khóa ngành áp dụng' rules={[...rules.required]}>
							<FormItemKhoaNganh showTrinhDo={false} showHinhThuc={false} />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='danhSachToaNha' label='Tòa nhà'>
							<SelectToaNha
								multiple
								selectMa
								allowClear
								onChange={(ids) => setSelectedToaNhaIds(Array.isArray(ids) ? ids : ids ? [ids] : [])}
							/>
						</Form.Item>
					</Col>
				</Row>

				{selectedToaNhaIds.length ? (
					<div style={{ marginTop: 12 }}>
						<RoomTable
							toaNhaIds={selectedToaNhaIds}
							selectedRowKeys={selectedPhongRowKeys}
							onChangeSelectedKeys={(keys) => {
								setSelectedPhongIds(
									keys
										.map((key) => allPhong.find((phong: any) => phong._id === key)?.ma)
										.filter((ma): ma is string => !!ma),
								);
							}}
						/>
					</div>
				) : null}
				<Col xs={24}>
					<Form.Item name='ghiChu' label='Ghi chú' rules={[...rules.text, ...rules.length(2000)]}>
						<Input.TextArea rows={3} placeholder='Nhập ghi chú' />
					</Form.Item>
				</Col>

				<div className='form-footer'>
					<Button loading={formSubmiting} htmlType='submit' type='primary'>
						{!edit ? 'Thêm mới' : 'Lưu lại'}
					</Button>
					<Button onClick={() => setVisibleForm(false)}>Hủy</Button>
				</div>
			</Form>
		</Card>
	);
};

export default FormDotDangKyKTX;
