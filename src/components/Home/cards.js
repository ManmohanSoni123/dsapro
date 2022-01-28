import React from 'react';
import { Card,CardActionArea,CardMedia } from '@mui/material';

function Cards() {
  return <div>
      <Card>
        <CardActionArea>
            <CardMedia>
                component="img",
                image="focus.png"
            </CardMedia>
        </CardActionArea>
      </Card>
  </div>;
}

export default Cards;
