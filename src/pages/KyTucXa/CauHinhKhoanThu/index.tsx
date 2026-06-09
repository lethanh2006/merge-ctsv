import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { KyTucXa } from '@/services/KyTucXa/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { useIntl, useModel } from 'umi';
import Form from './components/Form';


const CauHinhKhoanThuKTXPage = () => {
    const intl = useIntl();
    const { getModel, page, limit, deleteModel, handleEdit } = useModel('kytucxa.khoanthu');

    const columns: IColumn<KyTucXa.IKhoanThu>[] = [
        {
            title: intl.formatMessage({ id: 'kytucxa.khoanthu.tenKhoanThu' }),
            dataIndex: 'ten',
            width: 180,
            filterType: 'string',
        },
        {
            title: intl.formatMessage({ id: 'kytucxa.khoanthu.donViTinh' }),
            width: 90,
            align: 'center',
            dataIndex: 'unitLabel',
            filterType: 'string',
        },
        {
            title: intl.formatMessage({ id: 'kytucxa.khoanthu.mucThu' }),
            dataIndex: 'tenMucThu',
            width: 180,
            filterType: 'string',
        },
        {
            title: intl.formatMessage({ id: 'kytucxa.khoanthu.soTien' }),
            dataIndex: 'unitAmount',
            width: 110,
            align: 'center',
            sortable: true,
            render: (val: number) => val?.toLocaleString('vi-VN'),
        },
        {
            title: intl.formatMessage({ id: 'kytucxa.khoanthu.donViTien' }),
            dataIndex: 'currency',
            width: 90,
            align: 'center',
        },
        {
            title: intl.formatMessage({ id: 'kytucxa.khoanthu.thaoTac' }),
            align: 'center',
            width: 90,
            fixed: 'right',
            render: (val, record) => (
                <>
                    <Tooltip title={intl.formatMessage({ id: 'kytucxa.khoanthu.chinhSua' })}>
                        <Button onClick={() => handleEdit(record)} type='link' icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip title={intl.formatMessage({ id: 'kytucxa.khoanthu.xoa' })}>
                        <Popconfirm
                            onConfirm={() => deleteModel(record._id, getModel)}
                            title={intl.formatMessage({ id: 'kytucxa.khoanthu.confirmDelete' })}
                            placement='topRight'
                        >
                            <Button danger type='link' icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Tooltip>
                </>
            ),
        },
    ];

    return (
        <TableBase
            columns={columns}
            dependencies={[page, limit]}
            modelName='kytucxa.khoanthu'
            title={intl.formatMessage({ id: 'kytucxa.khoanthu.title' })}
            Form={Form}
            rowSelection
            deleteMany
        />
    );
};

export default CauHinhKhoanThuKTXPage;
