import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { Grid } from "@mui/material";
function Cards(props) {
   return (
    <div style={{ margin: "2%" }}>
      <CardActionArea
        sx={[
          {
            width: 230,
            height: 300,
            "&:hover": {
              boxShadow: "0 6px 12px 0 #263238",
              transform: "scale(1.1)",
            },
          },
        ]}
      onClick={() => {
         <Navigate to="/problems"/>
      }}
      >
        <Card
          sx={[
            {
              width: 230,
              height: 300,
              backgroundColor: "#e0e0e0",
              cursor: "pointer",
            },
          ]}
        >
          <CardMedia
            sx={[
              {
                width: 180,
                height: 180,
                margin: "auto auto 5px auto",
              },
            ]}
            component="png"
            image={require("./structureddata.png")}
          />
          <CardContent>
            <Typography variant="h5">{props.Topic}</Typography>
            {/* <Typography variant="body1">Kills</Typography>
            <Typography variant="body2" color="red">
              Play!
            </Typography> */}
          </CardContent>
        </Card>
      </CardActionArea>
    </div>
  );
}

// function Cards(props) {
//   console.log(props.item.Problem);
//   return (
//     <div>
//       {/* <Card>
//         <CardActionArea>
//             <CardMedia>
//                 component="img",
//                 image="focus.png"
//             </CardMedia>
//         </CardActionArea>
//       </Card> */}
//       <h1>{props.item.Topic}</h1>
//     </div>
//   );
// }

export default Cards;
