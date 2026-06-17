import MyDatePicker from '@/components/MyDatePicker';
import SelectHocKy from '@/pages/HocKy/components/SelectHocKy';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Col, Form, Input, Row, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useModel } from 'umi';
import { UploadMinhChungModal } from './UploadMinhChungModal';

const FormSinhVien = () => {
    const [form] = Form.useForm();
    const { record, visibleForm, edit, setVisibleForm, putModel, postModel, formSubmiting } =
        useModel('kytucxa.danhsachmienkytucxa');


    useEffect(() => {
        if (!visibleForm) resetFieldsForm(form);
        else if (record?._id)
            form.setFieldsValue({
                ...record,
            });
    }, [record?._id, visibleForm]);

    const onFinish = async (values: any) => {
        try {
            const payload = { ...values };
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
        <div style={{ paddingTop: '12px' }}>
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
                        <Form.Item name='khoaSinhVien' label='Khoá sinh viên' rules={[...rules.text, ...rules.length(2000)]}>
                            <Input.TextArea rows={3} placeholder='Nhập khoá sinh viên' style={{ borderRadius: 6 }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item name='urlMinhChung' label='upload minh chứng ' >
                            <UploadMinhChungModal />
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                    <Button onClick={() => setVisibleForm(false)} style={{ borderRadius: 6 }}>
                        Hủy
                    </Button>
                    <Button loading={formSubmiting} htmlType='submit' type='primary' style={{ backgroundColor: '#125195', borderColor: '#125195', borderRadius: 6 }}>
                        {!edit ? 'Thêm mới' : 'Lưu lại'}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default FormSinhVien;
