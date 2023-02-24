/* eslint-disable no-useless-computed-key */
import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useHistory, useParams } from "react-router-dom";
//MaterialUI
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Create() {
  const history = useHistory();
  const { id } = useParams();
  const initialFormData = Object.freeze({
    id: "",
    title: "",
    slug: "",
    description: "",
    alternativetitle: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    axiosInstance.get("admin/edit/postdetail/" + id).then((res) => {
      updateFormData({
        ...formData,
        ["title"]: res.data.title,
        ["description"]: res.data.description,
        ["status"]: res.data.status,
        ["rating"]: res.data.rating,
        ["artist"]: res.data.artist,
        ["author"]: res.data.author,
        ["image"]: res.data.image,
        ["image_url"]: res.data.image_url,
        ["slug"]: res.data.slug,
        ["alternativetitle"]: res.data.alternativetitle,
      });
      console.log(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateFormData]);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance.put(`admin/edit/` + id + "/", {
      id: id,
      title: formData.title,
      slug: formData.slug,
      status: formData.status,
      author: formData.author,
      artist: formData.artist,
      rating: formData.rating,
      image: formData.image,
      image_url: formData.image_url,
      alternativetitle: formData.alternativetitle,
    });
    history.push({
      pathname: "/admin/comics/",
    });
    window.location.reload();
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Post
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Post Title"
                name="title"
                autoComplete="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Post Description"
                name="description"
                autoComplete="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={8}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="slug"
                label="slug"
                name="slug"
                autoComplete="slug"
                value={formData.slug}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="author"
                label="author"
                name="author"
                autoComplete="author"
                value={formData.author}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="artist"
                label="artist"
                name="artist"
                autoComplete="artist"
                value={formData.artist}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Alternativetitle"
                label="alternativetitle"
                name="alternativetitle"
                autoComplete="alternativetitle"
                value={formData.alternativetitle}
                onChange={handleChange}
                multiline
                rows={8}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="status"
                label="status"
                name="status"
                autoComplete="status"
                value={formData.status}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="rating"
                label="rating"
                name="rating"
                autoComplete="rating"
                value={formData.rating}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="image"
                label="image"
                name="image"
                autoComplete="image"
                value={formData.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="image_url"
                label="image_url"
                name="image_url"
                autoComplete="image_url"
                value={formData.image_url}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Update Post
          </Button>
        </form>
      </div>
    </Container>
  );
}
