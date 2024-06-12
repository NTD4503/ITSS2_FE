import {
    Card,
    Grid,
    Box,
    styled,
    useTheme,
    Button,
} from "@mui/material";
import { Fragment } from "react";
import { Breadcrumb } from "app/components";
import { topBarHeight } from "app/utils/constant";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";  // Ensure React is imported to use hooks

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

    const data = [1];

    const handleRegisterClick = () => {
        alert("Đăng ký thành công");
        navigate("/datacart");
    };

    return (
        <Fragment>
            <Container className="datadetail">
                <Box className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[{ name: "datadetail", path: "/material" }]}
                    />
                </Box>

                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card sx={{ px: 3, py: 2, mb: 3, textAlign: "center" }}>
                            <Title>HUST1N</Title>
                        </Card>
                    </Grid>

                    {data.map((item, index) => (
                        <Grid item lg={12} md={12} sm={12} xs={12} key={index}>
                            <GrayBackgroundCard>
                                <Card sx={{ px: 3, py: 3, mb: 0 }}>
                                    <Title>Number: 401</Title>
                                    <SubTitle>Status:</SubTitle>
                                    <SubTitle>Type:</SubTitle>
                                    <SubTitle>Description: </SubTitle>
                                </Card>
                            </GrayBackgroundCard>
                        </Grid>
                    ))}
                    
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
        </Fragment>
    );
};


export default DataDetail;
