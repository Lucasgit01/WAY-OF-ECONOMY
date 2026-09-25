import type React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Login.css";
import escudo from "../assets/images/Cyber Security Shield Flat Style.png"
import animatedVector from "../assets/images/Way Of Economy - login image.png"
import { Button } from "../ui/SubmitButton";
import { TextInput } from "../ui/TextField";
import { PswdInput } from "../ui/PasswordInput";
import { useState } from "react";
import { ControllerLogin } from "../../data/controllers/login.controller";
import { AlertCircle, LogInIcon } from "lucide-react";
import toastTrigger from "../lib/toastTrigger";
import { useAuthStore } from "../../hooks/authStore";

export const LoginForm = () => {
    const [email, setEmail] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [loading, setLoading] = useState<boolean>()
    const [error, setError] = useState<string>('')
    const [disable, setDisabled] = useState<boolean>()
    const setAuthStore = useAuthStore((state) => state.setAuthData);
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setDisabled(true);
        try {
            const emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (!emailTest.test(email)) return setError(`Insira um email válido.\nEX: seuendereco@provedor.com`);
            if (!pass) return setError("Nenhuma senha informada.");

            setError("")

            const instanceValidator = new ControllerLogin(email, pass)
            const result = await instanceValidator.read();
            setAuthStore({
                ...result
            })
            toastTrigger.success(
                `Olá, ${result.name}! \nBem vindo de volta 👋`, {
                position: "bottom-right",
                duration: 5000
            })
            navigate("/home")
        } catch (error) {
            toastTrigger.error((error as Record<string, string>).message, {
                position: "top-center",
                duration: 5000,
            })
        } finally {
            setTimeout(() => {
                setDisabled(false);
                setLoading(false)
            }, 2000)
        }

    }
    return (
        <div className="background">
            <section className="section">
                <div className="insert-division">
                    <img className="top-image" src={escudo} width={100} /><br />
                    {error && <div className="error"><AlertCircle /><p className="msg-error"> {error}</p></div>}
                    <form className="form" onSubmit={handleLogin}>
                        <TextInput onChange={(e) => setEmail(e.target.value)} />
                        <br/>
                        <PswdInput onChange={(e) => setPass(e.target.value)} />
                        <br />
                        <Button
                            title={"Entrar"}
                            requested={loading!}
                            props={{ disabled: disable }}
                            Icon={LogInIcon}

                        />
                        <br />
                    </form>
                </div>
                <div className="background-division">
                    <img src={animatedVector} className="image-login" />
                </div>
                {/* <footer className="description">Faça o login para acessar a Área segura administrativa.</footer> */}
            </section>
        </div>
    )
}