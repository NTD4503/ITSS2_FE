import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  Grid,
  Box,
  styled,
  useTheme,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { useParams } from "react-router-dom";
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

const ImageWrapper = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "0",
  paddingBottom: "20%", // 16:9 aspect ratio
  overflow: "hidden",
  marginBottom: "10px",
}));

const ImageCustom = styled("img")(() => ({
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
  const { phoneNumber: initialPhoneNumber } = useParams();
  const [data, setData] = useState([]);
  const [inputPhoneNumber, setInputPhoneNumber] = useState(initialPhoneNumber || "");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (initialPhoneNumber) {
      fetchData(initialPhoneNumber);
    }
  }, [initialPhoneNumber]);

  const fetchData = async (phoneNumber) => {
    try {
      // Fetch cart data
      const cartResponse = await axios.get(
        `https://itss2-backend.onrender.com/api/Cart/phoneNumber/${phoneNumber}`
      );
      const cartData = cartResponse.data;

      // Array to store promises for fetching package data
      const promises = cartData.map(async (item) => {
        try {
          // Fetch package data for each item
          const packageResponse = await axios.get(
            `https://itss2-backend.onrender.com/api/data_package/${item.packageID}`
          );
          const packageData = packageResponse.data;
          console.log('Package Data:', packageData); // Log Package Data
          
          // Return combined data for item
          return {
            ...item,
            packageData,
    
          };
        } catch (error) {
          console.error(`Error fetching data package details for ${item.packageID}:`, error);
          // Return default values if there's an error
          return {
            ...item,
            packageData: {
              name: "N/A",
              price: "N/A",
              cashback: "N/A",
              data_limit: "N/A",
              duration: "N/A",
            },
          };
        }
      });

      // Wait for all promises to resolve
      const resolvedData = await Promise.all(promises);
      console.log('Resolved Data:', resolvedData); // Log Resolved Data
      setData(resolvedData);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setErrorMessage("Số điện thoại chưa được đăng ký");
    }
  };

  const handlePhoneNumberChange = (event) => {
    setInputPhoneNumber(event.target.value);
  };

  const handleFetchData = () => {
    fetchData(inputPhoneNumber);
  };

  return (
    <Fragment>
      <Container className="datacart">
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[{ name: "datacart", path: "/material" }]}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3, textAlign: "center" }}>
              <Title>Lịch sử đăng ký gói cước</Title>
            </Card>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TextField
                label="Nhập số điện thoại"
                type="tel"
                value={inputPhoneNumber}
                onChange={handlePhoneNumberChange}
                variant="outlined"
                sx={{ marginRight: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleFetchData}
              >
                Tra
              </Button>
            </Box>
            {errorMessage && (
              <Typography color="error" sx={{ marginTop: 1 }}>
                {errorMessage}
              </Typography>
            )}
          </Grid>


          {data.map((item) => (
            <Grid item lg={4} md={4} sm={12} xs={12} key={item._id}>
              <Card sx={{ px: 3, py: 2, mb: 3 }}>

              {item.packageData.map((packageItem, index) => (
                  <Fragment key={index}>
                <ImageWrapper>
                  <ImageCustom
                    src="/assets/images/2.png"
                    alt={packageItem.name}
                  />
                  <OverlayText variant="h5">{packageItem.name}</OverlayText>
                </ImageWrapper>
                    <SubTitle>Price: {packageItem.price}</SubTitle>
                    <SubTitle>Cashback: {packageItem.cashback}</SubTitle>
                    <SubTitle>Data Limit: {packageItem.data_limit}</SubTitle>
                    <SubTitle>Duration: {packageItem.duration} days</SubTitle>
                  
                    <SubTitle>Expiration Date: {new Date(new Date(item.create_at).getTime() + parseInt(packageItem.duration) * 24 * 60 * 60 * 1000).toLocaleDateString()}</SubTitle>
                  </Fragment>
                ))}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default DataCart;
