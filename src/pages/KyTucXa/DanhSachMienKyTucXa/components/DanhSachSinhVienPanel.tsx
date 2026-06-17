import React, { useEffect, useState } from 'react';
import { Card, Button, Popconfirm, Tooltip, Select, Space, message } from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
    UploadOutlined,
    EditOutlined,
    ImportOutlined,
    ExportOutlined
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import TableStaticData from '@/components/Table/TableStaticData';
import { EOperatorType } from '@/components/Table/constant';
import { ETrangThaiMienDangKyKTX } from '@/services/KyTucXa/constant';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import type { IColumn } from '@/components/Table/typing';
import { StudentSelectModal } from './StudentSelectModal';
import { ipCsvc } from '@/utils/ip';
import axios from '@/utils/axios';
import * as XLSX from 'xlsx';
import fileDownload from 'js-file-download';
import { UploadMinhChungModal } from './UploadMinhChungModal';
import { TuChoiModal } from './TuChoiModal';
import SelectHocKy from '@/pages/HocKy/components/SelectHocKy';
import dayjs from 'dayjs';
import TableBase from '@/components/Table';
import FormSinhVien from './FormSinhVien';

interface DanhSachSinhVienPanelProps {
    activeSemester?: KyTucXa.IDanhSachMienKTX;
    danhSachHocKy?: KyTucXa.IDanhSachMienKTX[];
    selectedSemesterId?: string;
    onSelectSemester?: (id: string) => void;
    selectedSemesterMa?: string;
    onSelectSemesterMa?: (ma: string) => void;
    loadingSemesters?: boolean;
    onAddSemester?: () => void;
    onEditSemester?: (item: KyTucXa.IDanhSachMienKTX) => void;
    onDeleteSemester?: (id: string) => void;
}

