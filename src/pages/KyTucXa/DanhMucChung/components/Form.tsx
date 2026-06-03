import UploadFile from '@/components/Upload/UploadFile';
import SelectLoaiDanhMucChung from '@/pages/KyTucXa/DanhMucChung/components/Select';
import { buildUpLoadFile } from '@/services/uploadFile';
import rules from '@/utils/rules';
import { removeVietnameseTones, resetFieldsForm } from '@/utils/utils';
import { Button, Card, Checkbox, Col, Form, Input, Row, Spin } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';
import { useModel, useIntl } from 'umi';

const FormThemMoi = () => {
	const intl = useIntl();
	const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm, isView, loading } =
		useModel('kytucxa.danhmucchung');
	const [form] = Form.useForm();
	const maLoai = Form.useWatch('maLoai', form);

	const onFinish = async (values: any) => {
		try {
			const anh = await buildUpLoadFile(values, 'anh');
			values.anh = anh;

			if (values.maLoai !== 'TIEN_ICH_PHONG') {
				delete values.cauHinh;
			} else if (!values?.cauHinh?.tienIchChung) {
				values.cauHinh = null;
			} else {
				values.cauHinh = { ...(values.cauHinh || {}), tienIchChung: true };
			}

			if (edit) await putModel(record?._id ?? '', values);
			else await postModel(values);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (!visibleForm) resetFieldsForm(form);
		else if (record?._id) form.setFieldsValue({ ...record });
	}, [record?._id, visibleForm]);

	return (
		<Card title={edit ? intl.formatMessage({ id: 'kytucxa.danhmucchung.editTitle' }) : intl.formatMessage({ id: 'kytucxa.danhmucchung.addTitle' })}>
			<Spin spinning={loading}>
				<Form form={form} onFinish={onFinish} layout='vertical'>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name='ma' label={intl.formatMessage({ id: 'kytucxa.danhmucchung.ma' })} rules={[...rules.required]}>
								<Input
									placeholder={intl.formatMessage({ id: 'kytucxa.danhmucchung.nhapma' })}
									autoFocus
									disabled={isView}
									onChange={(e) =>
										form.setFieldsValue({ ma: _.camelCase(removeVietnameseTones(e?.target?.value ?? '')) })
									}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='maLoai' label={intl.formatMessage({ id: 'kytucxa.danhmucchung.maloai' })} rules={[...rules.required]}>
								<SelectLoaiDanhMucChung disabled={edit || isView} selectMa />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='ten' label={intl.formatMessage({ id: 'kytucxa.danhmucchung.ten' })}>
								<Input placeholder={intl.formatMessage({ id: 'kytucxa.danhmucchung.nhapten' })} disabled={isView} />
							</Form.Item>
						</Col>
						{maLoai === 'TIEN_ICH_PHONG' && (
							<Col span={12}>
								<Form.Item label=' ' colon={false}>
									<Form.Item name={['cauHinh', 'tienIchChung']} valuePropName='checked' noStyle>
										<Checkbox disabled={isView}>{intl.formatMessage({ id: 'kytucxa.danhmucchung.tienichchung' })}</Checkbox>
									</Form.Item>
								</Form.Item>
							</Col>
						)}
						<Col span={24}>
							<Form.Item name='ghiChu' label={intl.formatMessage({ id: 'kytucxa.danhmucchung.ghichu' })} rules={[...rules.required]}>
								<Input.TextArea rows={3} placeholder={intl.formatMessage({ id: 'kytucxa.danhmucchung.nhapghichu' })} disabled={isView} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name='anh' label={intl.formatMessage({ id: 'kytucxa.danhmucchung.anhicon' })}>
								<UploadFile disabled={isView} maxCount={1} />
							</Form.Item>
						</Col>
					</Row>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						{!isView ? (
							<Button style={{ marginRight: 8 }} type='primary' htmlType='submit' loading={formSubmiting}>
								{!edit ? intl.formatMessage({ id: 'kytucxa.danhmucchung.add' }) : intl.formatMessage({ id: 'kytucxa.danhmucchung.save' })}
							</Button>
						) : null}
						<Button onClick={() => setVisibleForm(false)}>{isView ? intl.formatMessage({ id: 'kytucxa.danhmucchung.close' }) : intl.formatMessage({ id: 'kytucxa.danhmucchung.cancel' })}</Button>
					</div>
				</Form>
			</Spin>
		</Card>
	);
};

export default FormThemMoi;
