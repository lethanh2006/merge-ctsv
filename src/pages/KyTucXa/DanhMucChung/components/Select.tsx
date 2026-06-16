import { KyTucXa } from '@/services/KyTucXa/typing';
import { Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { useModel, useIntl } from 'umi';

const SelectLoaiDanhMucChung = (props: {
	value?: string;
	onChange?: (val?: string) => void;
	multiple?: boolean;
	allowClear?: boolean;
	style?: React.CSSProperties;
	isSetRecord?: boolean;
	condition?: Partial<KyTucXa.ILoaiDanhMucChung>;
	selectMa?: boolean;
	disabled?: boolean;
}) => {
	const intl = useIntl();
	const { value, onChange, multiple, allowClear, style, condition, selectMa, disabled } = props;
	const { danhSach, getAllLoaiDanhMucChungPublicModel } = useModel('kytucxa.loaidanhmucchung');

	useEffect(() => {
		getAllLoaiDanhMucChungPublicModel();
	}, []);

	const danhSachFilter = useMemo(() => {
		if (!condition) return danhSach;

		return danhSach.filter((item) =>
			Object.entries(condition).every(([key, expectedValue]) => {
				if (expectedValue === undefined) return true;
				return item?.[key as keyof KyTucXa.ILoaiDanhMucChung] === expectedValue;
			}),
		);
	}, [danhSach, JSON.stringify(condition)]);

	return (
		<Select
			disabled={disabled}
			mode={multiple ? 'multiple' : undefined}
			allowClear={allowClear}
			value={value}
			onChange={onChange}
			options={danhSachFilter.map((item) => ({
				key: item._id,
				value: selectMa ? item.ma : item._id,
				label: item.ten,
			}))}
			showSearch
			optionFilterProp='label'
			placeholder={intl.formatMessage({ id: 'kytucxa.danhmucchung.chonmaloai' })}
			style={{ width: '100%', ...style }}
			showArrow
		/>
	);
};

export default SelectLoaiDanhMucChung;
