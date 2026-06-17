import { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'antd';
import { useModel } from '@umijs/max';
import { DanhSachSinhVienPanel } from './components/DanhSachSinhVienPanel';
import FormHocKy from './components/FormHocKy';

const DanhSachMienKyTucXa = () => {
    const {
        danhSach,
        getAllModel,
        loading,
        deleteModel,
        visibleForm,
        setVisibleForm,
        setRecord,
        edit,
        setEdit,
        handleEdit,
    } = useModel('kytucxa.danhsachmienkytucxa');

    const [selectedSemesterMa, setSelectedSemesterMa] = useState<string | undefined>(undefined);

    useEffect(() => {
        getAllModel();
    }, []);

    useEffect(() => {
        if (danhSach.length > 0) {
            if (!selectedSemesterMa || !danhSach.some((item) => item.maHocKy === selectedSemesterMa)) {
                setSelectedSemesterMa(danhSach[0].maHocKy);
            }
        } else {
            setSelectedSemesterMa(undefined);
        }
    }, [danhSach]);

    const activeSemester = danhSach.find((item) => item.maHocKy === selectedSemesterMa);

    return (
        <>
            <DanhSachSinhVienPanel
                activeSemester={activeSemester}
                selectedSemesterMa={selectedSemesterMa}
                onSelectSemesterMa={setSelectedSemesterMa}
                loadingSemesters={loading}
                onAddSemester={() => {
                    setEdit(false);
                    setRecord(undefined);
                    setVisibleForm(true);
                }}
                onEditSemester={(item) => {
                    handleEdit(item);
                }}
                onDeleteSemester={(id) => {
                    deleteModel(id, getAllModel);
                }}
            />

            <Modal
                open={visibleForm}
                title={`${edit ? 'Chỉnh sửa' : 'Thêm mới'} học kỳ`}
                width={550}
                onCancel={() => setVisibleForm(false)}
                destroyOnClose
                footer={null}
            >
                <FormHocKy />
            </Modal>
        </>
    );
};

export default DanhSachMienKyTucXa;
