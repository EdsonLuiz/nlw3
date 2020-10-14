import React, { useState, useCallback, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import { FiPlus } from "react-icons/fi";

import "../styles/pages/create-orphanage.css";
import Sidebar from "../components/sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpening_hours] = useState("");
  const [open_on_weekends, setOpen_on_weekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleSelectImages = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const selectedImages = Array.from(event.target.files);
      setImages(selectedImages);

      const selectedImagesPreview = selectedImages.map(image =>
        URL.createObjectURL(image)
      );

      setPreviewImages(selectedImagesPreview);
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const formData = new FormData();

      formData.append("latitude", String(position.latitude));
      formData.append("longitude", String(position.longitude));
      formData.append("name", name);
      formData.append("about", about);
      formData.append("instructions", instructions);
      formData.append("opening_hours", opening_hours);
      formData.append("open_on_weekends", String(open_on_weekends));
      images.forEach(image => formData.append("images", image));

      const response = await api.post("/orphanages", formData);

      alert("Cadastro realizado com sucesso");

      history.push("/app");
    },
    [
      about,
      history,
      images,
      instructions,
      name,
      open_on_weekends,
      opening_hours,
      position.latitude,
      position.longitude
    ]
  );

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng
    });
  }, []);

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-30.0000025, -51.1036626]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                // url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                id="name"
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                value={about}
                onChange={e => setAbout(e.target.value)}
                id="name"
                maxLength={300}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(previewImage => (
                  <img key={previewImage} src={previewImage} alt={name} />
                ))}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                id="instructions"
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                value={opening_hours}
                onChange={e => setOpening_hours(e.target.value)}
                id="opening_hours"
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpen_on_weekends(true)}
                >
                  Sim
                </button>

                <button
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpen_on_weekends(false)}
                  type="button"
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
