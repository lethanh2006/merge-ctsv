import React, { useState } from 'react';
import { Button, Modal, Checkbox, message } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import ButtonExtend from '@/components/Table/ButtonExtend';
import * as XLSX from 'xlsx';
import { useIntl } from 'umi';

interface IExportProps {
    getModel: (cond1?: any, cond2?: any, cond3?: any, page?: number, limit?: number) => Promise<any>;
    danhSachTienIchAll: any[];
}

const ExportPhongKTX: React.FC<IExportProps> = ({ getModel, danhSachTienIchAll }) => {
    const intl = useIntl();
    
    const EXPORT_OPTIONS = [
        { label: intl.formatMessage({ id: 'kytucxa.phong.maPhong' }), value: 'ma' },
        { label: intl.formatMessage({ id: 'kytucxa.phong.tenPhong' }), value: 'ten' },
        { label: intl.formatMessage({ id: 'kytucxa.phong.maToaNha' }), value: 'maToaNha' },
        { label: intl.formatMessage({ id: 'kytucxa.phong.sucChua' }), value: 'soLuongToiDa' },
        { label: intl.formatMessage({ id: 'kytucxa.phong.dangO' }), value: 'soLuongHienTai' },
        { label: intl.formatMessage({ id: 'kytucxa.phong.moTa' }), value: 'moTa' },
        { label: intl.formatMessage({ id: 'kytucxa.phong.maKhoanThuPhong' }), value: 'maKhoanThuPhong' },
        { label: intl.formatMessage({ id: 'kytucxa.phong.maKhoanThuCoc' }), value: 'maKhoanThuCoc' },
        { label: intl.formatMessage({ id: 'kytucxa.phong.gioiTinh' }), value: 'gioiTinh' },
        { label: intl.formatMessage({ id: 'kytucxa.phong.soLuongToiDaMoiKhoa' }), value: 'maxPerKhoa' },
        { label: intl.formatMessage({ id: 'kytucxa.phong.tienIch' }), value: 'tienIch' },
    ];

    const [exporting, setExporting] = useState(false);
    const [isExportModalVisible, setIsExportModalVisible] = useState(false);
    const [selectedFields, setSelectedFields] = useState<string[]>(EXPORT_OPTIONS.map(opt => opt.value));

    const executeExport = async () => {
        if (selectedFields.length === 0) {
            message.warning(intl.formatMessage({ id: 'kytucxa.phong.xuatDuLieu.vuiLongChonItNhat1Truong' }));
            return;
        }

        setExporting(true);
        try {
            const allData = await getModel(undefined, undefined, undefined, 1, 10000);
            
            const exportData = allData.map((row: any) => {
                const baseRow: any = {};

                if (selectedFields.includes('ma')) baseRow[intl.formatMessage({ id: 'kytucxa.phong.maPhong' })] = row.ma;
                if (selectedFields.includes('ten')) baseRow[intl.formatMessage({ id: 'kytucxa.phong.tenPhong' })] = row.ten;
                if (selectedFields.includes('maToaNha')) baseRow[intl.formatMessage({ id: 'kytucxa.phong.maToaNha' })] = row.maToaNha;
                if (selectedFields.includes('soLuongToiDa')) baseRow[intl.formatMessage({ id: 'kytucxa.phong.sucChua' })] = row.soLuongToiDa;
                if (selectedFields.includes('soLuongHienTai')) baseRow[intl.formatMessage({ id: 'kytucxa.phong.dangO' })] = row.soLuongHienTai;
                if (selectedFields.includes('moTa')) baseRow[intl.formatMessage({ id: 'kytucxa.phong.moTa' })] = row.moTa;
                if (selectedFields.includes('maKhoanThuPhong')) baseRow[intl.formatMessage({ id: 'kytucxa.phong.maKhoanThuPhong' })] = row.maKhoanThuPhong;
                if (selectedFields.includes('maKhoanThuCoc')) baseRow[intl.formatMessage({ id: 'kytucxa.phong.maKhoanThuCoc' })] = row.maKhoanThuCoc;
                if (selectedFields.includes('gioiTinh')) baseRow[intl.formatMessage({ id: 'kytucxa.phong.gioiTinh' })] = row?.dangKyKyTucXaRule?.gioiTinh || '';
                if (selectedFields.includes('maxPerKhoa')) baseRow[intl.formatMessage({ id: 'kytucxa.phong.soLuongToiDaMoiKhoa' })] = row?.dangKyKyTucXaRule?.maxPerKhoa || '';

                if (selectedFields.includes('tienIch') && row.danhSachTienIch && Array.isArray(row.danhSachTienIch)) {
                    row.danhSachTienIch.forEach((tienIch: any, idx: number) => {
                        const fullTienIch = danhSachTienIchAll?.find((item: any) => item.ma === tienIch.maDanhMucTienIch);
                        baseRow[`${intl.formatMessage({ id: 'kytucxa.phong.tienIch' })} ${idx + 1}`] = fullTienIch?.ten || '';
                    });
                }

                return baseRow;
            });

            const ws = XLSX.utils.json_to_sheet(exportData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, intl.formatMessage({ id: 'kytucxa.phong.xuatDuLieu.danhSachPhong' }));
            XLSX.writeFile(wb, intl.formatMessage({ id: 'kytucxa.phong.xuatDuLieu.danhSachPhongKTXXlsx' }));
            
            message.success(intl.formatMessage({ id: 'kytucxa.phong.xuatDuLieu.thanhCong' }));
            setIsExportModalVisible(false);
        } catch (error) {
            console.error(error);
            message.error(intl.formatMessage({ id: 'kytucxa.phong.xuatDuLieu.thatBai' }));
        } finally {
            setExporting(false);
        }
    };

    return (
        <>
            <ButtonExtend
                className='btn-export'
                icon={<ExportOutlined />}
                onClick={() => setIsExportModalVisible(true)}
                loading={exporting}
            >
                {intl.formatMessage({ id: 'kytucxa.phong.xuatDuLieu' })}
            </ButtonExtend>

            <Modal
                title={intl.formatMessage({ id: 'kytucxa.phong.xuatDuLieu.tuyChonTruong' })}
                open={isExportModalVisible}
                onCancel={() => !exporting && setIsExportModalVisible(false)}
                footer={[
                    <Button 
                        key="cancel" 
                        onClick={() => setIsExportModalVisible(false)} 
                        disabled={exporting}
                    >
                        {intl.formatMessage({ id: 'global.button.huy' })}
                    </Button>,
                    <Button 
                        key="submit" 
                        type="primary" 
                        loading={exporting} 
                        onClick={executeExport}
                        icon={<ExportOutlined />}
                    >
                        {intl.formatMessage({ id: 'kytucxa.phong.xuatDuLieu.taiXuongDuLieu' })}
                    </Button>,
                ]}
            >
                <div style={{ marginBottom: 12, color: '#888' }}>
                    {intl.formatMessage({ id: 'kytucxa.phong.xuatDuLieu.chonCacTruongDuLieuBanMuonTrichXuat' })}
                </div>
                <div style={{ marginBottom: 12, display: 'flex', gap: '8px' }}>
                    <Button 
                        size="small" 
                        onClick={() => setSelectedFields(EXPORT_OPTIONS.map(opt => opt.value))}
                    >
                        {intl.formatMessage({ id: 'global.button.chonTatCa', defaultMessage: 'Chọn tất cả' })}
                    </Button>
                    <Button 
                        size="small" 
                        onClick={() => setSelectedFields([])}
                    >
                        {intl.formatMessage({ id: 'global.button.boChonTatCa', defaultMessage: 'Bỏ chọn tất cả' })}
                    </Button>
                </div>
                <Checkbox.Group
                    options={EXPORT_OPTIONS}
                    value={selectedFields}
                    onChange={(checkedValues) => setSelectedFields(checkedValues as string[])}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}
                />
            </Modal>
        </>
    );
};

export default ExportPhongKTX;