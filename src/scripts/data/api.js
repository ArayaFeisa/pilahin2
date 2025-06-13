const OverpassAPI = {
  async fetchNearbyWasteBanks({ lat, lon }) {
    const radius = 15000; // 15 km
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="recycling"](around:${radius},${lat},${lon});
        node["recycling_type"="centre"](around:${radius},${lat},${lon});
        node["waste"="recycling"](around:${radius},${lat},${lon});
      );
      out body;
    `.trim();

    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Overpass API Error Response:", errorText);
      throw new Error("Gagal mengambil data bank sampah dari Overpass API");
    }

    const data = await response.json();

    return data.elements.map((el) => ({
      id: el.id,
      lat: el.lat,
      lon: el.lon,
      name: el.tags?.name || "Tempat Daur Ulang",
      tags: el.tags,
    }));
  },
};

export default OverpassAPI;
