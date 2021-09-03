import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { format } from "date-fns";
import { Alert } from "react-native";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { api } from "../../services/api";

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Rent,
    Brand,
    Period,
    Price,
    Name,
    Accessories,
    Footer,
    DateInfo,
    DateTitle,
    DateValue,
    CalendarIcon,
    RentalPeriod,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceOuota,
    RentalPriceTotal,
} from "./styles";
import { useNetInfo } from "@react-native-community/netinfo";

interface Params {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    start: string;
    end: string;
}

export function SchedulingDetails() {
    const [loading, setLoading] = useState(false);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
        {} as RentalPeriod
    );

    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
    const netInfo = useNetInfo();
    const theme = useTheme();
    const route = useRoute();
    const { car, dates } = route.params as Params;

    const rentTotal = Number(dates.length * car.price);

    const navigation = useNavigation();

    async function handleConfirmRental() {
        setLoading(true);

        await api.post("/rentals", {
            user_id: 1,
            car_id: car.id,
            start_date: new Date(dates[0]),
            end_date: new Date(dates[dates.length - 1]),
            total: rentTotal,
        }).then(() =>
                navigation.navigate("Confirmation", {
                    nextScreenRoute: "Home",
                    title: "Carro Alugado!",
                    message: `Agora você só precisa ir \n até a concessionária da RENTX \n pegar seu automóvel`,
                })
            )
            .catch(() => {
                Alert.alert("Não foi possivel confirmar o agendamento.");
                setLoading(false);
            });
    }

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
            end: format(
                getPlatformDate(new Date(dates[dates.length - 1])),
                "dd/MM/yyyy"
            ),
        });
    }, []);

    useEffect(() => {
        async function fetchCarUpdated() {
            const response = await api.get(`/cars/${car.id}`);
            setCarUpdated(response.data);
        }
        if (netInfo.isConnected === true) {
            fetchCarUpdated();
        }
    }, [netInfo.isConnected]);

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} />
            </Header>

            <CarImages>
                <ImageSlider
                    imagesUrl={
                        !!carUpdated.photos
                            ? carUpdated.photos
                            : [
                                  {
                                      id: car.thumbnail,
                                      photo: car.thumbnail,
                                  },
                              ]
                    }
                />
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>{`R$ ${car.price}`}</Price>
                    </Rent>
                </Details>
                {carUpdated.accessories && (
                    <Accessories>
                        {carUpdated.accessories.map((accessory) => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))}
                    </Accessories>
                )}
                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>
                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.shape}
                    />
                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>
                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceOuota>{`$ ${car.price} x${dates.length} diárias`}</RentalPriceOuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>
            <Footer>
                <Button
                    title="Alugar agora"
                    color={theme.colors.success}
                    onPress={handleConfirmRental}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>
        </Container>
    );
}
