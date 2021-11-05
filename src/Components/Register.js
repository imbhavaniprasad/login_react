import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { auth, createUserWithEmailAndPassword, firestore } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import "./Login.css"
import { TextField } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user] = useAuthState(auth);
    const history = useHistory();

    useEffect(() => {
        if (user) {
            createUserDocument(user, name);
            history.push("/dashboard");
            console.log(JSON.stringify(user.uid));
        }
    }, [user]);
    const createUserDocument = async (user, name) => {
        if (!user) return;
        const userRef = firestore.doc(`users/${user.uid}`);
        const snapshot = await userRef.get();
        // if (!snapshot.exists) {
        //     const  email  = user;
        //     const  displayName  = name;
        // }
        try {
            userRef.set({
                displayName: name,
                email: user.email,
                createdAt: new Date(),
            })
        }
        catch (error) {
            console.log("Error is", error);
        }
    };
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense" style={{ backgroundColor: '#2E3B55' }}>
                        <Typography variant="h6" color="inherit">
                            Jeevamrut
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box className="login">
                <Card className="login__container">
                    <CardContent className="cardcontent">
                        <TextField margin="dense" fullWidth
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Your Name"
                        />
                        <TextField margin="dense" fullWidth
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail Address"
                        />
                        <TextField fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </CardContent>
                    <CardActions className="actions" style={{ display: 'flex', flexDirection: 'column' }}>
                        <Button variant="contained"
                            onClick={() => createUserWithEmailAndPassword(email, password, name)}
                        >
                            SignUp
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </div>
    );
}
export default Register;