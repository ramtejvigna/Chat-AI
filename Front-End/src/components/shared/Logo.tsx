import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
const Logo = () => {
    return (
        <div
            style={{
                display: "flex",
                marginRight: "auto",
                alignItems: "center",
                gap: "15px",
            }}
        >
            <Link to={"/"}>
                <Typography
                    sx={{
                        display: { md: "block", sm: "none", xs: "none" },
                        mr: "auto",
                        fontWeight: "800",
                        textShadow: "2px 2px 20px #000",
                    }}
                >
                    <span style={{ fontSize: "30px" }}>MERN</span>-GPT
                </Typography>
            </Link>{" "}
            
        </div>
    );
};

export default Logo;