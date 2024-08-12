import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  // Button,
  LinearProgress,
} from '@mui/material';
import Button from './Button';

const RecipeModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
  newRecipe,
  setNewRecipe,
  uploadProgress,
}) => {
  const [imageURL, setImageURL] = useState(null);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    setNewRecipe({ ...newRecipe, imageFile: file });
    setImageURL(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (!isOpen) {
      setImageURL(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (newRecipe?.image && !imageURL) {
      setImageURL(newRecipe.image);
    }
  }, [newRecipe, imageURL]);

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="recipe-modal-title"
      aria-describedby="recipe-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          background: 'white',
          borderRadius: 2,
          padding: 3,
          maxWidth: 700,
          width: '100%',
          boxShadow: 3,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <Typography id="recipe-modal-title" variant="h6" component="h2">
          {newRecipe.id ? 'Edit Recipe' : 'Add Recipe'}
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <TextField
            label="Title"
            value={newRecipe.title}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, title: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ingredients"
            value={newRecipe.ingredients}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, ingredients: e.target.value })
            }
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Instructions"
            value={newRecipe.instructions}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, instructions: e.target.value })
            }
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Description"
            value={newRecipe.description}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, description: e.target.value })
            }
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <Button
            type="button"
            variant="transparent"
            onClick={() => document.querySelector('input[type="file"]').click()}
            label={newRecipe.image ? 'Change Image' : 'Upload Image'}
          />
          <input type="file" hidden onChange={handleUploadImage} />
          {imageURL && (
            <img
              src={imageURL}
              alt="Thumbnail"
              style={{ marginTop: 10, maxWidth: '100%', height: 'auto' }}
            />
          )}
          {uploadProgress > 0 && (
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{ width: '100%', marginTop: 2 }}
            />
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 2,
              width: '100%',
            }}
          >
            <Button
              type="submit"
              variant="primary"
              sx={{ marginRight: 1 }}
              label={newRecipe.id ? 'Update Recipe' : 'Add Recipe'}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={onRequestClose}
              label="Cancel"
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default RecipeModal;
