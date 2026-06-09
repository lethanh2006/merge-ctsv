import { blobToBase64, getNameFile } from '@/utils/utils';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Image, Upload, message } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { useEffect, useRef, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { useIntl } from 'umi';
import PreviewFile from '@/components/PreviewFile';
import ModalExpandable from '@/components/Table/ModalExpandable';
import '@/components/Upload/UploadAvatar.less';
import type { TFileProps, TResizeProps, TUploadProps } from '@/components/Upload/typing';

const UploadImageKTX: React.FC<TUploadProps & { sortable?: boolean }> = ({
    value,
    onChange,
    otherProps,
    drag,
    buttonSize,
    buttonDescription,
    accept,
    isAvatar,
    isAvatarSmall,
    maxFileSize = 5,
    maxCount = 1,
    disabled,
    resize,
    fileList: fileListProp,
    extra,
    isLandscapeAvatar,
    hasPreviewFile = true,
    isWidescreen,
    sortable = false,
    ...props
}) => {
    const intl = useIntl();
    const isDisabled = disabled || otherProps?.disabled || false;
    const [fileList, setFileList] = useState<any[]>();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const dragIndexRef = useRef<number | null>(null);
    const resizeProps: TResizeProps | undefined = typeof resize === 'boolean' ? {} : resize;
    const showImage = isAvatar || isAvatarSmall || isLandscapeAvatar || isWidescreen || otherProps?.listType === 'picture-card';

    useEffect(() => {
        let files: any[] = [];
        // Single URL
        if (typeof value === 'string') {
            files = [{ url: value, remote: true, name: props.previewFileProps?.isFileId ? `${intl.formatMessage({ id: 'kytucxa.phong.tapTin' })}` : getNameFile(value) }];
            setFileList(files);
            // Callback về Form để Form Item có fileList => Phục vụ check rules fileRequired
            if (onChange) onChange({ fileList: files });
        }
        // Array of URLs
        else if (Array.isArray(value)) {
            files = value.map((url, ind) => ({
                url,
                remote: true,
                name: props.previewFileProps?.isFileId ? `${intl.formatMessage({ id: 'kytucxa.phong.tapTin' })} ${ind + 1}` : getNameFile(url),
            }));
            setFileList(files);
            // Callback về Form để Form Item có fileList => Phục vụ check rules fileRequired
            if (onChange) onChange({ fileList: files });
        }
        // Object of antd file upload
        else {
            files = fileListProp || (value && value.fileList) || [];
            setFileList(files);
        }
    }, [value, fileListProp]);

    /** Resize Hình ảnh */
    const resizeImages = (files: TFileProps[]): TFileProps[] => {
        let res = files;
        try {
            res = files?.map((file) => {
                const type = file.type?.split('/'); // image/jpeg
                if (type?.[0] === 'image' && !file.resized) {
                    file.resized = true;
                    Resizer.imageFileResizer(
                        file.originFileObj as any,
                        resizeProps?.maxWidth ?? 1024,
                        resizeProps?.maxHeight ?? 1024,
                        resizeProps?.compressFormat ?? type?.[1] ?? 'webp',
                        resizeProps?.quality ?? 90,
                        resizeProps?.rotation ?? 0,
                        (blob: any) => {
                            // temp = [{ url: URL.createObjectURL(blob), remote: true, name: getNameFile(URL.createObjectURL(blob)) }];
                            // console.log('🚀 ~ useEffect ~ temp:', temp);
                            file.originFileObj = blob;
                        },
                        resizeProps?.outputType ?? 'file',
                        resizeProps?.minWidth,
                        resizeProps?.minHeight,
                    );
                }
                return file;
            });
        } catch (err) {
            console.log(err);
        }
        return res;
    };

    const handleChange = (val: any) => {
        let files = val.fileList as TFileProps[];
        const findLargeFile = files?.some((file) => file.size && file.size / 1024 / 1024 > maxFileSize);
        if (findLargeFile) {
            message.error(intl.formatMessage({ id: 'global.uploadfile.error.mb' }, { maxFileSize: maxFileSize }));
            return;
        }

        const findWrongTypeFile = files?.some((file) => {
            const arrFileName = file.name.split('.');
            return file?.remote !== true && !otherProps?.accept?.includes(arrFileName?.[arrFileName.length - 1]);
        });
        if (findWrongTypeFile && otherProps?.accept) {
            message.error(intl.formatMessage({ id: 'global.uploadfile.error.format' }));
            return;
        }

        if (files.length > maxCount) files.splice(0, files.length - maxCount);
        if (!!resize) files = resizeImages(files);

        setFileList(files);
        if (onChange) onChange({ fileList: files });
    };

    /** Xem trước ảnh */
    const handlePreviewImage = async (file: TFileProps) => {
        // Nếu file mới up lên (chưa có url và preview) thì thêm preview vào file
        if (!file.url && !file.preview) file.preview = await blobToBase64(file.originFileObj as RcFile);

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    /** Xem trước file */
    const handlePreviewFile = async (file: TFileProps) => {
        if (file.url) {
            setPreviewImage(file.url ?? '');
            setPreviewOpen(true);
        }
    };

    /** Xử lý kéo thả để sắp xếp lại thứ tự ảnh */
    const handleDragStart = (index: number) => {
        dragIndexRef.current = index;
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        setDragOverIndex(null);
        const fromIndex = dragIndexRef.current;
        if (fromIndex === null || fromIndex === dropIndex) return;
        const newList = [...(fileList || [])];
        const [moved] = newList.splice(fromIndex, 1);
        newList.splice(dropIndex, 0, moved);
        dragIndexRef.current = null;
        setFileList(newList);
        if (onChange) onChange({ fileList: newList });
    };

    const handleDragEnd = () => {
        dragIndexRef.current = null;
        setDragOverIndex(null);
    };

    const Extra = () =>
        isDisabled ? null : (
            <small style={{ color: '#999' }}>
                <i>{intl.formatMessage({ id: 'global.uploadfile.toida' }, { maxCount: maxCount, maxFileSize: maxFileSize })}</i>
                {extra && (
                    <div>
                        <i>{extra}</i>
                    </div>
                )}
            </small>
        );

    // DRAGGER
    if (drag)
        return (
            <Upload.Dragger
                disabled={isDisabled}
                customRequest={({ onSuccess }) => setTimeout(() => onSuccess && onSuccess('ok'), 0)}
                fileList={fileList}
                onChange={handleChange}
                style={{ width: '100%' }}
                multiple={maxCount > 1}
                accept={accept}
                {...otherProps}
            >
                {!isDisabled ? (
                    <>
                        <p className='ant-upload-drag-icon'>
                            <UploadOutlined />
                        </p>
                        <p className='ant-upload-text'>{intl.formatMessage({ id: 'global.uploadfile.text' })}</p>
                        <p className='ant-upload-hint'>{buttonDescription}</p>
                        <Extra />
                    </>
                ) : null}
            </Upload.Dragger>
        );

    if (showImage)
        return (
            <>
                <Upload
                    disabled={isDisabled}
                    customRequest={({ onSuccess }) => setTimeout(() => onSuccess && onSuccess('ok'), 0)}
                    listType='picture-card'
                    className={isAvatar || isAvatarSmall || isLandscapeAvatar || isWidescreen ? `avatar-uploader ${
                        isAvatarSmall
                            ? 'avatar-small'
                            : isLandscapeAvatar
                                ? 'avatar-landscape'
                                : isWidescreen
                                    ? 'avatar-widescreen'
                                    : undefined
                    }` : undefined}
                    fileList={fileList}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                    multiple={false}
                    accept='image/*'
                    onPreview={handlePreviewImage}
                    itemRender={sortable && !isDisabled ? (originNode, file, currFileList) => {
                        const index = currFileList.indexOf(file);
                        const isDragOver = dragOverIndex === index;
                        return (
                            <div
                                draggable
                                onDragStart={(e) => {
                                    e.stopPropagation();
                                    handleDragStart(index);
                                }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setDragOverIndex(index);
                                }}
                                onDragLeave={(e) => {
                                    e.stopPropagation();
                                    setDragOverIndex(null);
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDrop(e, index);
                                }}
                                onDragEnd={(e) => {
                                    e.stopPropagation();
                                    handleDragEnd();
                                }}
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    cursor: 'grab',
                                    outline: isDragOver ? '2px dashed #1677ff' : undefined,
                                    borderRadius: 8,
                                    boxSizing: 'border-box',
                                }}
                            >
                                {originNode}
                            </div>
                        );
                    } : undefined}
                    {...otherProps}
                >
                    {!isDisabled && (!fileList || fileList.length < maxCount) ? (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <PlusOutlined />
                            <div className='ant-upload-text'>
                                {buttonDescription || intl.formatMessage({ id: 'global.uploadfile.tailen' })}
                            </div>
                        </div>
                    ) : null}
                </Upload>
                <Extra />

                <Image
                    style={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        src: previewImage,
                        onVisibleChange: (val) => setPreviewOpen(val),
                    }}
                />
            </>
        );

    // UPLOAD BUTTON
    return (
        <>
            <Upload
                disabled={isDisabled}
                customRequest={({ onSuccess }) => {
                    setTimeout(() => onSuccess && onSuccess('ok'), 0);
                }}
                fileList={fileList}
                onChange={handleChange}
                style={{ width: '100%' }}
                multiple={maxCount > 1}
                accept={accept}
                onPreview={hasPreviewFile ? handlePreviewFile : undefined}
                {...otherProps}
            >
                {!isDisabled ? (
                    <Button size={buttonSize || 'small'} icon={<UploadOutlined />}>
                        {buttonDescription || intl.formatMessage({ id: 'global.uploadfile.button.chontep' }, { maxFileSize })}
                    </Button>
                ) : null}
            </Upload>
            <Extra />

            {hasPreviewFile && (
                <ModalExpandable
                    title={intl.formatMessage({ id: 'kytucxa.phong.xemTruocAnh' })}
                    width={1200}
                    open={previewOpen}
                    footer={null}
                    onCancel={() => setPreviewOpen(false)}
                >
                    <PreviewFile file={previewImage} {...props.previewFileProps} />

                    <div className='form-footer'>
                        <Button onClick={() => setPreviewOpen(false)}>{intl.formatMessage({ id: 'global.button.dong' })}</Button>
                    </div>
                </ModalExpandable>
            )}
        </>
    );
};

export default UploadImageKTX;
