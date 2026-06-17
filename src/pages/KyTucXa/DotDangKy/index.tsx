import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Popconfirm, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import Form from './components/Form';

const DotDangKy = () => {
	const { handleEdit, deleteModel, getModel } = useModel('kytucxa.dotdangky');



	const columns: IColumn<KyTucXa.IDotDangKyKTX>[] = [
		{
			title: 'Tên đợt',
			dataIndex: 'tenDot',
			width: 220,
			filterType: 'string',
			sortable: true,
		},
		{
			title: 'Học kỳ',
			dataIndex: 'maHocKy',
			width: 120,
			filterType: 'string',
		},
		{
			title: 'Loại đợt',
			dataIndex: 'loaiDot',
			width: 140,
			filterType: 'string',
			render: (value) => value || '--',
		},
		{
			title: 'Bắt đầu',
			dataIndex: 'ngayChuyenVao',
			width: 150,
			align: 'center',
			filterType: 'datetime',
			sortable: true,
			render: (value) => (value ? dayjs(value).format('HH:mm DD/MM/YYYY') : '--'),
		},
		{
			title: 'Kết thúc',
			dataIndex: 'ngayChuyenRa',
			width: 150,
			align: 'center',
			filterType: 'datetime',
			sortable: true,
			render: (value) => (value ? dayjs(value).format('HH:mm DD/MM/YYYY') : '--'),
		},
		{
			title: 'Ghi chú',
			dataIndex: 'ghiChu',
			width: 220,
			filterType: 'string',
			render: (value) => value || '--',
		},
		{
			title: 'Thao tác',
			width: 150,
			align: 'center',
			fixed: 'right',
			render: (_value, record) => (
				<>
					<Tooltip title='Chỉnh sửa'>
						<Button onClick={() => handleEdit(record)} type='link' icon={<EditOutlined />} />
					</Tooltip>
					{/* <Tooltip title='Xem ID'>
						<Button
							onClick={() => {
								setSelectedId(record._id);
								setIsModalOpen(true);
							}}
							type='link'
						>
							ID
						</Button>
					</Tooltip> */}

					<Tooltip title='Xóa'>
						<Popconfirm
							onConfirm={() => deleteModel(record._id, getModel)}
							title='Bạn có chắc chắn muốn xóa đợt đăng ký này?'
							placement='topLeft'
						>
							<Button danger type='link' icon={<DeleteOutlined />} />
						</Popconfirm>
					</Tooltip>
				</>
			),
		},
	];

	return (
		<>
			<TableBase
				columns={columns}
				modelName='kytucxa.dotdangky'
				title='Đợt đăng ký ký túc xá'
				Form={Form}
				widthDrawer={900}
				buttons={{ filter: false }}
			/>
		</>
	);
};

export default DotDangKy;
