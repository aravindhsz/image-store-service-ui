import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import CreateAlbumModal from "./CreateAlbumModal";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// const theme = createTheme();

export default function Home() {
  const [albums, setAlbums] = React.useState([]);
  const [showAlbums, setShowAlbums] = React.useState(false);
  const [createAlbumModalOpen, setCreateAlbumModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const getAllAlbums = async () => {
    const response = await axios.get("/api/album");
    if (response.status === 200) {
      console.log(response.data);
      setAlbums(response.data.albums);
      setShowAlbums(true);
    }
  };

  const handleCloseModal = (async) => {
    setCreateAlbumModalOpen(false);
    getAllAlbums();
  };

  const viewAlbum = async (albumId) => {
    navigate("/album/" + albumId);
  };

  const deleteAlbum = async (albumId) => {
    const response =  await axios.delete("/api/album/" + albumId);
    if (response.status === 200) {
      getAllAlbums();
    }
  }

  React.useEffect(() => {
    getAllAlbums();
  }, []);

  return (
    <>
      {createAlbumModalOpen && (
        <CreateAlbumModal
          closeModal={handleCloseModal}
        />
      )}

      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Album Service
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Album Service for your Personal Needs
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
          <Box textAlign="center">
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                setCreateAlbumModalOpen(true);
              }}
            >
              {" "}
              Create Album{" "}
            </Button>
          </Box>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {showAlbums && albums !== null && albums.length !==0
            ? albums.map((album) => (
                <Grid item key={album.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: 7,
                    }}
                  >
                    {/* <CardMedia
                      component="img"
                      image="/project-image.jpeg"
                      alt="img-not-found"
                    /> */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography  variant="h4" component="h2">
                        {album.Name}
                      </Typography>
                      <Typography variant="caption" component="h5">
                        <br></br>
                        Description
                      </Typography>
                      <Typography paragraph>
                      {album.Description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          viewAlbum(album.Id);
                        }}
                      >
                        View
                      </Button>
                      <DeleteOutlineIcon onClick={() => {
                        deleteAlbum(album.Id)
                      }}  style={{alignSelf:"right"}}  color="primary"/> 
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      </Container>
    </>
  );
}
