import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import Grid from '@mui/material/Grid';
import getCroppedImg from './cropImage';
import { Typography } from '@mui/material';

import UploadIcon from '@mui/icons-material/Upload';
import SaveIcon from '@mui/icons-material/Save';

import { GoodButton } from "../Styled"
import {
  imageSchema,
} from "../Schema"

function base64ToFile(base64String, fileName) {

  if (!base64String.startsWith("data:image/webp;base64,")) {
    return;
  }

  const [_, base64Data] = base64String.split(',')

  const type = 'image/webp';

  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  return new File([byteArray], fileName, { type });
}

const ImageCropUpload = (props) => {
  const { ctx, id, currentImage } = props;
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

    setUploadStatus('');

    const cbSuccess = () => {
      setUploadStatus('Image uploaded successfully!');
    };

    const cbFinally = () => {
      setBusy(false);
    };

    imageSchema(ctx, id, croppedImage, cbFinally, cbSuccess);

  };

  useEffect(() => {
    const newImage = base64ToFile(currentImage, "image.webp");
    if (newImage) {
      const imageUrl = URL.createObjectURL(newImage);
      setImage(imageUrl);
    } else {
      setImage(null);
    }
    setUploadStatus('');
  }, [ctx.selectedId.value])

  return (
    <Grid style={{ maxWidth: 500, margin: 'auto' }} container spacing={1}>
      <Grid size={{ xs: 4 }}>
        <GoodButton
          variant="contained"
          color="primary"
          fullWidth
          style={{ height: "40px" }}
          component="label"
        >
          <input type="file" accept="image/*" onChange={handleFileChange} hidden />
          <UploadIcon />Upload
        </GoodButton>

      </Grid>
      <Grid size={{ xs: 4 }}>
        <GoodButton
          variant="contained"
          color="info"
          onClick={uploadImage}
          style={{ height: "40px" }}
          disabled={busy || !image}
        >
          <SaveIcon /> Save
        </GoodButton>
      </Grid>
      <Grid size={{ xs: 4 }}>
        <Typography>
          {uploadStatus}
        </Typography>
      </Grid>
      {image && (
        <Grid size={{ xs: 12 }} style={{
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