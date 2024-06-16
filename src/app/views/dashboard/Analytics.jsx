import {
  Card,
  Grid,
  Box,
  styled,
  useTheme,
  IconButton,
  Icon,
  Button,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Breadcrumb } from "app/components";
import { topBarHeight } from "app/utils/constant";
import { Link } from "react-router-dom";
import axios from "axios";

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

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
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

const Analytics = () => {
  const { palette } = useTheme();
  const textColor = palette.text.primary;
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://itss2-backend.onrender.com/api/data_package');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <Fragment>
      <Container className="data">
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[{ name: "data", path: "/material" }]}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3, textAlign: "center" }}>
              <Title>Gói Cước</Title>
            </Card>
          </Grid>

          <BoxCustom>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <IconButton sx={{ mx: 2, verticalAlign: "middle" }}>
                <Icon sx={{ color: textColor }}>close</Icon>
              </IconButton>
            </SearchContainer>
          </BoxCustom>

          <BoxCustom>
            <TextField
              select
              label="Sort by price"
              value={sortOrder}
              onChange={handleSortChange}
              variant="outlined"
              size="small"
              sx={{ width: '200px', margin: '10px' }}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </TextField>
          </BoxCustom>

          {sortedData.map((item, index) => (
            <Grid item lg={4} md={4} sm={12} xs={12} key={index}>
              <Link to={`/data/${item._id}`}>
                <Card sx={{ px: 3, py: 2, mb: 3 }}>
                  <ImageWrapper>
                    <ImgaeCustom
                      src="/assets/images/2.png"
                      alt={item.name}
                    />
                    <OverlayText variant="h5">{item.name}</OverlayText>
                  </ImageWrapper>
                  <SubTitle>Price: {item.price}</SubTitle>
                  <SubTitle>Data limit: {item.data_limit}</SubTitle>
                  <SubTitle>Duration: {item.duration} days</SubTitle>
                  <BoxCustom>
                    <StyledButton variant="contained" color="primary">
                      Đăng ký
                    </StyledButton>
                  </BoxCustom>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Analytics;
