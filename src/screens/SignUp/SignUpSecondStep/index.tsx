import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { api } from "../../../services/api";
import { BackButton } from "../../../components/BackButton";

import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle,
} from "./styles";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    };
}

export function SignUpSecondStep() {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();

    const { user } = route.params as Params;

    function handleBack() {
        navigation.goBack();
    }

    async function handleRegister() {
        if (!password || !passwordConfirm) {
            return Alert.alert("Informe a senha e a confirmação");
        }

        if (password != passwordConfirm) {
            return Alert.alert("As senhas não são iguais");
        }

        await api
            .post("/users", {
                name: user.name,
                email: user.email,
                driver_license: user.driverLicense,
                password,
            })
            .then(() => {
                navigation.navigate("Confirmation", {
                    nextScreenRoute: "SignIn",
                    title: "Conta criada!",
                    message: `Agora é só fazer login \n e aproveitar.`,
                });
            })
            .catch(() => {
                Alert.alert("Opa", "Não foi possível cadastrar");
            });
    }
    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBack} />
                        <Steps>
                            <Bullet active />
                            <Bullet />
                        </Steps>
                    </Header>
                    <Title>Crie sua {"\n"}</Title>
                    <SubTitle>
                        Faça seu cadastro de {"\n"}
                        forma fácil e rápida.
                    </SubTitle>

                    <Form>
                        <FormTitle>1. Senha</FormTitle>
                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />
                        <PasswordInput
                            iconName="lock"
                            placeholder="Repetir Senha"
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                        />
                    </Form>
                    <Button
                        title="Cadastrar"
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
