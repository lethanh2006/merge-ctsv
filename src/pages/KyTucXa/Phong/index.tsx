import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { KyTucXa } from '@/services/KyTucXa/typing';
import { EditOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useIntl, useModel } from 'umi';
import { useEffect } from 'react';
import Form from './components/Form';
import ImportPhongKTX from './components/Import';
import ExportPhongKTX from './components/Export';

const PhongKTXPage = () => {
	const intl = useIntl();
	const { danhSach: danhSachToaNha, getAllModel: getAllToaNha } = useModel('kytucxa.toa');
	const { getModel, page, limit, handleEdit } = useModel('kytucxa.phong');
	const { danhSach: danhSachKhoanThu, getAllModel: getAllKhoanThu } = useModel('kytucxa.khoanthu');
	const { danhSach: danhSachTienIchAll, getAllModel: getAllTienIch } = useModel('kytucxa.danhmucchung');

	useEffect(() => {
		getAllToaNha();
		getAllKhoanThu();
		getAllTienIch();
	}, []);

	const customButtons = [
		<ImportPhongKTX key="import" onSuccessReload={getModel} />,
		<ExportPhongKTX key="export" getModel={getModel} danhSachTienIchAll={danhSachTienIchAll} />
	];

	const columns: IColumn<KyTucXa.IPhong>[] = [
		{
			title: intl.formatMessage({ id: 'kytucxa.phong.maPhong' }),
			dataIndex: 'ma',
			width: 100,
			filterType: 'string',
		},
		{
			title: intl.formatMessage({ id: 'kytucxa.phong.tenPhong' }),
			dataIndex: 'ten',
			width: 140,
			filterType: 'string',
		},
		{
			title: intl.formatMessage({ id: 'kytucxa.phong.toaNha' }),
			dataIndex: 'maToaNha',
			width: 120,
			filterType: 'string',
			render: (val) => danhSachToaNha?.find((item: KyTucXa.IToa) => item?.ma === val)?.ten || '-',
		},
		{
			title: intl.formatMessage({ id: 'kytucxa.phong.sucChua' }),
			dataIndex: 'soLuongToiDa',
			align: 'center',
			width: 100,
			sorter: true,
			render: (val) => val || '-',
		},
		{
			title: intl.formatMessage({ id: 'kytucxa.phong.dangO' }),
			dataIndex: 'soLuongHienTai',
			align: 'center',
			width: 100,
			sorter: true,
		},
		{
			title: intl.formatMessage({ id: 'kytucxa.phong.tenKhoanThuPhong' }),
			dataIndex: 'maKhoanThuPhong',
			width: 170,
			filterType: 'string',
			render: (val) => danhSachKhoanThu?.find((item: KyTucXa.IKhoanThu) => item?.maMucThu === val)?.ten || '-',
		},
		{
			title: intl.formatMessage({ id: 'kytucxa.phong.tenKhoanThuCoc' }),
			dataIndex: 'maKhoanThuCoc',
			width: 170,
			filterType: 'string',
			render: (val) => danhSachKhoanThu?.find((item: KyTucXa.IKhoanThu) => item?.maMucThu === val)?.ten || '-',
		},
		{
			title: intl.formatMessage({ id: 'kytucxa.phong.thaoTac' }),
			align: 'center',
			width: 80,
			fixed: 'right',
			render: (val, record) => (
				<>
					<Tooltip title={intl.formatMessage({ id: 'kytucxa.phong.chinhSua' })}>
						<Button onClick={() => handleEdit(record)} type='link' icon={<EditOutlined />} />
					</Tooltip>
				</>
			),
		},
	];

	return (
		<TableBase
			columns={columns}
			dependencies={[page, limit]}
			modelName='kytucxa.phong'
			title={intl.formatMessage({ id: 'kytucxa.phong.title' })}
			Form={Form}
			widthDrawer={650}
			rowSelection
			deleteMany
			otherButtons={customButtons}
			buttons={{ create: false, filter: false }}
		/>
	);
};

export default PhongKTXPage;
