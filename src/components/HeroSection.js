import React, { useEffect, useState } from 'react';
import Button from './Button';
import CustomImage from './CustomImage';
import { Link } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import RecipesDetail from '../components/RecipesDetail';
import NoImage from '../assets/png/image.jpeg';

export default function HeroSection() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [recipeDetailOpen, setRecipeDetailOpen] = useState(false);

  const handleOpenModal = (selectedRecipe) => {
    setRecipeDetailOpen(true);
    setSelectedRecipe(selectedRecipe);
  };

  // Placeholder object for missing recipes
  const placeholderRecipe = { image: NoImage };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const ensureNineItems = (recipes) => {
    const filledRecipes = [...recipes];
    while (filledRecipes.length < 9) {
      filledRecipes.push(placeholderRecipe);
    }
    return shuffleArray(filledRecipes).slice(0, 9);
  };

  useEffect(() => {
    const recipesRef = ref(database, 'recipes');
    onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
      const allRecipes = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      const limitedRecipes = ensureNineItems(allRecipes);
      setRecipes(limitedRecipes);
    });
  }, []);

  return (
    <>
      <div className="section hero" style={{ margin: '0 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <div className="typoghraphy">
              <h1 className="title">What Are We About</h1>
              <p className="info">
                Dream Kitchens adalah tempat mencari ide memasakmu, so exploring
                now!{' '}
              </p>
              <Link to="/recipes">
                <Button
                  label={
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        padding: '10px 15px',
                      }}
                    >
                      Explore Now!
                    </Typography>
                  }
                  variant="primary"
                />
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="gallery">
              {recipes.map((recipe, index) => (
                <Link
                  key={index}
                  onClick={() => {
                    recipe && handleOpenModal(recipe);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <CustomImage
                    key={index}
                    imgsrc={recipe.image ? recipe.image : NoImage}
                    pt={'90%'}
                  />
                </Link>
              ))}
            </div>
          </Grid>
        </Grid>
      </div>
      <RecipesDetail
        selectedRecipe={selectedRecipe}
        open={recipeDetailOpen}
        handleClose={() => setRecipeDetailOpen(false)}
      />
    </>
  );
}
