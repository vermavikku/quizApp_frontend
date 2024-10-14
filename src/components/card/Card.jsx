import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styled component to add a fixed size and a border when the card is selected
const StyledCard = styled(Card)(({ theme, selected }) => ({
  cursor: 'pointer',
  border: selected ? `2px solid green` : '2px solid transparent',
  transition: 'border-color 0.3s',
  width: '300px', // Fixed width
  height: '200px', // Fixed height
  overflow: 'hidden', // Prevent content overflow
  display: 'flex', // To align content inside the card
  flexDirection: 'column', // To maintain title and description alignment
  justifyContent: 'center', // Center content vertically
  '&:hover': {
    border: `2px solid ${theme.palette.primary.light}`,
  },
}));

const SelectableCard = ({ title, description, onSelect, selected }) => {
  return (
    <StyledCard selected={selected} onClick={onSelect}>
      <CardContent>
        <Typography variant="h6" align="center">{title}</Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default SelectableCard;
