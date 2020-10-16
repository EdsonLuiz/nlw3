import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OrphanagesMap from "./pages/orphanages-map";
import OrphanageDetails from "./pages/orphanage-details/orphanage-details";
import SelectMapPosition from "./pages/create_orphanage/SelectMapPosition";
import OrphanageData from "./pages/create_orphanage/OrphanageData";
import Header from "./components/header/Header";

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
        <Screen name="Orphanages" component={OrphanagesMap} />
        <Screen
          options={{ headerShown: true, header: () => <Header showCancel={false} title="Orfanato" /> }}
          name="OrphanageDetails"
          component={OrphanageDetails} />
        <Screen
          options={{ headerShown: true, header: () => <Header title="Selecione no mapa" /> }}
           name="SelectMapPosition" component={SelectMapPosition} />
        <Screen
          options={{ headerShown: true, header: () => <Header title="informe os dados" /> }}
         name="OrphanageData" component={OrphanageData} />
      </Navigator>
    </NavigationContainer>
  );
}
