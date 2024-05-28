<script>
  import { createEventDispatcher } from 'svelte';
  let input = '';
  let options = [];
  const dispatch = createEventDispatcher();

  async function fetchPredictions(query) {
    const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.status === 'OK') {
      options = data.predictions.map(prediction => ({
        description: prediction.description,
        place_id: prediction.place_id
      }));
    } else {
      options = [];
    }
  }

  function handleInput(event) {
    input = event.target.value;
    if (input.length > 2) {
      fetchPredictions(input);
    } else {
      options = [];
    }
  }

  function handleSelect(option) {
    dispatch('select', option);
    input = option.description;
    options = [];
  }
</script>

<style>
  .autocomplete {
    position: relative;
  }
  .options {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
  }
  .option {
    padding: 10px;
    cursor: pointer;
  }
  .option:hover {
    background: #eee;
  }
</style>

<div class="autocomplete">
    <input type="text" bind:value={input} on:input={handleInput} placeholder="Enter an address" />
    {#if options.length > 0}
      <div class="options" role="listbox">
        {#each options as option}
          <button class="option" on:click={() => handleSelect(option)}>
            {option.description}
          </button>
        {/each}
      </div>
    {/if}
  </div>