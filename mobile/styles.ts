import styled from "styled-components/native";
import MapView, { Callout } from "react-native-maps";
import { Dimensions, TouchableOpacity } from "react-native";

export const Container = styled.View``;

export const MapContainer = styled(MapView)`
  width: ${Dimensions.get("window").width}px;
  height: ${Dimensions.get("window").height}px;
`;

export const CalloutContainer = styled(Callout)`
  width: 160px;
  height: 46px;
  padding: 0 16px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  justify-content: center;
`;

export const CalloutText = styled.Text`
  color: #0089a5;
  font-size: 14px;
`;

export const FooterContainer = styled.View`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 32px;

  background-color: #ddd;
  border-radius: 20px;
  height: 56px;
  padding-left: 24px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  elevation: 3;
`;

export const FooterText = styled.Text`
  font-family: "Nunito_700Bold";
  color: #8fa8b3;
`;

export const CreateOrphanageButton = styled(TouchableOpacity)`
  width: 56px;
  height: 54px;
  background-color: #15c3d6;
  border-radius: 20px;

  justify-content: center;
  align-items: center;
`;

export const CreateOrphanageButtonText = styled.Text``;
