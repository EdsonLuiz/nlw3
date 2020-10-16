import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ExpoImagePicker from "expo-image-picker";
import Api from "../../services/api";

interface OrphanageParam {
  position: {
    latitude: number;
    longitude: number;
  };
}

export default function OrphanageData() {
  const route = useRoute();
  const params = route.params as OrphanageParam;

  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpening_hours] = useState("");
  const [open_on_weekends, setOpen_on_weekends] = useState(true);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleSelectImages = useCallback(async () => {
    const {
      status,
    } = await ExpoImagePicker.requestCameraRollPermissionsAsync();

    if (status !== "granted") {
      alert("Precisamos de acesso para adicionar suas fotos");
    }

    const result = await ExpoImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri } = result;

    setPreviewImages([...previewImages, uri]);
  }, [previewImages]);

  const handleSubmit = useCallback(async () => {
    const { latitude, longitude } = params.position;

    const data = new FormData();
    data.append("name", name);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));
    data.append("images", "");
    previewImages.forEach((image, index) => {
      data.append("images", {
        name: `image_${index}.jpg`,
        type: "image/jpg",
        uri: image,
      } as any);
    });
    console.log(data);

    await Api.post("orphanages", data);

    console.log(data);
    navigation.navigate("Orphanages");
  }, [
    name,
    params.position,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    previewImages,
  ]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        value={about}
        onChangeText={(text) => setAbout(text)}
        style={[styles.input, { height: 110 }]}
        multiline
      />
      {/*        
      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />
*/}
      <Text style={styles.label}>Fotos</Text>
      <View style={styles.uploadedImagesContainer}>
        {previewImages.map((image) => (
          <Image
            key={image}
            source={{ uri: image }}
            style={styles.uploadedImage}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        value={instructions}
        onChangeText={(text) => setInstructions(text)}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        value={opening_hours}
        onChangeText={(text) => setOpening_hours(text)}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          value={open_on_weekends}
          onValueChange={setOpen_on_weekends}
          thumbColor="#fff"
          trackColor={{ false: "#ccc", true: "#39CC83" }}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: "#5c8599",
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: "#D3E2E6",
  },

  label: {
    color: "#8fa7b3",
    fontFamily: "Nunito_600SemiBold",
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: "#8fa7b3",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#d3e2e6",
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: "top",
  },

  uploadedImagesContainer: {
    flexDirection: "row",
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
    borderColor: "#96D2F0",
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    color: "#FFF",
  },
});

