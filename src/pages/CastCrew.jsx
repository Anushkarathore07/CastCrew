import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, CircularProgress, Container, Grid, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const API_KEY = "d150cf6a0e97924e7aea0928928e8676"; // Replace with your actual TMDB API key

const CastCrew = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCastCrew = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
        setCast(response.data.cast);
        setCrew(response.data.crew);
      } catch (error) {
        console.error("Error fetching cast and crew:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCastCrew();
  }, [id]);

  if (loading) return <CircularProgress style={{ margin: "20px auto", display: "block" }} />;

  return (
    <Container maxWidth="lg" style={{ marginTop: "30px" }}>
      <IconButton
        component={Link}
        to="/"
        color="primary"
        sx={{ position: "absolute", top: 20, left: 20 }}
      >
        <HomeIcon fontSize="large" />
      </IconButton>
      {/* Cast Section */}
      <Typography variant="h4" align="center" gutterBottom>Top Cast</Typography>
      <Grid container spacing={3} justifyContent="center">
        {[0, 1, 2].map((col) => (
          <Grid item xs={12} sm={6} md={4} key={col}>
            {cast
              .filter((_, index) => index % 3 === col) // Distribute actors evenly across three columns
              .map((actor) => (
                <Box key={actor.id} display="flex" alignItems="center" gap="15px" marginBottom="15px">
                  <Avatar
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    sx={{ width: 70, height: 70 }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">{actor.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{actor.character}</Typography>
                  </Box>
                </Box>
              ))}
          </Grid>
        ))}
      </Grid>

      {/* Crew Section */}
      <Typography variant="h4" align="center" style={{ marginTop: "40px" }}>Crew</Typography>
      <Grid container spacing={3} justifyContent="center">
        {[0, 1, 2].map((col) => (
          <Grid item xs={12} sm={6} md={4} key={col}>
            {crew
              .filter((_, index) => index % 3 === col) // Distribute crew evenly across three columns
              .map((member) => (
                <Box key={member.id} display="flex" alignItems="center" gap="15px" marginBottom="15px">
                  <Avatar
                    src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                    alt={member.name}
                    sx={{ width: 70, height: 70 }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">{member.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{member.job}</Typography>
                  </Box>
                </Box>
              ))}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CastCrew;
