import React, { ChangeEvent, useState } from 'react';
import TextField from '../TextField/TextField';
import { TextFieldProps } from '@mui/material';
import { FileContainer, UploadIcon } from './FileField.styled';

export interface FileFieldProps extends Omit<TextFieldProps, 'onChange'> {
    onChange: (files: FileList) => void;
}

const FileField: React.FC<FileFieldProps> = ({ onChange, ...props }) => {
    const [filePath, setFilePath] = useState('');

    function handleFileChange(ev: ChangeEvent) {
        const target = ev.target as HTMLInputElement,
            files = target.files;

        if (files !== null && files.length) {
            setFilePath(files[0]?.name || '');
            onChange(files);
        }
    }

    return (
        <FileContainer>
            <TextField
                value={filePath}
                label="Selecione o arquivo"
                InputProps={{
                    endAdornment: <UploadIcon className="twf-upload" />,
                }}
                fullWidth
                {...props}
            />
            <TextField
                fullWidth
                type="file"
                {...props}
                onChange={(ev) => handleFileChange(ev)}
            />
        </FileContainer>
    );
};

export default FileField;
