/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  TextField,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import RecipesDetail from '../components/RecipesDetail';
import NoImage from '../assets/png/image.jpeg';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipeDetailOpen, setRecipeDetailOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({});

  const handleOpenModal = (selectedRecipe) => {
    setRecipeDetailOpen(true);
    setSelectedRecipe(selectedRecipe);
  };

  useEffect(() => {
    const recipesRef = ref(database, 'recipes');
    onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
      const allRecipes = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setRecipes(allRecipes);
      setFilteredRecipes(allRecipes);
    });
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = recipes.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercasedFilter) ||
        item.description.toLowerCase().includes(lowercasedFilter) ||
        item.ingredients.toLowerCase().includes(lowercasedFilter),
    );
    setFilteredRecipes(filteredData);
  }, [searchTerm, recipes]);

  return (
    <>
      <Container
        sx={{
          margin: '20px auto',
          padding: '20px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{ color: '#999999', fontWeight: '500', display: 'flex' }}
          gutterBottom
        >
          <Box sx={{ color: '#F36C99', marginRight: '20px' }}>🍽️</Box>
          Semua <span style={{ color: '#F36C99', fontWeight: 700 }}>Resep</span>
        </Typography>
        <TextField
          label="Cari Resep"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#043726',
              },
              '&:hover fieldset': {
                borderColor: '#043726',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#043726',
                border: '1px solid',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#043726',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#043726',
            },
          }}
        />
        <Grid container spacing={2}>
          {filteredRecipes.map((recipe) => {
            const renderDescription = `${recipe.description.substring(0, 60)}...`;
            return (
              <Grid item xs={12} md={4} key={recipe.id}>
                <Card
                  onClick={() => handleOpenModal(recipe)}
                  sx={{
                    cursor: 'pointer',
                    borderColor: '#999999',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    '&:hover': {
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    },
                    height: 400,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CardMedia
                        component="img"
                        image={recipe.image ? recipe.image : NoImage}
                        alt={recipe.title}
                        sx={{
                          height: 250,
                          objectFit: 'cover',
                          borderRadius: 1,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1, color: '#F36C99' }}>
                        <Typography
                          variant="h6"
                          sx={{ color: '#01120C', fontWeight: '500' }}
                          gutterBottom
                        >
                          {recipe.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#01120C' }}>
                          {renderDescription}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ marginTop: 'auto', color: '#F36C99' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#F36C99',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <AccountCircle
                            sx={{
                              color: '#F36C99',
                            }}
                          />
                          <Box sx={{ marginLeft: 1, color: '#01120C' }}>
                            {recipe.createdBy}
                          </Box>
                        </Typography>
                      </CardActions>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <RecipesDetail
        selectedRecipe={selectedRecipe}
        open={recipeDetailOpen}
        handleClose={() => setRecipeDetailOpen(false)}
      />
    </>
  );
};

export default Recipes;
