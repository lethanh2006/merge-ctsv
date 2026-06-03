import TableBase from '@/components/Table';
import ButtonExtend from '@/components/Table/ButtonExtend';
import { type IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Image } from 'antd';
import { useEffect, useMemo } from 'react';
import { useModel } from 'umi';
import Form from './components/Form';
import { KyTucXa } from '@/services/KyTucXa/typing';

const DanhMucChungPage = () => {
	const { getModel, page, limit, deleteModel, handleEdit } = useModel('kytucxa.danhmucchung');
	const { danhSach: danhSachLoai, getAllLoaiDanhMucChungPublicModel } = useModel('kytucxa.loaidanhmucchung');

	useEffect(() => {
		getAllLoaiDanhMucChungPublicModel();
	}, []);

	const tenLoaiByMa = useMemo(() => new Map((danhSachLoai ?? []).map((item) => [item.ma, item.ten])), [danhSachLoai]);

	const columns: IColumn<KyTucXa.ILoaiDanhMucChung>[] = [
		{
			title: 'Mã',
			dataIndex: 'ma',
			width: 100,
			filterType: 'string',
			sortable: true,
		},
		{
			title: 'Tên',
			dataIndex: 'ten',
			width: 200,
			filterType: 'string',
		},
		{
			title: 'Loại',
			dataIndex: 'maLoai',
			width: 150,
			filterType: 'string',
			render: (value: string) => tenLoaiByMa.get(value) ?? value,
		},
		{
			title: 'Icon',
			dataIndex: 'anh',
			width: 150,
			filterType: 'string',
			render: (val: string) => val ? <Image src={val} width={30} height={30} style={{ objectFit: 'contain' }} /> : null,
		},
		{
			title: 'Ghi chú',
			dataIndex: 'ghiChu',
			width: 200,
		},
		{
			title: 'Thao tác',
			align: 'center',
			width: 90,
			fixed: 'right',
			render: (val, record) => (
				<>
					<ButtonExtend tooltip='Chỉnh sửa' onClick={() => handleEdit(record)} type='link' icon={<EditOutlined />} />
					<Popconfirm
						onConfirm={() => deleteModel(record._id, getModel)}
						title='Bạn có chắc chắn muốn xóa mã loại này?'
						placement='topRight'
					>
						<ButtonExtend tooltip='Xóa' danger type='link' icon={<DeleteOutlined />} />
					</Popconfirm>
				</>
			),
		},
	];

	return (
		<TableBase
			columns={columns}
			dependencies={[page, limit]}
			modelName='kytucxa.danhmucchung'
			title={'Quản lý danh mục chung'}
			Form={Form}
			buttons={{ import: false, export: false }}
		/>
	);
};

export default DanhMucChungPage;
