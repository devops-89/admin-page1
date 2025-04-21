import React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button, Divider, FormLabel, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import ImageUpload from "../../../components/ImageUpload";
import { Form, Formik } from "formik";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


const menuLinks = [
  {
    key: 1,
    link_text: 'Home',
    link_value: '/home'
  },
  {
    key: 2,
    link_text: 'About',
    link_value: '/about'
  },
  {
    key: 3,
    link_text: 'Hotel',
    link_value: '/hotel'
  },
  {
    key: 4,
    link_text: 'Flight',
    link_value: '/flight'
  },
  {
    key: 5,
    link_text: 'Cab',
    link_value: '/cab'
  },
  {
    key: 6,
    link_text: 'Contact',
    link_value: '/contact'
  },
]


const Logo = () => {

  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <Typography sx={{ fontWeight: 600, marginBottom: "25px" }}>
            Update Logo
          </Typography>
          <Formik>
            <Form>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <ImageUpload field_name="Logo" />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <ImageUpload field_name="Favicon" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormLabel
                    htmlFor="alt-text"
                    sx={{
                      fontWeight: 500,
                      color: "var(--black-color)",
                      fontSize: "18px",
                    }}
                  >
                    Alt Text
                  </FormLabel>
                  <TextField
                    id="alt-text"
                    variant="outlined"
                    placeholder="Enter Alt Text"
                    fullWidth
                    required
                    sx={{
                      marginTop: "15px",
                      color: "var(--black-color)",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--orange-color)",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 8 }} container>
                  <Grid size={{xs:12, sm:12, md:5}}>
                    <FormLabel
                      htmlFor="menu-text"
                      sx={{
                        fontWeight: 500,
                        color: "var(--black-color)",
                        fontSize: "18px",
                      }}
                    >
                      Menu
                    </FormLabel>
                    <TextField
                      id="menu-text"
                      variant="outlined"
                      placeholder="Enter Menu Text"
                      fullWidth
                      required
                      sx={{
                        marginTop: "15px",
                        color: "var(--black-color)",
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "var(--orange-color)",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:12, md:5}}>
                    <FormLabel
                      htmlFor="menu-link"
                      sx={{
                        fontWeight: 500,
                        color: "var(--black-color)",
                        fontSize: "18px",
                      }}
                    >
                      Menu Link
                    </FormLabel>
                    <TextField
                      id="menu-link"
                      variant="outlined"
                      placeholder="Menu Link"
                      fullWidth
                      required
                      sx={{
                        marginTop: "15px",
                        color: "var(--black-color)",
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "var(--orange-color)",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:12, md:2}} sx={{paddingTop:'40px'}}>
                    <Button sx={{ backgroundColor: 'var(--orange-color)', height:"56px" }}><AddIcon sx={{ color: 'var(--white-color)' }} /></Button>
                  </Grid>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                  <FormLabel
                    htmlFor="alt-text"
                    sx={{
                      fontWeight: 500,
                      color: "var(--black-color)",
                      fontSize: "18px",
                    }}
                  >
                    Menu Items
                  </FormLabel>
                  <Box sx={{overflowY:'scroll', maxHeight:"200px"}}>
                  <List>
                    {menuLinks.map((menuLink, index)=>{
                        return(
                          <>
                       <ListItem key={menuLink.id}
                       secondaryAction={
                         <IconButton edge="end" aria-label="delete" color="error">
                           <DeleteIcon />
                         </IconButton>
                       }
                     >
                       <ListItemText
                         primary={menuLink.link_text}
                         secondary={menuLink ? menuLink.link_value : null}
                       />
                     </ListItem>
                      <Divider/>
                      </>
                      )
                    })}
                  </List>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      py: 1,
                      fontSize: "16px",
                      mt: 2,
                      mb: 2,
                      backgroundColor: "var(--orange-color)",
                      "&:hover": { backgroundColor: "var(--blue-color)" },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default Logo;
