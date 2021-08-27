import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar, useWindowDimensions } from "react-native";

import LogoSvg from "../../assets/logo.svg";
import DoneSvg from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";
import { ConfirmButton } from "../../components/ConfirmButton";

interface Params {
    title: string;
    message: string;
    nextScreenRoute: string;
}

export function Confirmation() {
    const { width } = useWindowDimensions();
    const navigation = useNavigation();
    const route= useRoute();

    const {message,title,nextScreenRoute} = route.params as Params;

    function handleConfirmRental() {
        navigation.navigate(nextScreenRoute);
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <LogoSvg width={width} />
            <Content>
                <DoneSvg width={80} height={80} />
                <Title>{title}</Title>
                <Message>{message}</Message>
            </Content>
            <Footer>
                <ConfirmButton title="OK" onPress={handleConfirmRental} />
            </Footer>
        </Container>
    );
}
