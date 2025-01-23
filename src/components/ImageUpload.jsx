import { Box, Button, FormLabel, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDropzone } from "react-dropzone";
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/logo.png'

const ImageUpload = () => {
    const [image, setImage] = useState(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const filePreview = Object.assign(file, { preview: URL.createObjectURL(file) });
            setImage(filePreview);
        }
    };

    console.log("himanshu", image===null?logo:image)
    const removeImage = () => {
        setImage(null);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
            'image/svg+xml': [],
            'image/jpg': [],
        },
        multiple: false,
    });
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection:{xs:'column', sm:'column', md:'row'} }}>
                <Box>
                <FormLabel htmlFor='profile-upload' sx={{ fontWeight: 500, color:'var(--black-color)', fontSize:'18px' }}>
                    Profile
                </FormLabel>

                    {image!==null ?
                        (<Box
                            sx={{
                                position: 'relative',
                                width: '150px',
                                height: '150px',
                                borderRadius: 1,
                                overflow: 'hidden',
                                border: '1px solid var(--black-color)',
                                marginTop:'15px',
                                marginX:{xs:'auto', sm:'auto', md:'unset'}
                            }}
                        >
                            <img
                                src={image.preview}
                                alt="preview"
                                style={{ width: '100%', height: '100%', objectFit:'contain' }}
                            />
                            <IconButton
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    top: 2,
                                    right: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                }}
                                onClick={removeImage}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>) : (
                            <Box sx={{
                                position: 'relative',
                                width: '150px',
                                height: '150px',
                                borderRadius: 1,
                                overflow: 'hidden',
                                border: '1px solid var(--black-color)',
                                marginTop:'15px',
                                marginX:{xs:'auto', sm:'auto', md:'unset'}
                            }}>
                                <img
                                src={logo}
                                alt="preview"
                                style={{ width: '100%', height: '100%', objectFit:'contain' }}
                            />
                            </Box>
                        )
}
                </Box>

                <Box
                    {...getRootProps()}
                    sx={{
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        marginTop: 1,
                        display:'flex',
                        alignItems:'center',
                        flexDirection:'column',
                        justifyContent:'center'
                    }}
                >
                    <input {...getInputProps()} />
                    <Typography>Drop File To Upload</Typography>
                    <Typography variant="body2">or</Typography>
                    <Button variant="contained" sx={{backgroundColor: "var(--orange-color)"}}>
                        Upload an Image
                    </Button>
                </Box>

            </Box>
        </>
    )
}

export default ImageUpload