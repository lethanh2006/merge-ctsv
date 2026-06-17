import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Col, Form, Input, Row, Card } from 'antd';
import React, { useEffect } from 'react';
import { useModel } from 'umi';
import UploadFile from '@/components/Upload/UploadFile';
import { buildUpLoadFile } from '@/services/uploadFile';
import SelectKhoaSinhVien from '@/pages/DaoTaoV2/NamHoc/KhoaSinhVien/components/Select';

interface FormSinhVienProps {
    danhSachId?: string;
}

const FormSinhVien: React.FC<FormSinhVienProps> = ({ danhSachId }) => {
    const [form] = Form.useForm();
    const { record, visibleForm, edit, setVisibleForm, putModel, postModel, formSubmiting } =
        useModel('kytucxa.danhsachmiensinhvien');

    useEffect(() => {
        if (!visibleForm) resetFieldsForm(form);
        else if (record?._id)
            form.setFieldsValue({
                ...record,
            });
    }, [record?._id, visibleForm]);

    const onFinish = async (values: any) => {
        try {
            const fileUrl = await buildUpLoadFile(values, 'urlMinhChung');
            const payload = {
                ...values,
                urlMinhChung: fileUrl || values.urlMinhChung,
                danhSachId: record?.danhSachId || danhSachId,
            };
            if (edit) {
                await putModel(record?._id ?? '', payload);
            } else {
                await postModel(payload);
                form.resetFields();
            }
            setVisibleForm(false);
        } catch (er) {
            console.log(er);
        }
    };

    return (
        <Card title={`${edit ? 'Chỉnh sửa' : 'Thêm mới'} sinh viên`}>
            <Form layout='vertical' onFinish={onFinish} form={form}>
                <Row gutter={[12, 0]}>
                    <Col span={24} md={12}>
                        <Form.Item name='code' label='Mã sinh viên' rules={[...rules.required]}>
                            <Input placeholder='Nhập mã sinh viên' style={{ borderRadius: 6 }} />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item name='fullname' label='Họ tên' rules={[...rules.required]}>
                            <Input placeholder='Nhập họ tên' style={{ borderRadius: 6 }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item name='khoaSinhVien' label='Khoá sinh viên' rules={[...rules.required]}>
                            <SelectKhoaSinhVien selectMa placeholder='Chọn khoá sinh viên' style={{ borderRadius: 6 }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item name='urlMinhChung' label='Upload minh chứng' rules={edit ? [] : [{ required: true, message: 'Vui lòng tải lên file minh chứng!' }]}>
                            <UploadFile maxCount={1} accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" />
                        </Form.Item>
                    </Col>
                </Row>

                <div className='form-footer'>
                    <Button onClick={() => setVisibleForm(false)} style={{ borderRadius: 6 }}>
                        Hủy
                    </Button>
                    <Button loading={formSubmiting} htmlType='submit' type='primary' style={{ backgroundColor: '#125195', borderColor: '#125195', borderRadius: 6 }}>
                        {!edit ? 'Thêm mới' : 'Lưu lại'}
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default FormSinhVien;

