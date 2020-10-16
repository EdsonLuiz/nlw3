import React, { useCallback, useEffect, useState } from "react";
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
import Api from "../services/api";

interface Orphanages {
 id: number;
 name: string;
 latitude: number;
 longitude: number; 
}

export default function OrphanagesMap() {
  const { navigate } = useNavigation();
  const [orphanages, setOrphanages] = useState<Orphanages[]>([])

  const handleNavigationToOrphanageDetails = useCallback((id: number) => {
    navigate("OrphanageDetails", {id});
  }, []);

  const handleNavigationToCreateOrphanage = useCallback(() => {
    navigate("SelectMapPosition");
  }, []);
  
  useEffect(() => {
    Api.get('orphanages').then(response => setOrphanages(response.data))    
  }, [])

  return (
    <Container>
      <MapContainer
        initialRegion={{
          latitude: -30.0081849,
          longitude: -51.1062832,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
      {orphanages.map(orphanage => (
        <Marker key={orphanage.id}
          icon={mapMarker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
          coordinate={{
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
          }}
        >
          <CalloutContainer
            onPress={() => handleNavigationToOrphanageDetails(orphanage.id)}
            tooltip
          >
            <CalloutText>{orphanage.name}</CalloutText>
          </CalloutContainer>
        </Marker>
      ))}
      </MapContainer>

      <FooterContainer>
        <FooterText>{orphanages.length} orfanatos encontrados</FooterText>
        <CreateOrphanageButton onPress={handleNavigationToCreateOrphanage}>
          <Feather name="plus" size={20} color="#fff" />
        </CreateOrphanageButton>
      </FooterContainer>
    </Container>
  );
}
