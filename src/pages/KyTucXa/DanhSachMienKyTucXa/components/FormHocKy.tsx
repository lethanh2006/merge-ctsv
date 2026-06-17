import MyDatePicker from '@/components/MyDatePicker';
import SelectHocKy from '@/pages/HocKy/components/SelectHocKy';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Col, Form, Input, Row, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useModel } from 'umi';

const FormHocKy = () => {
    const [form] = Form.useForm();
    const { record, visibleForm, edit, setVisibleForm, putModel, postModel, formSubmiting } =
        useModel('kytucxa.danhsachmienkytucxa');
    const { danhSach: danhSachHocKy } = useModel('daotaov2.hocky.hocky');

    useEffect(() => {
        if (!visibleForm) resetFieldsForm(form);
        else if (record?._id)
            form.setFieldsValue({
                ...record,
                hanNopMinhChung: record?.hanNopMinhChung ? dayjs(record.hanNopMinhChung) : undefined,
            });
    }, [record?._id, visibleForm]);

    const onFinish = async (values: any) => {
        try {
            const payload = { ...values };
            if (values.hanNopMinhChung) {
                payload.hanNopMinhChung = dayjs(values.hanNopMinhChung).toISOString();
            }
            const selectedHocKy = danhSachHocKy.find((item) => item.ma === values.maHocKy);
            if (selectedHocKy) {
                payload.tenHocKy = selectedHocKy.ten;
            }

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
                        <Form.Item name='maHocKy' label='Học kỳ' rules={[...rules.required]}>
                            <SelectHocKy selectMa />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item name='hanNopMinhChung' label='Hạn nộp minh chứng' rules={[...rules.required]}>
                            <MyDatePicker showTime={{ showHour: true, showMinute: true }} format='HH:mm DD/MM/YYYY' style={{ width: '100%', borderRadius: 6 }} allowClear />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item name='ghiChu' label='Ghi chú' rules={[...rules.text, ...rules.length(2000)]}>
                            <Input.TextArea rows={3} placeholder='Nhập ghi chú' style={{ borderRadius: 6 }} />
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

export default FormHocKy;
