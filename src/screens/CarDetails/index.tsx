import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";

import speedSvg from "../../assets/speed.svg";
import accelerationSvg from "../../assets/acceleration.svg";
import forceSvg from "../../assets/force.svg";
import gasoineSvg from "../../assets/gasoline.svg";
import exchangeSvg from "../../assets/exchange.svg";
import peopleSvg from "../../assets/people.svg";

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
  About,
  Accessories,
  Footer,
} from "./styles";
import { Button } from "../../components/Button";

export function CarDetails() {
  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate("Scheduling");
  }

  function handleBackScreen() {
    navigation.navigate("Home");
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBackScreen} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            "https://img2.gratispng.com/20180628/stg/kisspng-2018-audi-s5-3-0t-premium-plus-coupe-audi-rs5-2017-2018-audi-a5-coupe-5b35130451d959.0738564215302049323353.jpg",
          ]}
        />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>Lamborguini</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period></Period>
            <Price></Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory name="380km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800 HP" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasoineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 Pessoas" icon={peopleSvg} />
        </Accessories>
        <About>
          Este bal bla bla bla bla blalb euahueh a uaheuah uheauh uahaeuha uehau
          ehuaehuaheuha uhauheuah uhaeuhauehauheuahe u albaalbl
        </About>
      </Content>
      <Footer>
        <Button title="Escolher periodo do aluguel" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
