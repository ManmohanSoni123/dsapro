import React from "react";
import { Card, CardActionArea, CardMedia } from "@mui/material";

function Cards(props) {
  console.log(props.item.Problem);
  return (
    <div>
      {/* <Card>
        <CardActionArea>
            <CardMedia>
                component="img",
                image="focus.png"
            </CardMedia>
        </CardActionArea>
      </Card> */}
      <h1>{props.item.Topic}</h1>
    </div>
  );
}

export default Cards;
