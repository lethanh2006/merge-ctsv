import UploadFile from '@/components/Upload/UploadFile';
import SelectLoaiDanhMucChung from '@/pages/KyTucXa/DanhMucChung/components/Select';
import { KyTucXa } from '@/services/KyTucXa/typing';
import { buildUpLoadFile } from '@/services/uploadFile';
import rules from '@/utils/rules';
import { removeVietnameseTones, resetFieldsForm } from '@/utils/utils';
import { Button, Card, Col, Form, Input, Row, Spin } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';
import { useModel } from 'umi';

const FormThemMoi = () => {
	const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm, isView, loading } =
		useModel('kytucxa.danhmucchung');
	const [form] = Form.useForm();

	const onFinish = async (values: KyTucXa.ILoaiDanhMucChung) => {
		try {
			const anh = await buildUpLoadFile(values, 'anh');
			values.anh = anh;

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
		<Card title={isView ? 'Chi tiết Danh mục ' : edit ? 'Chỉnh sửa Danh mục' : 'Thêm mới Danh mục'}>
			<Spin spinning={loading}>
				<Form form={form} onFinish={onFinish} layout='vertical'>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name='ma' label='Mã' rules={[...rules.required]}>
								<Input
									placeholder='Nhập mã'
									autoFocus
									disabled={isView}
									onChange={(e) =>
										form.setFieldsValue({ ma: _.camelCase(removeVietnameseTones(e?.target?.value ?? '')) })
									}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='maLoai' label='Mã loại' rules={[...rules.required]}>
								<SelectLoaiDanhMucChung disabled={edit || isView} selectMa />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='ten' label='Tên'>
								<Input placeholder='Nhập tên' disabled={isView} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name='ghiChu' label='Ghi chú' rules={[...rules.required]}>
								<Input.TextArea rows={3} placeholder='Nhập ghi chú' disabled={isView} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name='anh' label='Ảnh Icon'>
								<UploadFile disabled={isView} maxCount={1} />
							</Form.Item>
						</Col>
					</Row>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						{!isView ? (
							<Button style={{ marginRight: 8 }} type='primary' htmlType='submit' loading={formSubmiting}>
								{!edit ? 'Thêm mới' : 'Lưu lại'}
							</Button>
						) : null}
						<Button onClick={() => setVisibleForm(false)}>{isView ? 'Đóng' : 'Huỷ'}</Button>
					</div>
				</Form>
			</Spin>
		</Card>
	);
};

export default FormThemMoi;
