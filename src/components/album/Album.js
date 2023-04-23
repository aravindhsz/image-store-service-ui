import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddImageModal from "./AddImageModal";

export default function Album() {
  const location = useLocation();
  const [albumId, setAlbumId] = useState();
  const [albumDetails, setAlbumDetails] = useState();
  const [showAlbum, setShowAlbum] = useState(false);
  const [createImageModalOpen, toggleCreateImageModal] = useState();

  useEffect(() => {
    let pathArgs = location.pathname.split("/");
    if (pathArgs != null && pathArgs.length === 3) {
      if (pathArgs[2] !== undefined) {
        setAlbumId(pathArgs[2]);
      }
    }
  }, []);

  useEffect(() => {
    if (albumDetails !== undefined) {
      setShowAlbum(true);
      console.log(albumDetails.Name);
    } else {
      setShowAlbum(false);
    }
  }, [albumDetails]);

  const getAlbumDetails = async () => {
    setShowAlbum(false);
    console.log(albumId);
    if (albumId !== undefined) {
      const response = await axios.get("/api/album/" + albumId + "/image");
      if (response.status === 200) {
        setAlbumDetails(response.data.album);
      }
    }
  };

  const fetchImage = async (your_base64) => {
    try {
        let your_bytes = Buffer.from(your_base64, "base64");
      const imageBytes = your_bytes;
      var blob = new Blob([imageBytes], { type: "image/jpeg" });
      var imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const deleteImage = async (imageId) => {
    console.log("Deleting Image");
    if (imageId !== undefined) {
      const response = await axios.delete(
        "/api/album/" + albumId + "/image/" + imageId
      );
      if (response.status === 200) {
        getAlbumDetails();
      }
    }
  };
  const closeModal = () => {
    toggleCreateImageModal(false);
    getAlbumDetails();
  };

  useEffect(() => {
    getAlbumDetails(albumId);
  }, [albumId]);
  return (
    <>
      {createImageModalOpen && (
        <AddImageModal albumId={albumDetails.Id} closeModal={closeModal} />
      )}
      {showAlbum && (
        <>
          <Container sx={{ paddingTop: "3rem" }} maxWidth="sm">
            <Typography
              component="h3"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {albumDetails.Name}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {albumDetails.Description}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
            <Box textAlign="center">
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  toggleCreateImageModal(true);
                }}
              >
                Add Image
              </Button>
            </Box>
          </Container>
          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={4}>
              {showAlbum &&
              albumDetails.Image !== null &&
              albumDetails.Image.length !== 0
                ? albumDetails.Image.map((image) => (
                    <Grid item key={image.id} xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: 7,
                        }}
                      >
                        <CardMedia
                          component="img"
                          src={`data:image/png;base64,${image.Data}`}
                        //   src={fetchImage(image.Data)}
                          alt="img-not-found"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h4" component="h2">
                            {image.Name}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <DeleteOutlineIcon
                            onClick={() => {
                              deleteImage(image.Id);
                            }}
                            style={{ alignSelf: "right" }}
                            color="primary"
                          />
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
                : null}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}
