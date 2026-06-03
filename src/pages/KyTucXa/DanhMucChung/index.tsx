import TableBase from '@/components/Table';
import ButtonExtend from '@/components/Table/ButtonExtend';
import { type IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Image } from 'antd';
import { useEffect, useMemo } from 'react';
import { useModel, useIntl } from 'umi';
import Form from './components/Form';
import { KyTucXa } from '@/services/KyTucXa/typing';

const DanhMucChungPage = () => {
	const intl = useIntl();
	const { getModel, page, limit, deleteModel, handleEdit } = useModel('kytucxa.danhmucchung');
	const { danhSach: danhSachLoai, getAllLoaiDanhMucChungPublicModel } = useModel('kytucxa.loaidanhmucchung');

	useEffect(() => {
		getAllLoaiDanhMucChungPublicModel();
	}, []);

	const tenLoaiByMa = useMemo(() => new Map((danhSachLoai ?? []).map((item) => [item.ma, item.ten])), [danhSachLoai]);

	const columns: IColumn<KyTucXa.IDanhMucChung>[] = [
		{
			title: intl.formatMessage({ id: 'kytucxa.danhmucchung.ma' }),
			dataIndex: 'ma',
			width: 100,
			filterType: 'string',
			sortable: true,
		},
		{
			title: intl.formatMessage({ id: 'kytucxa.danhmucchung.ten' }),
			dataIndex: 'ten',
			width: 200,
			filterType: 'string',
		},
		{
			title: intl.formatMessage({ id: 'kytucxa.danhmucchung.loai' }),
			dataIndex: 'maLoai',
			width: 150,
			filterType: 'string',
			render: (value: string) => tenLoaiByMa.get(value) ?? value,
		},
		{
			title: intl.formatMessage({ id: 'kytucxa.danhmucchung.icon' }),
			dataIndex: 'anh',
			width: 150,
			filterType: 'string',
			render: (val: string) => val ? <Image src={val} width={30} height={30} style={{ objectFit: 'contain' }} /> : null,
		},
		{
			title: intl.formatMessage({ id: 'kytucxa.danhmucchung.ghichu' }),
			dataIndex: 'ghiChu',
			width: 200,
		},
		{
			title: intl.formatMessage({ id: 'kytucxa.danhmucchung.actions' }),
			align: 'center',
			width: 90,
			fixed: 'right',
			render: (val, record) => (
				<>
					<ButtonExtend tooltip={intl.formatMessage({ id: 'kytucxa.danhmucchung.edit' })} onClick={() => handleEdit(record)} type='link' icon={<EditOutlined />} />
					<Popconfirm
						onConfirm={() => deleteModel(record._id, getModel)}
						title={intl.formatMessage({ id: 'kytucxa.danhmucchung.xacnhanxoa' })}
						placement='topRight'
					>
						<ButtonExtend tooltip={intl.formatMessage({ id: 'kytucxa.danhmucchung.delete' })} danger type='link' icon={<DeleteOutlined />} />
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
			title={intl.formatMessage({ id: 'kytucxa.danhmucchung.title' })}
			Form={Form}
			buttons={{ import: false, export: false }}
		/>
	);
};

export default DanhMucChungPage;
