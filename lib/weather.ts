export type WeatherSnapshot = {
  temperature: number;
  windspeed: number;
  condition: string;
};

const fallbackWeather: WeatherSnapshot = {
  temperature: 18,
  windspeed: 8,
  condition: 'Partiellement nuageux',
};

export async function getWeatherSnapshot() {
  const baseUrl = process.env.OPEN_METEO_URL || 'https://api.open-meteo.com/v1/forecast';
  const query = new URL(baseUrl);
  query.searchParams.set('latitude', '45.8469');
  query.searchParams.set('longitude', '5.9403');
  query.searchParams.set('current_weather', 'true');
  query.searchParams.set('windspeed_unit', 'kmh');
  query.searchParams.set('timezone', 'Europe/Paris');

  try {
    const res = await fetch(query.toString(), { next: { revalidate: 1800 } });
    if (!res.ok) {
      throw new Error('Failed to fetch weather');
    }
    const data = await res.json();
    return {
      temperature: data.current_weather?.temperature ?? fallbackWeather.temperature,
      windspeed: data.current_weather?.windspeed ?? fallbackWeather.windspeed,
      condition:
        mapWeatherCode(data.current_weather?.weathercode) ?? fallbackWeather.condition,
    } satisfies WeatherSnapshot;
  } catch (error) {
    return fallbackWeather;
  }
}

function mapWeatherCode(code?: number) {
  if (code == null) return undefined;
  if ([0].includes(code)) return 'Ensoleillé';
  if ([1, 2, 3].includes(code)) return 'Partiellement nuageux';
  if ([45, 48].includes(code)) return 'Brume';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Pluie fine';
  if ([61, 63, 65, 80, 81, 82].includes(code)) return 'Averses';
  if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code)) return 'Neige';
  if ([95, 96, 99].includes(code)) return 'Orages';
  return undefined;
}
