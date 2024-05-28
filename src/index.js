import Autocomplete from "./components/Autocomplete.svelte";

export default {
  name: "GooglePlacesAutocomplete",
  label: "Google Places Autocomplete",
  category: "Input",
  icon: "search",
  component: Autocomplete,
  settings: {
    apiKey: {
      type: "string",
      label: "Google API Key",
      default: ""
    }
  }
}; 
