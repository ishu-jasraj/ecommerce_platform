import React, {useState, useContext} from 'react';
import { UserAuthContext } from '../../store/user-auth-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

console.log('base----',process.env.REACT_APP_BASE_URL)
console.log('base----',process.env.REACT_APP_LOGIN)

const UserAuth = () => {
    const userAuthContext = useContext(UserAuthContext);
    const navigate = useNavigate();
    const [useremail, setUseremail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const loginUrl = process.env.REACT_APP_LOGIN;
            console.log(`${process.env.REACT_APP_BASE_URL}${loginUrl}`)
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${loginUrl}`,{
                email:useremail,
                password:password
            });
            console.log(response)
            if(response.data.success){
                const token  = response?.data?.user?.token;
                if(!token){
                    alert('Invalid response from server. Please try again.');
                    return;
                }
                localStorage.setItem('token',token);

                const {name} = response.data.user;
                if(name === 'admin'){
                userAuthContext.setIsAdmin(true);
                }
                userAuthContext.setIsAuthenticated(true);
                userAuthContext.setUsername(name);
                userAuthContext.setUserpassword(password);
                navigate('/')

            }
        }catch(err){
            if(err.response){
                alert('Invalid Credentials');
                console.log(err.response?.data?.msg || 'Invalid credentials');
            }else if(err.request){
                console.log('Network error')
            }else{
                console.log('Error: ',err);
            }
        }
    }

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Login</h2>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Enter Email:</label>
                    <input 
                        type="text" 
                        value={useremail} 
                        onChange={(e) => setUseremail(e.target.value)} 
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Enter Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={styles.input}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
                <button type="submit" style={styles.button}>Sign Up</button>
            </form>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: "30px 50px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        minWidth: "300px",
        minHeight: "300px",
        marginTop: "-150px"
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
    },
    inputGroup: {
        marginBottom: "25px",
    },
    label: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        width: "100%",
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginTop: "5px",
    },
    button: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px",
        fontSize: "16px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background 0.3s",
        marginBottom: "10px",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
    },
};


export default UserAuth;