export const DanhSachSinhVienPanel: React.FC<DanhSachSinhVienPanelProps> = ({
    activeSemester,
    danhSachHocKy,
    selectedSemesterId,
    onSelectSemester,
    selectedSemesterMa,
    onSelectSemesterMa,
    loadingSemesters,
    onAddSemester,
    onEditSemester,
    onDeleteSemester,
}) => {
    const { handleEdit, deleteModel, getModel, danhSach } = useModel('kytucxa.danhsachmiensinhvien');
    const [visibleSelect, setVisibleSelect] = useState(false);

    const handleAddStudentsDone = async (newStudents: { maSinhVien: string; hoTen: string; khoaSinhVien: string }[]) => {
        if (!activeSemester?._id) {
            message.warning('Vui lòng chọn học kỳ/danh sách trước');
            return;
        }
        try {
            const danhSachId = activeSemester._id;
            await axios.post(`${ipCsvc}/danh-sach-mien-ky-tuc-xa/${danhSachId}/sinh-vien`, {
                danhSach: newStudents.map((s) => ({
                    maSinhVien: s.maSinhVien,
                    hoTen: s.hoTen,
                    khoaSinhVien: s.khoaSinhVien || '',
                })),
            });
            message.success('Import sinh viên thành công');
            setVisibleSelect(false);
            getModel({ danhSachId });
        } catch (err) {
            console.error(err);
            message.error('Có lỗi xảy ra khi import sinh viên');
        }
    };

    const handleExportExcel = () => {
        if (!danhSach || danhSach.length === 0) {
            message.warning('Không có dữ liệu để xuất');
            return;
        }

        const dataToExport = danhSach.map((item: any, index: number) => ({
            'TT': index + 1,
            'Mã sinh viên': item.code || '',
            'Họ tên': item.fullname || '',
            'Khoá sinh viên': item.khoaSinhVien || '',
            'Trạng thái minh chứng': item.trangThaiMinhChung || 'Chờ duyệt',
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fileDownload(blob, `Danh sách miễn KTX - HK ${selectedSemesterMa || ''}.xlsx`);
    };

    const columns: IColumn<any>[] = [
        {
            title: 'Mã SV',
            dataIndex: 'code',
            key: 'code',
            width: 120,
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
            width: 180,
            filterType: 'string',
        },
        {
            title: 'Khoá SV',
            dataIndex: 'khoaSinhVien',
            key: 'khoaSinhVien',
            width: 100,
            filterType: 'string',
        },
        {
            title: 'Minh chứng',
            dataIndex: 'urlMinhChung',
            key: 'urlMinhChung',
            width: 180,
            render: (val: any) => {
                if (val) {
                    const filename = val.substring(val.lastIndexOf('/') + 1) || 'minh-chung.pdf';
                    return (
                        <a href={val} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#125195', fontWeight: 500 }}>
                            {filename}
                        </a>
                    );
                }
                return <span style={{ color: '#bfbfbf' }}>Chưa nộp</span>;
            },
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: 120,
            align: 'center',
            fixed: 'right',
            render: (_value, record) => (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                    <Tooltip title='Chỉnh sửa'>
                        <Button onClick={() => handleEdit(record)} type='link' icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip title='Xóa'>
                        <Popconfirm
                            onConfirm={() => deleteModel(record._id, () => getModel({ danhSachId: activeSemester?._id }))}
                            title='Bạn có chắc chắn muốn xóa sinh viên này khỏi danh sách miễn?'
                            placement='topLeft'
                        >
                            <Button danger type='link' icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        },
    ];

    // luồng kết hợp với cổng sinh viên 
    /*
    const {
        postMienDangKySinhVien,
        deleteSinhVien,
        getSinhVien,
        postModel,
        putModel,
        getAllModel,
    } = useModel('kytucxa.danhsachmienkytucxa');
    const { getAllModel: getAllCanBo } = useModel('tochucnhansu.nhansu');

    const [students, setStudents] = useState<any[]>([]);
    const [approverNames, setApproverNames] = useState<Record<string, string>>({});
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [visibleSelect, setVisibleSelect] = useState(false);

    const [actionModalVisible, setActionModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<any>(null);
    const [, setActionType] = useState<'duyet' | 'tuchoi' | 'upload'>('duyet');

    const [uploadModalVisible, setUploadModalVisible] = useState(false);

    const fetchStudents = async (id: string) => {
        setLoadingStudents(true);
        try {
            const res = await getSinhVien(id);
            const rawData = res?.data?.data?.result || res?.data?.data || res?.data || [];
            const data = Array.isArray(rawData) ? rawData : [];
            const list = data.map((item: any) => {
                let trangThaiMinhChung = item.trangThaiMinhChung;
                if (trangThaiMinhChung === 'Đã duyệt') {
                    trangThaiMinhChung = ETrangThaiMienDangKyKTX.DA_DUYET;
                } else if (trangThaiMinhChung === 'Chờ duyệt') {
                    trangThaiMinhChung = ETrangThaiMienDangKyKTX.CHO_DUYET;
                } else if (trangThaiMinhChung === 'Từ chối') {
                    trangThaiMinhChung = ETrangThaiMienDangKyKTX.TU_CHOI;
                }
                return {
                    _id: item._id,
                    code: item.maSinhVien,
                    username: item.maSinhVien,
                    fullname: item.hoTen || item.tenSinhVien || '',
                    khoaSinhVien: item.khoaSinhVien || '',
                    trangThaiMinhChung,
                    ghiChuDuyet: item.ghiChuDuyet || '',
                    urlMinhChung: item.urlMinhChung || '',
                    ssoId: item.ssoId || '',
                    nguoiDuyet: item.nguoiDuyet || '',
                };
            });
            setStudents(list);
            const ssoIds = Array.from(new Set(list.map((s) => s.nguoiDuyet).filter(Boolean))) as string[];
            if (ssoIds.length > 0) {
                getAllCanBo(
                    false,
                    undefined,
                    undefined,
                    [
                        {
                            field: 'ssoId',
                            operator: EOperatorType.INCLUDE,
                            values: ssoIds,
                        },
                    ],
                ).then((canBos) => {
                    const nameMap: Record<string, string> = {};
                    (canBos || []).forEach((cb: any) => {
                        if (cb.ssoId) {
                            nameMap[cb.ssoId] = `${cb.hoDem ?? ''} ${cb.ten ?? ''}`.trim() || cb.hoTen || '';
                        }
                    });
                    setApproverNames((prev) => ({ ...prev, ...nameMap }));
                }).catch((err) => {
                    console.error('Failed to fetch approver names:', err);
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingStudents(false);
        }
    };

    useEffect(() => {
        if (activeSemester?._id) {
            fetchStudents(activeSemester._id);
        } else {
            setStudents([]);
        }
    }, [activeSemester?._id]);

    const handleAddStudentsDone = async (newStudents: { maSinhVien: string; hoTen: string; khoaSinhVien: string }[]) => {
        if (!selectedSemesterMa) return;
        try {
            let semesterId = activeSemester?._id;
            let messageShown = false;

            if (!semesterId) {
                const newSemester = (await postModel({
                    maHocKy: selectedSemesterMa,
                    tenHocKy: `Học kỳ ${selectedSemesterMa}`,
                    hanNopMinhChung: dayjs().add(1, 'year').toISOString(),
                    ghiChu: 'Tự động tạo khi import sinh viên',
                })) as any;
                semesterId = newSemester?._id;
                if (!semesterId) {
                    throw new Error('Không thể tạo cấu hình học kỳ mới');
                }
                messageShown = true;
                await getAllModel();
            } else {
                const hasPassed = activeSemester?.hanNopMinhChung && dayjs(activeSemester.hanNopMinhChung).isBefore(dayjs());
                if (hasPassed) {
                    await putModel(semesterId, {
                        ...activeSemester,
                        hanNopMinhChung: dayjs().add(1, 'year').toISOString(),
                    });
                    messageShown = true;
                    await getAllModel();
                }
            }

            const existingList = students.map((s) => ({
                maSinhVien: s.code,
                hoTen: s.fullname || '',
                khoaSinhVien: s.khoaSinhVien || '',
            }));
            const existingCodes = new Set(existingList.map((item) => item.maSinhVien));
            const uniqueNewStudents = newStudents.filter((item) => !existingCodes.has(item.maSinhVien));
            const combinedList = [...existingList, ...uniqueNewStudents];
            await postMienDangKySinhVien(semesterId, combinedList);
            if (!messageShown) {
                message.success('Thêm mới thành công');
            }
            setVisibleSelect(false);
            fetchStudents(semesterId);
        } catch (err) {
            console.error(err);
            message.error('Có lỗi xảy ra');
        }
    };

    const onDeleteStudent = async (recordId: string) => {
        if (!activeSemester?._id) return;
        try {
            await deleteSinhVien(recordId);
            message.success('Xóa thành công');
            fetchStudents(activeSemester._id);
        } catch (err) {
            console.error(err);
            message.error('Không thể xóa');
        }
    };

    const handleActionClick = (record: any, type: 'duyet' | 'tuchoi' | 'upload') => {
        setCurrentRecord(record);
        setActionType(type);
        if (type === 'upload') {
            setUploadModalVisible(true);
        } else {
            setActionModalVisible(true);
        }
    };

    const studentColumns: IColumn<any>[] = [
        {
            title: 'Mã SV',
            dataIndex: 'code',
            key: 'code',
            width: 120,
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
            width: 180,
            filterType: 'string',
        },
        {
            title: 'Khoá SV',
            dataIndex: 'khoaSinhVien',
            key: 'khoaSinhVien',
            width: 100,
            filterType: 'string',
        },
        {
            title: 'Minh chứng',
            dataIndex: 'urlMinhChung',
            key: 'urlMinhChung',
            width: 180,
            render: (val: any) => {
                if (val) {
                    const filename = val.substring(val.lastIndexOf('/') + 1) || 'minh-chung.pdf';
                    return (
                        <a href={val} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#125195', fontWeight: 500 }}>
                            {filename}
                        </a>
                    );
                }
                return <span style={{ color: '#bfbfbf' }}>Chưa nộp</span>;
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 100,
            render: (text: any, record: any) => {
                return (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Tooltip title="Upload">
                            <Button
                                type="text"
                                size="small"
                                onClick={() => handleActionClick(record, 'upload')}
                                icon={<UploadOutlined />}
                            />
                        </Tooltip>
                        <Popconfirm
                            title="Xóa sinh viên này khỏi danh sách miễn?"
                            onConfirm={() => onDeleteStudent(record._id)}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];
    */

    return (
        <Card
            className="table-base-card"
            title="Danh sách miễn KTX"
            style={{
                height: '100%',
                boxShadow: 'none'
            }}
            bodyStyle={{ padding: '16px' }}
        >
            <style>{`
                .table-base .header {
                    flex-direction: row !important;
                }
                .table-base .header .extra {
                    order: 1 !important;
                    flex-direction: row !important;
                }
                .table-base .header .semester-selector-wrapper {
                    order: 2 !important;
                    margin-left: 16px !important;
                }
                .table-base .header .action {
                    order: 3 !important;
                    margin-left: auto !important;
                    flex-direction: row !important;
                }
            `}</style>

            <TableBase
                hideCard={true}
                columns={columns}
                modelName='kytucxa.danhsachmiensinhvien'
                title='Danh sách miễn KTX'
                Form={FormSinhVien}
                widthDrawer={900}
                buttons={{
                    filter: false,
                    import: false,
                    export: false,
                }}
                otherButtons={[
                    <Button
                        key="btn-import-student"
                        icon={<ImportOutlined />}
                        onClick={() => setVisibleSelect(true)}
                    >
                        Nhập dữ liệu
                    </Button>,
                    <Button
                        key="btn-export-student"
                        icon={<ExportOutlined />}
                        onClick={handleExportExcel}
                    >
                        Xuất dữ liệu
                    </Button>
                ]}
                params={{ danhSachId: activeSemester?._id }}
                dependencies={[activeSemester?._id]}
                formProps={{ danhSachId: activeSemester?._id }}
            >
                <div className="semester-selector-wrapper" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
                    <span style={{ fontWeight: 600, fontSize: '14px', color: '#2e2e2e' }}>
                        Học kỳ:
                    </span>
                    <SelectHocKy
                        style={{ width: 280 }}
                        value={selectedSemesterMa}
                        onChange={onSelectSemesterMa}
                        selectMa
                    />
                </div>
            </TableBase>
            <StudentSelectModal
                open={visibleSelect}
                onCancel={() => setVisibleSelect(false)}
                activeSemester={activeSemester}
                selectedSemesterMa={selectedSemesterMa}
                existingStudents={danhSach || []}
                onOk={handleAddStudentsDone}
            />
        </Card>
    );
};

