import { Button as MaterialButton, Box } from '@mui/material';

const getButtonStyles = (variant) => {
  switch (variant) {
    case 'primary':
      return {
        color: '#F9EBEA',
        backgroundColor: '#F36C99',
        border: '1px solid #F36C99',
        borderRadius: '6px',
        padding: '10px',
        boxShadow: 'none',
        textTransform: 'none',
        height: 'fit-content',
        '&:hover': {
          backgroundColor: '#F9EBEA',
          color: '#F36C99',
        },
      };
    case 'secondary':
      return {
        color: '#F36C99',
        backgroundColor: '#F9EBEA',
        border: '1px solid #F36C99',
        borderRadius: '6px',
        padding: '10px',
        boxShadow: 'none',
        textTransform: 'none',
        height: 'fit-content',
        '&:hover': {
          backgroundColor: '#F36C99',
          color: '#F9EBEA',
        },
      };

    case 'transparent':
      return {
        color: '#F36C99',
        backgroundColor: 'transparent',
        border: '1px solid #F36C99',
        borderRadius: '6px',
        padding: '10px',
        boxShadow: 'none',
        textTransform: 'none',
        height: 'fit-content',
        '&:hover': {
          backgroundColor: '#F36C99',
          color: '#F9EBEA',
        },
      };
    default:
      return {};
  }
};

const Button = ({ variant, onClick, label, icon, ...props }) => {
  return (
    <MaterialButton
      {...props}
      variant="contained"
      size="medium"
      onClick={onClick}
      sx={{ ...getButtonStyles(variant), ...props.sx }}
    >
      {icon && (
        <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>{icon}</Box>
      )}
      <Box>{label}</Box>
    </MaterialButton>
  );
};

export default Button;
