import React from 'react';

import { Modal, Box, Grid, Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import NoImage from '../assets/png/image.jpeg';
import { Close } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 1000,
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  maxHeight: '90vh',
};

const RecipeImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-top: 10px;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 'auto';
`;

const RecipeText = styled.p`
  color: #777;
  white-space: pre-wrap;
`;

const RecipesDetail = ({ selectedRecipe, open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="recipe-modal-title"
      aria-describedby="recipe-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Typography
              variant="h4"
              id="recipe-modal-title"
              gutterBottom
              sx={{
                color: '#f36c99',
                fontWeight: 'bold',
              }}
            >
              {selectedRecipe.title}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                backgroundColor: 'transparent',
                color: '#f36c99',
                border: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#f36c99',
                  border: 'none',
                  boxShadow: 'none',
                },
              }}
            >
              <Close />
            </Button>
          </Grid>
        </Grid>
        <RecipeImage
          src={selectedRecipe.image ? selectedRecipe.image : NoImage}
          alt={selectedRecipe.title}
        />
        <Typography variant="h6" gutterBottom>
          Bahan-bahan
        </Typography>
        <RecipeText>{selectedRecipe.ingredients}</RecipeText>
        <Typography variant="h6" gutterBottom mt={3}>
          Cara Membuat
        </Typography>
        <RecipeText>{selectedRecipe.instructions}</RecipeText>
      </Box>
    </Modal>
  );
};

export default RecipesDetail;
