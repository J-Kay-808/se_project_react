export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL( /* @vite-ignore */"../images/day/sunny.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL( /* @vite-ignore */"../images/day/cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL( /* @vite-ignore */"../images/day/fog.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rainy",
    url: new URL( /* @vite-ignore */"../images/day/rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL( /* @vite-ignore */"../images/day/snow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL( /* @vite-ignore */"../images/day/storm.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL( /* @vite-ignore */"../images/night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL( /* @vite-ignore */"../images/night/cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL( /* @vite-ignore */"../images/day/fog.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL( /* @vite-ignore */"../images/night/rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL( /* @vite-ignore */"../images/night/snow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL( /* @vite-ignore */"../images/night/storm.png", import.meta.url).href,
  },
];


export const defaultWeatherOptions = {
  day: {
    url: new URL( /* @vite-ignore */"../images/day/default.png", import.meta.url).href,
  },
  night: {
    url: new URL( /* @vite-ignore */"../images/night/default.png", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 30.267153,
  longitude: -97.743057,
};

export const APIkey = "b7b5f882bbaf1adf5f2f710c45aec050";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.paranormal.com.my"
    : "http://localhost:3001"