import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../utils/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Link,
  Alert,
} from "@mui/material";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Email validation
    const emailRegex = /@/;
    if (!emailRegex.test(email)) {
      setError("올바른 이메일 형식이 아닙니다.");
      return;
    }

    try {
      if (password !== secPassword) {
        throw new Error("패스워드가 일치하지 않습니다. 다시 확인해주세요.");
      }
      const response = await api.post("/user", { name, email, password });
      if (response.status === 200) {
        navigate("/login");
      } else {
        throw new Error(response.data.error || "Registration failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ width: "100%", mt: 2, mb: 1 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="이름"
            name="name"
            autoComplete="given-name"
            autoFocus
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="패스워드"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="secPassword"
            label="패스워드 확인"
            type="password"
            id="secPassword"
            autoComplete="new-password"
            onChange={(event) => setSecPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            회원가입
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                이미 계정이 있으신가요? 로그인
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
