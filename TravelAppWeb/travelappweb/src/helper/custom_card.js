import React from "react";
import { Card, CardMedia, CardContent, Typography, Rating, CardActions, Button, Box } from "@mui/material";

const CustomCard = ({ card, handleDetailsClick, handleClickRefuse }) => {
  return (
    <Card style={{backgroundColor: "var(--card-color)"}}>
      <CardMedia
        component="img"
        height="150"
        image={card.personal_picture }
        alt={card.title}
        loading="lazy"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="var(--text-color)">
          {card.organizer_name}
        </Typography>
        <Typography variant="body2" color="var(--text-color)">
          {card.company_name}
        </Typography>
        {card.rating && (
          <Rating name="read-only" value={card.rating} readOnly precision={0.5}  />
        )}
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button size="small" onClick={() => handleDetailsClick(card)} sx={{ color: 'var(--secondary-color)' }}>
            Details
          </Button>
          {handleClickRefuse && (
            <Button size="small" onClick={() => handleClickRefuse()} color="error">
              Refuse
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
