import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  MapContainer,
  CalloutContainer,
  CalloutText,
  FooterContainer,
  FooterText,
  CreateOrphanageButton,
  CreateOrphanageButtonText,
} from "./styles";

import mapMarker from "./src/images/map-marker.png";
import { Marker } from "react-native-maps";

export default function App() {
  return (
    <Container>
      <MapContainer
        initialRegion={{
          latitude: -29.9983735,
          longitude: -51.1009617,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
          coordinate={{
            latitude: -29.9983735,
            longitude: -51.1009617,
          }}
        >
          <CalloutContainer onPress={() => {}} tooltip>
            <CalloutText>Lar das meninas </CalloutText>
          </CalloutContainer>
        </Marker>
      </MapContainer>

      <FooterContainer>
        <FooterText>Dois orfanatos encontrados</FooterText>
        <CreateOrphanageButton onPress={() => {}}>
          <Feather name="plus" size={20} color="#fff" />
        </CreateOrphanageButton>
      </FooterContainer>
    </Container>
  );
}
