import { useEffect } from 'react';
import { storage } from '../../firebase';
import { useFileUpload } from 'react-firebase-file-upload';

interface FileUploaderProps {
  fileUrl: (url: string) => void;
}

const FileUploader = ({ fileUrl }: FileUploaderProps) => {
  const _input = useFileUpload(storage, {
    accept: 'image/png, image/jpeg, image/jpg, image/webp',
    multiple: false,
    path: `players`,
  });

  const {
    type,
    accept,
    multiple,
    disabled,
    onChange,
    files,
    loading,
    error,
    progress,
    status,
    downloadURL,
    isCompleted,
    onUpload,
    onUploadComplete,
    onRemove,
  } = _input;

  useEffect(() => {
    if (isCompleted) {
      fileUrl(downloadURL[0]);
    }
  }, [isCompleted, downloadURL, fileUrl]);

  return (
    <>
      <input
        type={type}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={onChange}
      />
      <div className="image_upload_container">
        {isCompleted && <div className="remove">Remove</div>}
        {files &&
          files.map((file, index) => (
            <div key={index}>
              {file.type?.includes('image') && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                  }}
                />
              )}
              <p>{file.name}</p>
              <p>{file.size}</p>
              <p>{file.type}</p>
              <button onClick={() => onRemove(file)}>Remove</button>
            </div>
          ))}
        {loading && <p>Loading...</p>}

        {error && <p>Error: {error}</p>}

        {status &&
          Object.keys(status).map((key, index) => (
            <p key={index}>
              {key}: {status[key]}
            </p>
          ))}

        {progress &&
          Object.keys(progress).map((key, index) => (
            <p key={index}>
              {key}: {progress[key]}%{' '}
            </p>
          ))}

        {isCompleted && (
          <button onClick={onUploadComplete}>Upload Complete</button>
        )}

        <button onClick={(e) => { e.preventDefault(); onUpload(); }}>Upload</button>
      </div>
    </>
  );
};

export default FileUploader;
