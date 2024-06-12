import {
    Card,
    Grid,
    Box,
    styled,
    useTheme,
    Button,
    Typography,
  } from "@mui/material";
  import { Fragment, useState, useEffect } from "react";
  import { Breadcrumb } from "app/components";
  import { topBarHeight } from "app/utils/constant";
  import { Link } from "react-router-dom";
  
  // Mock database
  const mockDatabase = [
    {
      id: 1,
      image: "/assets/images/2.png",
      title: "HUST1N",
      location: "Toa nha dong loi",
      numOfRooms: "14A12",
    },
    {
      id: 2,
      image: "/assets/images/2.png",
      title: "HUST2N",
      location: "Toa nha tay loi",
      numOfRooms: "12B03",
    },

  ];
  
  const Title = styled("div")(() => ({
    fontSize: "2rem",
    fontWeight: "500",
    marginRight: ".5rem",
    textTransform: "capitalize",
  }));
  
  const SubTitle = styled("div")(({ theme }) => ({
    fontSize: "1rem",
    color: "black",
    padding: "0.15rem",
  }));
  
  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  
  const BoxCustom = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: "100%",
    paddingLeft: 24,
  }));
  
  const SearchContainer = styled("div")(({ theme }) => ({
    zIndex: 9,
    width: "60%",
    display: "flex",
    alignItems: "center",
    height: topBarHeight,
    background: "#fff",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 24%)",
    color: theme.palette.text.primary,
    "&::placeholder": {
      color: theme.palette.text.primary,
    },
  }));
  
  const SearchInput = styled("input")(({ theme }) => ({
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    paddingLeft: "20px",
    height: "calc(100% - 5px)",
    background: "#fff",
    color: theme.palette.text.primary,
    "&::placeholder": { color: theme.palette.text.primary },
  }));
  
  const StyledButton = styled(Button)(({ theme, buttonColor }) => ({
    margin: theme.spacing(1),
    backgroundColor: buttonColor || theme.palette.primary.main,
    "&:hover": {
      backgroundColor: buttonColor ? buttonColor : theme.palette.primary.dark,
    },
  }));
  
  const ImageWrapper = styled(Box)(() => ({
    position: "relative",
    width: "100%",
    height: "0",
    paddingBottom: "20%", // 16:9 aspect ratio
    overflow: "hidden",
    marginBottom: "10px",
  }));
  
  const ImgaeCustom = styled("img")(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "90%",
    objectFit: "cover",
    objectPosition: "center",
  }));
  
  const OverlayText = styled(Typography)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
  }));
  
  const DataCart = () => {
    const { palette } = useTheme();
    const textColor = palette.text.primary;
  
    const [data, setData] = useState([]);
  
    useEffect(() => {
      // Fetch data from mock database
      setData(mockDatabase);
    }, []);
  
    return (
      <Fragment>
        <Container className="datacard">
          <Box className="breadcrumb">
            <Breadcrumb
              routeSegments={[{ name: "datacart", path: "/material" }]}
            />
          </Box>
  
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card sx={{ px: 3, py: 2, mb: 3, textAlign: "center" }}>
                <Title>Các gói data đã đăng ký</Title>
              </Card>
            </Grid>
  
            {data.map((item) => {
              let buttonColor = "primary";
              let buttonText = "Đăng ký";
  
              if (item.id === 1) {
                buttonColor = "#CC3300";
                buttonText = "Đăng ký thành công";
              } else if (item.id === 2) {
                buttonColor = "silver";
                buttonText = "Đang chờ phê duyệt";
              }
  
              return (
                <Grid item lg={4} md={4} sm={12} xs={12} key={item.id}>
                  <Link to={`/data/${item.id}`}>
                    <Card sx={{ px: 3, py: 2, mb: 3 }}>
                      <ImageWrapper>
                        <ImgaeCustom src={item.image} alt={item.title} />
                        <OverlayText variant="h4">{item.title}</OverlayText>
                      </ImageWrapper>
                      <SubTitle>Location: {item.location}</SubTitle>
                      <SubTitle>Num of rooms: {item.numOfRooms}</SubTitle>
                      <BoxCustom>
                        <StyledButton variant="contained" buttonColor={buttonColor}>
                          {buttonText}
                        </StyledButton>
                      </BoxCustom>
                    </Card>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Fragment>
    );
  };
  
  export default DataCart;
  