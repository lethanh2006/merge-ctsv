import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { ETrangThaiCheckIn } from '@/services/KyTucXa/constant';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import axios from '@/utils/axios';
import dayjs from '@/utils/dayjs';
import { ipCsvc } from '@/utils/ip';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl, useModel } from 'umi';

const NhanPhongKTXPage = () => {
    const intl = useIntl();
    const { page, limit, selectedIds, setSelectedIds, getModel } = useModel('kytucxa.checkinsinhvien');
    const { danhSach: danhSachPhong, getModel: getPhong } = useModel('kytucxa.phong');
    const { danhSach: danhSachToa, getAllModel: getAllToa } = useModel('kytucxa.toa');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        getPhong();
        getAllToa();
    }, []);

    const renderTrangThai = (val: string) => {
        if (val === ETrangThaiCheckIn.DANG_O)
            return <Tag color='green'>{ETrangThaiCheckIn.DANG_O}</Tag>;
        if (val === ETrangThaiCheckIn.DA_RA)
            return <Tag color='default'>{ETrangThaiCheckIn.DA_RA}</Tag>;
        return <Tag color='blue'>{intl.formatMessage({ id: 'kytucxa.nhanphong.chuaNhanPhong' })}</Tag>;
    };

    const handleBulkCheckin = async () => {
        if (!selectedIds?.length) return;
        setSubmitting(true);
        try {
            await Promise.all(
                selectedIds.map((id) => axios.post(`${ipCsvc}/dang-ky-ky-tuc-xa/nhan-phong/${id}`))
            );
            message.success(intl.formatMessage({ id: 'kytucxa.nhanphong.checkinSuccess' }));
            setSelectedIds(undefined);
            getModel();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const checkinButton = selectedIds?.length ? (
        <Popconfirm
            key='bulk-checkin'
            title={intl.formatMessage({ id: 'kytucxa.nhanphong.confirmCheckinNhieu' }, { count: selectedIds.length })}
            onConfirm={handleBulkCheckin}
            okText={intl.formatMessage({ id: 'kytucxa.nhanphong.xacNhan' })}
            cancelText={intl.formatMessage({ id: 'kytucxa.nhanphong.huy' })}
        >
            <Button
                type='primary'
                icon={<CheckCircleOutlined />}
                loading={submitting}
            >
                {intl.formatMessage({ id: 'kytucxa.nhanphong.btnCheckinNhieu' }, { count: selectedIds.length })}
            </Button>
        </Popconfirm>
    ) : null;

    const columns: IColumn<KyTucXa.ICheckInSinhVien>[] = [
        {
            title: intl.formatMessage({ id: 'kytucxa.nhanphong.maSinhVien' }),
            dataIndex: 'maSinhVien',
            width: 120,
            filterType: 'string',
        },
        {
            title: intl.formatMessage({ id: 'kytucxa.nhanphong.hoTen' }),
            width: 150,
            align: 'center',
            dataIndex: 'hoTen',
            filterType: 'string',
        },
        {
            title: intl.formatMessage({ id: 'kytucxa.nhanphong.tenPhong' }),
            dataIndex: 'maPhong',
            width: 120,
            filterType: 'string',
            render: (val) => danhSachPhong?.find((item: KyTucXa.IPhong) => item?.ma === val)?.ten || val || '-',
        },
        {
            title: intl.formatMessage({ id: 'kytucxa.nhanphong.tenToaNha' }),
            dataIndex: 'maToaNha',
            width: 140,
            filterType: 'string',
            render: (val) => danhSachToa?.find((item: KyTucXa.IToa) => item?.ma === val)?.ten || val || '-',
        },
        {
            title: intl.formatMessage({ id: 'kytucxa.nhanphong.ngayBatDau' }),
            dataIndex: 'ngayBatDau',
            width: 120,
            align: 'center',
            sortable: true,
            render: (value) => (value ? dayjs(value).format('HH:mm DD/MM/YYYY') : '--'),
        },
        {
            title: intl.formatMessage({ id: 'kytucxa.nhanphong.ngayKetThuc' }),
            dataIndex: 'ngayKetThuc',
            width: 120,
            align: 'center',
            sortable: true,
            render: (value) => (value ? dayjs(value).format('HH:mm DD/MM/YYYY') : '--'),
        },
        {
            title: intl.formatMessage({ id: 'kytucxa.nhanphong.trangThai' }),
            dataIndex: 'trangThai',
            width: 140,
            align: 'center',
            render: (val) => renderTrangThai(val),
        },
    ];

    return (
        <TableBase
            columns={columns}
            dependencies={[page, limit]}
            modelName='kytucxa.checkinsinhvien'
            title={intl.formatMessage({ id: 'kytucxa.nhanphong.title' })}
            rowSelection
            deleteMany
            buttons={{ create: false }}
            otherButtons={checkinButton ? [checkinButton] : undefined}
        />
    );
};

export default NhanPhongKTXPage;
