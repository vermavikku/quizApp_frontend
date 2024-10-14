import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f5f5f5",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        Sorry, page not found!
      </Typography>

      <Typography sx={{ color: "text.secondary", mb: 4 }}>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
        mistyped the URL? Be sure to check your spelling.
      </Typography>

      <Box
        component="img"
        src="/assets/img/404-page.jpg"
        sx={{
          width: 320,
          height: "auto",
          my: { xs: 5, sm: 10 },
        }}
      />

      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 2 }}
      >
        Go to home
      </Button>
    </Container>
  );
}
