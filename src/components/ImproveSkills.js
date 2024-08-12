import * as React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import { Login } from '@mui/icons-material';
import { Grid } from '@mui/material';

export default function ImproveSkills() {
  const list = [
    'Learn new recipies',
    'Experiment with food',
    'Write your own recipies',
  ];

  return (
    <Grid
      container
      className="section improve-skills"
      sx={{
        margin: '0',
      }}
    >
      <Grid item xs={12} md={6} className="col img">
        <img src="/img/img_10.jpg" alt="" />
      </Grid>
      <Grid item xs={12} md={6} className="col typography">
        <h1 className="title">Improve your Culinary skill</h1>
        {list.map((item, index) => (
          <p className="skill-item" key={index}>
            {item}
          </p>
        ))}
        <Link to="/signup">
          <Button variant="transparent" label="Sign Up Now!" icon={<Login />} />
        </Link>
      </Grid>
    </Grid>
  );
}
