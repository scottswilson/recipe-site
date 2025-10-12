import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Grid from '@mui/material/Grid';
import getCroppedImg from './cropImage';
import { Typography } from '@mui/material';

import UploadIcon from '@mui/icons-material/Upload';
import SaveIcon from '@mui/icons-material/Save';

import { GoodButton } from "../Styled"

const ImageCropUpload = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      return;
    }

    setBusy(true);

    const croppedImage = await getCroppedImg(image, croppedAreaPixels);

    if (!croppedImage) {
      setBusy(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', croppedImage, 'cropped-image.jpg');

    console.log(croppedImage)

    try {
      setUploadStatus('Uploading...');
      const response = await fetch('https://example.com/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('Image uploaded successfully!');
      } else {
        setUploadStatus('Upload failed.');
      }
    } catch (error) {
      setUploadStatus('An error occurred.');
      console.error(error);
    }
    
    setBusy(false);
  };

  return (
    <Grid style={{ maxWidth: 500, margin: 'auto' }} container spacing={1}>
      <Grid item size={{ xs: 4 }}>
        <GoodButton
          variant="contained"
          color="primary"
          fullWidth
          style={{height: "40px"}}
          component="label"
        >
          <input type="file" accept="image/*" onChange={handleFileChange} hidden/>
          <UploadIcon/>Upload
        </GoodButton>

      </Grid>
      <Grid item size={{ xs: 4 }}>
        <GoodButton
          variant="contained"
          color="info"
          onClick={uploadImage}
          style={{height: "40px"}}
          disabled={busy || !image}
        >
          <SaveIcon/> Save
        </GoodButton>
      </Grid>
      <Grid item size={{ xs: 4 }}>
        <Typography>
          {uploadStatus}
        </Typography>
      </Grid>
      {image && (
        <Grid item size={{ xs: 12 }} style={{
          position: "relative",
          height: "300px",
          background: "#333",
        }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default ImageCropUpload;