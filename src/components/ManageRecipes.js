import React, { useContext, useState, useEffect } from 'react';
import RecipeModal from './RecipeModal';
import {
  ref,
  set,
  push,
  onValue,
  remove,
  update,
  get,
} from 'firebase/database';
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import styled from '@emotion/styled';
import { database, storage } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';
import imageCompression from 'browser-image-compression';
import { Grid } from '@mui/material';
import Button from '../components/Button';
import { AddCircle, ModeEdit, Delete } from '@mui/icons-material';
import NoImage from '../assets/png/image.jpeg';

const Container = styled.div`
  padding-inline: 10vw;
`;

const validateAndCompressImage = async (imageFile) => {
  const validImageTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  if (!validImageTypes.includes(imageFile.type)) {
    throw new Error(
      'Invalid image format. Please upload a WEBP, JPEG, PNG, or GIF image.',
    );
  }

  const options = {
    maxWidthOrHeight: 854,
    maxSizeMB: 1,
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    throw new Error('Image compression failed: ' + error.message);
  }
};

const ManageRecipes = () => {
  const currentUser = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: '',
    description: '',
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (currentUser && currentUser.user.uid) {
      const userRef = ref(database, `users/${currentUser.user.uid}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          setUsername(snapshot.val().username);
        }
      });

      const recipesRef = ref(database, 'recipes');
      onValue(recipesRef, (snapshot) => {
        const data = snapshot.val();
        const userRecipes = [];
        for (let id in data) {
          if (data[id].createdBy === username) {
            userRecipes.push({ id, ...data[id] });
          }
        }
        setRecipes(userRecipes);
      });
    }
  }, [currentUser, username]);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    if (!currentUser || !currentUser.user.uid) {
      console.error('User is not authenticated');
      return;
    }

    const newRecipeRef = push(ref(database, 'recipes'));

    if (newRecipe.imageFile) {
      try {
        const compressedFile = await validateAndCompressImage(
          newRecipe.imageFile,
        );
        const imageName = newRecipeRef.key; // Use the recipe ID as the image name
        const storageRef = sRef(storage, `images/${imageName}`);
        const uploadTask = uploadBytesResumable(storageRef, compressedFile);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            setUploadProgress(progress);
          },
          (error) => {
            console.error('Image upload failed:', error);
          },
          async () => {
            const downloadURL = await getDownloadURL(storageRef);

            await set(newRecipeRef, {
              ...newRecipe,
              createdBy: username,
              image: downloadURL,
            });

            setNewRecipe({
              title: '',
              ingredients: '',
              instructions: '',
              image: '',
              description: '',
            });
            setUploadProgress(0);
            setIsModalOpen(false);
          },
        );
      } catch (error) {
        console.error(error.message);
      }
    } else {
      await set(newRecipeRef, {
        ...newRecipe,
        createdBy: username,
      });

      setNewRecipe({
        title: '',
        ingredients: '',
        instructions: '',
        image: '',
        description: '',
      });
      setIsModalOpen(false);
    }
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setNewRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleDeleteRecipe = async (recipeId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this recipe?',
    );
    if (confirmDelete) {
      const recipeRef = ref(database, `recipes/${recipeId}`);
      const recipeSnapshot = await get(recipeRef);
      const recipeData = recipeSnapshot.val();

      if (recipeData.image) {
        const imageRef = sRef(storage, recipeData.image);
        await deleteObject(imageRef);
      }

      await remove(recipeRef);
    }
  };

  const handleUpdateRecipe = async (e) => {
    e.preventDefault();
    if (!currentUser || !currentUser.user.uid) {
      console.error('User is not authenticated');
      return;
    }

    const recipeRef = ref(database, `recipes/${editingRecipe.id}`);

    if (newRecipe.imageFile) {
      try {
        const compressedFile = await validateAndCompressImage(
          newRecipe.imageFile,
        );
        const imageName = editingRecipe.id; // Use the recipe ID as the image name
        const storageRef = sRef(storage, `images/${imageName}`);

        // Check if the file already exists
        try {
          const existingFileURL = await getDownloadURL(storageRef);
          // If the file exists, delete it
          const existingFileRef = sRef(storage, existingFileURL);
          await deleteObject(existingFileRef);
        } catch (error) {
          if (error.code !== 'storage/object-not-found') {
            console.error('Error checking existing file:', error);
            return;
          }
        }

        const uploadTask = uploadBytesResumable(storageRef, compressedFile);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            setUploadProgress(progress);
          },
          (error) => {
            console.error('Image upload failed:', error);
          },
          async () => {
            const downloadURL = await getDownloadURL(storageRef);

            await update(recipeRef, {
              ...newRecipe,
              createdBy: username,
              image: downloadURL,
            });

            setNewRecipe({
              title: '',
              ingredients: '',
              instructions: '',
              image: '',
              description: '',
            });
            setEditingRecipe(null);
            setUploadProgress(0);
            setIsModalOpen(false);
          },
        );
      } catch (error) {
        console.error(error.message);
      }
    } else {
      await update(recipeRef, {
        ...newRecipe,
        createdBy: username,
      });

      setNewRecipe({
        title: '',
        ingredients: '',
        instructions: '',
        image: '',
        description: '',
      });
      setEditingRecipe(null);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Container>
        <Grid container spacing={2} my={3}>
          <Grid item xs={6} md={8}>
            <h2>Resep-resep kamu</h2>
          </Grid>
          <Grid item xs={6} md={4} display="flex" justifyContent="right">
            <Button
              variant="primary"
              size="medium"
              icon={<AddCircle />}
              onClick={() => setIsModalOpen(true)}
              label="Add Recipe"
            />
          </Grid>
        </Grid>
        <div>
          {recipes.length > 0 ? (
            <ul className="recipe-list">
              {recipes.map((recipe) => {
                const description = recipe.description
                  ? recipe.description.length > 50
                    ? recipe.description.substring(0, 50) + '...'
                    : recipe.description
                  : '';
                const ingredients =
                  recipe.ingredients.length > 50
                    ? recipe.ingredients.substring(0, 50) + '...'
                    : recipe.ingredients;

                const instructions =
                  recipe.instructions.length > 50
                    ? recipe.instructions.substring(0, 50) + '...'
                    : recipe.instructions;
                return (
                  <li key={recipe.id} className="recipe-item">
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3}>
                        <img
                          src={recipe.image || NoImage}
                          alt={recipe.title}
                          style={{
                            maxWidth: '100%',
                            borderRadius: '8px',
                            marginTop: '10px',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            width: '100%',
                            height: '100px',
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <h3>{recipe.title}</h3>
                        <p>
                          <span
                            style={{ fontStyle: 'italic', fontWeight: '500' }}
                          >
                            Deskripsi:{' '}
                          </span>
                          {description}
                        </p>
                        <p>
                          <span
                            style={{ fontStyle: 'italic', fontWeight: '500' }}
                          >
                            Bahan:{' '}
                          </span>
                          {ingredients}
                        </p>
                        <p>
                          <span
                            style={{ fontStyle: 'italic', fontWeight: '500' }}
                          >
                            Cara Pembuatan:{' '}
                          </span>
                          {instructions}
                        </p>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={3}
                        display="flex"
                        justifyContent="right"
                      >
                        <Button
                          variant="transparent"
                          size="medium"
                          icon={<ModeEdit />}
                          onClick={() => handleEditRecipe(recipe)}
                          label="Edit"
                          sx={{ mx: 1 }}
                        />
                        <Button
                          variant="secondary"
                          size="medium"
                          icon={<Delete />}
                          onClick={() => handleDeleteRecipe(recipe.id)}
                          label="Delete"
                        />
                      </Grid>
                    </Grid>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      </Container>
      <RecipeModal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setEditingRecipe(null);
          setNewRecipe({
            title: '',
            ingredients: '',
            instructions: '',
            image: '',
            description: '',
          });
        }}
        onSubmit={editingRecipe ? handleUpdateRecipe : handleAddRecipe}
        newRecipe={newRecipe}
        setNewRecipe={setNewRecipe}
        uploadProgress={uploadProgress}
      />
    </>
  );
};

export default ManageRecipes;
