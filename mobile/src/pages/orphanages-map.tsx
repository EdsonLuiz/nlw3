import React, { useCallback } from "react";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  MapContainer,
  CalloutContainer,
  CalloutText,
  FooterContainer,
  FooterText,
  CreateOrphanageButton,
} from "./styles";

import mapMarker from "../images/map-marker.png";
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

export default function OrphanagesMap() {
  const { navigate } = useNavigation();

  const handleNavigationToOrphanageDetails = useCallback(() => {
    navigate("OrphanageDetails");
  }, []);

  const handleNavigationToCreateOrphanage = useCallback(() => {
    navigate("SelectMapPosition");
  }, []);

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
          <CalloutContainer
            onPress={handleNavigationToOrphanageDetails}
            tooltip
          >
            <CalloutText>Lar das meninas </CalloutText>
          </CalloutContainer>
        </Marker>
      </MapContainer>

      <FooterContainer>
        <FooterText>Dois orfanatos encontrados</FooterText>
        <CreateOrphanageButton onPress={handleNavigationToCreateOrphanage}>
          <Feather name="plus" size={20} color="#fff" />
        </CreateOrphanageButton>
      </FooterContainer>
    </Container>
  );
}
