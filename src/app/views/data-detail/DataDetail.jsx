import {
  Card,
  Grid,
  Box,
  styled,
  useTheme,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Breadcrumb } from "app/components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Title = styled("div")(() => ({
  fontSize: "2rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const SubTitle = styled("div")(({ theme }) => ({
  fontSize: "0.875rem",
  color: "black",
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

const GrayBackgroundCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const DataDetail = () => {
  const { palette } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data for ID: ${id}`);
        const response = await axios.get(`https://itss2-backend.onrender.com/api/data_package/${id}`);
        console.log('Data fetched:', response.data);
        setData(response.data[0]); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleRegisterClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneNumberSubmit = async () => {
    try {
      console.log(`Checking phone number: ${phoneNumber}`);
      const userResponse = await axios.get(`https://itss2-backend.onrender.com/api/user/phone/${phoneNumber}`);
      console.log('User response:', userResponse.data);

      if (!userResponse.data) {
        setErrorMessage("Số điện thoại chưa được đăng ký");
      } else {
        console.log('User found:', userResponse.data);

       
        const currentDate = new Date().toISOString();

        
        const cartData = {
          phoneNumber: phoneNumber,
          packageID: data._id, 
          create_at: currentDate, 
        };

     
        const cartResponse = await axios.post('https://itss2-backend.onrender.com/api/Cart', cartData);
        console.log('Cart response:', cartResponse.data);

        alert("Đăng ký thành công");
        handleClose();
      }
    } catch (error) {
      console.error("Error checking phone number", error);
      setErrorMessage("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error loading data</div>;
  }

  return (
    <Fragment>
      <Container className="datadetail">
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[{ name: "Danh sách gói cước", path: "/data" }]}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3, textAlign: "center" }}>
              <Title>{data.name}</Title>
            </Card>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <GrayBackgroundCard>
              <Card sx={{ px: 3, py: 3, mb: 0 }}>
              <SubTitle>Giá cước: {data.price} đ/ {data.duration}ngày </SubTitle>
                <SubTitle>Hoàn tiền: {data.cashback} đ</SubTitle>
                <SubTitle>Lưu lượng: {data.data_limit}</SubTitle>
                <SubTitle>Thời gian: {data.duration} ngày</SubTitle>
                <SubTitle>Ưu đãi: {data.description}</SubTitle>
              </Card>
            </GrayBackgroundCard>
          </Grid>
          
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3, textAlign: "center" }}>
              <BoxCustom>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={handleRegisterClick}
                >
                  Đăng ký
                </StyledButton>
              </BoxCustom>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nhập số điện thoại</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng nhập số điện thoại để kiểm tra đăng ký.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Số điện thoại"
            type="tel"
            fullWidth
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handlePhoneNumberSubmit} color="primary">
            Đăng ký
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DataDetail;
