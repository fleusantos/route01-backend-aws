const { hexToRgb } = require("@mui/material");

function fetchData(l, b, r, t) {
    return fetch(`https://gbwulhh6jwf2brpn5iwedaj67m0uvyuo.lambda-url.eu-central-1.on.aws/db/get_data_from_bounds=l:${l},b:${b},r:${r},t:${t}`)
      .then(response => response.json())
      .then(json => {
        const res = JSON.parse(json)
        return res;
    })
      .catch(error => {
        console.error('Error fetching data: ', error);
        throw error;
    });
}

export function to_heatmap_data(l, b, r, t, opc = 0.6) {
  const data = fetchData(l, b, r, t);

  const heatmapDataByResolution = {};

  for (let entry of data) {
    if (!heatmapDataByResolution.hasOwnProperty(entry.resolution)) {
      heatmapDataByResolution[entry.resolution] = { positions: [] };
    }

    heatmapDataByResolution[entry.resolution].positions.push({
      lat: entry.center.lat,
      lng: entry.center.lon,
    });
  }

  const heatmaps = [];

  Object.entries(heatmapDataByResolution).forEach(([key, value]) => {
    const res = {
      positions: [],
      options: {
        radius: (parseInt(key) / 1000) * 20,
        opacity: opc,
        dissipating: false
      },
    };

    for (let pos of value.positions) {
      res.positions.push(pos);
    }

    heatmaps.push(res);
  });

  return heatmaps;
}
