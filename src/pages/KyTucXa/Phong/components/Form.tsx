import type { KyTucXa } from '@/services/KyTucXa/typing';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import UploadFile from '@/pages/KyTucXa/Phong/components/UploadFile';
import { useEffect } from 'react';
import { useIntl, useModel } from 'umi';
import { buildUpLoadMultiFile } from '@/services/uploadFile';
import SelectKhoanThu from './SelectKhoanThu';
import { EGioiTinh, ELoaiSinhVien } from '@/services/KyTucXa/constant';
import SelectRoomType from './SelectRoomType';

const FormPhongKTX = () => {
	const intl = useIntl();
	const [form] = Form.useForm();
	const { danhSach: danhSachToaNha, getAllModel: getAllToaNha } = useModel('kytucxa.toa');
	const { danhSach: danhSachTienIchModel, getAllModel: getAllTienIch } = useModel('kytucxa.danhmucchung');
	const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } =
		useModel('kytucxa.phong');

	useEffect(() => {
		getAllToaNha();
		getAllTienIch();
		if (!visibleForm) return;
		if (record?._id) {
			const maDanhMucTienIch = record.danhSachTienIch?.map((item: KyTucXa.ITienIch) => item.maDanhMucTienIch) || [];
			form.setFieldsValue({
				...record,
				dangKyKyTucXaRule: {
					...(record?.dangKyKyTucXaRule || {}),
					quocTichPhong: record?.dangKyKyTucXaRule?.quocTichPhong,
				},
				tienIchIds: maDanhMucTienIch,
			});
		} else {
			resetFieldsForm(form);
		}
	}, [record?._id, visibleForm]);

	const danhSachTienIchPhong = danhSachTienIchModel?.filter((item: KyTucXa.IDanhMucChung) => item.maLoai === 'TIEN_ICH_PHONG') || [];

	useEffect(() => {
		if (!visibleForm) return;

		const defaultTienIch = danhSachTienIchPhong
			?.filter(({ cauHinh }: any) => {
				try {
					const ch = typeof cauHinh === 'string' ? JSON.parse(cauHinh) : cauHinh;
					return String(ch?.tienIchChung) === 'true';
				} catch { return false; }
			})
			.map((item: KyTucXa.IDanhMucChung) => item.ma) || [];

		const savedTienIch = record?.danhSachTienIch?.map((item: KyTucXa.ITienIch) => item.maDanhMucTienIch)?.filter(Boolean) || [];

		const finalTienIchIds = savedTienIch.length > 0 ? savedTienIch : defaultTienIch;

		form.setFieldsValue({
			tienIchIds: finalTienIchIds
		});
	}, [visibleForm, danhSachTienIchModel, record]);

	const isView = false;

	const onFinish = async (values: KyTucXa.IPhong) => {
		try {
			const danhSachAnh = await buildUpLoadMultiFile(values, 'danhSachAnh');
			const { dangKyKyTucXaRule, danhSachTienIch, tienIchIds, ...restValues } = values as any;
			const nationality = dangKyKyTucXaRule?.quocTichPhong;
			
			const rulePayload = { ...(dangKyKyTucXaRule || {}) };
			delete rulePayload.quocTichPhong;

			const maDanhMucList = tienIchIds || [];
			const formattedTienIch = Array.isArray(maDanhMucList)
				? maDanhMucList.map((id: string) => ({
					maDanhMucTienIch: id,
				}))
				: [];

			const finalValues = { 
				...restValues, 
				quocTichPhong: nationality || null,
				...rulePayload,
				danhSachTienIch: formattedTienIch,
				danhSachAnh: danhSachAnh ?? [] 
			};

			if (edit) {
				await putModel(record?.ma ?? record?._id ?? '', finalValues);
			} else {
				await postModel(finalValues);
			}
		} catch (er) {
			console.log(er);
		}
	};

	return (
		<Card title={`${edit ? intl.formatMessage({ id: 'kytucxa.phong.chinhSua' }) : intl.formatMessage({ id: 'kytucxa.phong.themMoi' })} ${intl.formatMessage({ id: 'kytucxa.phong.cauHinhPhongText' })}`} className='form-card'>
			<Form onFinish={onFinish} form={form} layout='vertical'>
				<Row gutter={[12, 0]} style={{ marginBottom: 12 }}>
					{edit && (
						<Col xs={24}>
							<div style={{ marginBottom: 12, padding: '8px 12px', background: '#f5f5f5', borderRadius: 6 }}>
								<span style={{ fontWeight: 500 }}>{intl.formatMessage({ id: 'kytucxa.phong.tenPhong' })}: </span>{record?.ten}
								{record?.maToaNha && <span style={{ marginLeft: 16 }}><span style={{ fontWeight: 500 }}>{intl.formatMessage({ id: 'kytucxa.phong.toaNha' })}: </span>{danhSachToaNha?.find((item: KyTucXa.IToa) => item?.ma === record?.maToaNha)?.ten || '-'}</span>}
							</div>
						</Col>
					)}
					<Col xs={24}>
						<Form.Item 
							name='danhSachAnh' 
							label={intl.formatMessage({ id: 'kytucxa.phong.anhPhong' })}
							extra={
								<div style={{ marginTop: 8, color: '#fa8c16', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
									<InfoCircleOutlined style={{ fontSize: '14px', color: '#fa8c16' }} />
									<span>{intl.formatMessage({ id: 'kytucxa.phong.anhDauTienThongBao' })} <b>{intl.formatMessage({ id: 'kytucxa.phong.anhDaiDien' })}</b> {intl.formatMessage({ id: 'kytucxa.phong.hienThiTongQuan' })} {intl.formatMessage({ id: 'kytucxa.phong.keoThaAnh' })}</span>
								</div>
							}
						>
							<UploadFile maxCount={5} accept='image/*' disabled={isView} otherProps={{ listType: 'picture-card' }} sortable />
						</Form.Item>
					</Col>
					<Col xs={24}>
						<div className='fw500' style={{ marginBottom: 8, marginTop: 12 }}>
							{intl.formatMessage({ id: 'kytucxa.phong.quyDinhDangKy' })}
						</div>
					</Col>
					<Col xs={24} md={8}>
						<Form.Item name={['dangKyKyTucXaRule', 'quocTichPhong']} label={intl.formatMessage({ id: 'kytucxa.phong.danhChoSinhVien' })}>
							<Select
								disabled={isView}
								placeholder={intl.formatMessage({ id: 'kytucxa.phong.chonQuocTich' })}
								options={[
									{ value: ELoaiSinhVien.QUOC_TE, label: intl.formatMessage({ id: 'kytucxa.phong.international' }) },
									{ value: ELoaiSinhVien.VIET_NAM, label: intl.formatMessage({ id: 'kytucxa.phong.vietnamese' }) },
								]}
								allowClear
							/>
						</Form.Item>
					</Col>
					<Col xs={24} md={8}>
						<Form.Item name={['dangKyKyTucXaRule', 'gioiTinh']} label={intl.formatMessage({ id: 'kytucxa.phong.gioiTinhChoPhep' })} rules={[...rules.required]}>
							<Select
								disabled={isView}
								placeholder={intl.formatMessage({ id: 'kytucxa.phong.chonGioiTinh' })}
								options={[
									{ value: EGioiTinh.NAM, label: intl.formatMessage({ id: 'kytucxa.phong.nam' }) },
									{ value: EGioiTinh.NU, label: intl.formatMessage({ id: 'kytucxa.phong.nu' }) },
								]}
								allowClear
							/>
						</Form.Item>
					</Col>
					<Col xs={24} md={8}>
						<Form.Item name='soLuongToiDa' label={intl.formatMessage({ id: 'kytucxa.phong.soLuongToiDa' })} rules={[...rules.required]}>
							<InputNumber disabled={isView} min={1} style={{ width: '100%' }} placeholder={intl.formatMessage({ id: 'kytucxa.phong.nhapSoLuongToiDa' })} />
						</Form.Item>
					</Col>

					<Col xs={24}>
						<div className='fw500' style={{ marginBottom: 8, marginTop: 12 }}>
							{intl.formatMessage({ id: 'kytucxa.phong.thongTinPhong' })}
						</div>
					</Col>
					<Col xs={24}>
						<Form.Item name='maLoaiPhongKtx' label={intl.formatMessage({ id: 'kytucxa.phong.loaiPhong' })}>
							<SelectRoomType />
						</Form.Item>
					</Col>
					<Col xs={8}>
						<Form.Item name='soPhongTam' label={intl.formatMessage({ id: 'kytucxa.phong.soPhongTam' })}>
							<InputNumber disabled={isView} min={1} style={{ width: '100%' }} placeholder={intl.formatMessage({ id: 'kytucxa.phong.nhapSoPhongTam' })} />
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item name='tienIchIds' label={intl.formatMessage({ id: 'kytucxa.phong.danhSachTienIch' })}>
							<Checkbox.Group disabled={isView} style={{ width: '100%' }}>
								<Row gutter={[12, 12]}>
									{danhSachTienIchPhong.map((item: KyTucXa.IDanhMucChung) => (
										<Col span={8} key={item.ma}>
											<Checkbox value={item.ma}>
												<span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
													{item.anh ? (
														<img 
															src={item.anh} 
															alt='icon' 
															style={{ width: 18, height: 18, objectFit: 'contain', borderRadius: 2 }} 
														/>
														) : (
															<QuestionCircleOutlined style={{ width: 18, height: 18, objectFit: 'contain', borderRadius: 2 }}/>
													)}
													{item.ten}
												</span>
											</Checkbox>
										</Col>
									))}
								</Row>
							</Checkbox.Group>
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='maKhoanThuPhong' label={intl.formatMessage({ id: 'kytucxa.phong.bangGiaPhiPhong' })}>
							<SelectKhoanThu/>
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='maKhoanThuCoc' label={intl.formatMessage({ id: 'kytucxa.phong.bangGiaPhiCoc' })}>
							<SelectKhoanThu/>
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item name='moTa' label={intl.formatMessage({ id: 'kytucxa.phong.moTaPhong' })}>
							<Input.TextArea rows={2} disabled={isView} placeholder={intl.formatMessage({ id: 'kytucxa.phong.nhapMoTaPhong' })} />
						</Form.Item>
					</Col>
				</Row>
				<div className='form-footer'>
					<Button loading={formSubmiting} htmlType='submit' type='primary'>
						{!edit
							? `${intl.formatMessage({ id: 'global.button.themmoi' })}`
							: `${intl.formatMessage({ id: 'global.button.luulai' })}`}
					</Button>
					<Button onClick={() => setVisibleForm(false)}>{intl.formatMessage({ id: 'global.button.huy' })}</Button>
				</div>
			</Form>
		</Card>
	);
};

export default FormPhongKTX;
