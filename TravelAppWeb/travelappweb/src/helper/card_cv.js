import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

const CustomCardCV = ({ card }) => {

  return (
    <Card
      sx={{
        width: { xs: '100%', md: '280px' },
        flexShrink: 0,
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={card.personal_picture }
        alt={card.des} 
      />
      <CardContent
        sx={{
          background:
            'linear-gradient(to top, rgb(32,94,97), rgb(32,94,97), rgb(255,255,255) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      >
        <Typography variant="h5" style={{ color: '#fff' }}>
          {card.organizer_name}
        </Typography>
        <Typography variant="body2" style={{ color: '#fff' }}>
          {card.company_name}
        </Typography>
        <Typography
          variant="body2"
          style={{ display: 'flex', alignItems: 'center', color: '#fff' }}
        >
          <LocationOnRoundedIcon sx={{ marginRight: 1 }} />
          {card.location}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCardCV;
