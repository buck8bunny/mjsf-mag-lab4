<template>
    <div style="text-align: center; margin-top: 50px;">
      <h1>Tooltip Configurator</h1>
  
      <!-- Toggle for always showing the tooltip -->
      <label>
        <input type="checkbox" v-model="alwaysShowTooltip" />
        Always show tooltip
      </label>
  
      <!-- Input for tooltip content -->
      <div>
        <input
          type="text"
          v-model="tooltipContent"
          placeholder="Enter tooltip text"
        />
      </div>
  
      <!-- Background color selection for tooltip -->
      <div>
        <label>Background Color:</label>
        <input type="color" v-model="tooltipBackgroundColor" />
      </div>
  
      <!-- Text color selection for tooltip -->
      <div>
        <label>Text Color:</label>
        <input type="color" v-model="tooltipTextColor" />
      </div>
  
      <!-- Custom delay input -->
      <div>
        <label>Custom Delay (ms):</label>
        <input type="number" v-model="tooltipDelay" min="0" />
      </div>
  
      <!-- Arrow direction selection -->
      <div>
        <label>Arrow Direction:</label>
        <select v-model="arrowDirection">
          <option value="right">Right</option>
          <option value="left">Left</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>
      </div>
  
      <!-- Tooltip -->
      <div
        class="tooltip"
        :style="{ margin: '20px', display: 'inline-block' }"
      >
        <span
          @mouseenter="showTooltipWithDelay"
          @mouseleave="hideTooltip"
        >
          Hover over me
        </span>
        <span
          class="tooltiptext"
          :style="{ 
            backgroundColor: tooltipBackgroundColor, 
            color: tooltipTextColor, 
            visibility: tooltipVisible || alwaysShowTooltip ? 'visible' : 'hidden', 
            opacity: tooltipVisible || alwaysShowTooltip ? 1 : 0,
            transition: 'opacity 0.5s'
          }"
          :class="`arrow-${arrowDirection}`"
        >
          {{ tooltipContent }}
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TooltipConfigurator',
    data() {
      return {
        alwaysShowTooltip: false, // Flag to always show tooltip
        tooltipContent: 'Tooltip text',
        tooltipBackgroundColor: '#000000',
        tooltipTextColor: '#FFFFFF',
        tooltipDelay: 200,
        tooltipVisible: false,
        tooltipTimeout: null,
        arrowDirection: 'right', // Default arrow direction
      };
    },
    methods: {
      showTooltipWithDelay() {
        if (!this.alwaysShowTooltip) {
          this.tooltipTimeout = setTimeout(() => {
            this.tooltipVisible = true;
          }, this.tooltipDelay);
        }
      },
      hideTooltip() {
        clearTimeout(this.tooltipTimeout);
        if (!this.alwaysShowTooltip) {
          this.tooltipVisible = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }
  
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.5s, visibility 0.5s;
  }
  
  /* Tooltip visibility on hover */
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  
  /* Arrow Direction Styles */
  .arrow-right {
    top: 50%; /* Center vertically */
    left: 100%; /* Position to the right */
    transform: translateY(-50%); /* Center vertically */
  }
  
  .arrow-right::after {
    content: "";
    position: absolute;
    top: 50%; /* Center arrow vertically */
    left: 100%; /* Arrow points to the left */
    margin-top: -5px; /* Offset to center the arrow */
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent black; /* Arrow color */
  }
  
  .arrow-left {
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
  }
  
  .arrow-left::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent black;
  }
  
  .arrow-top {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .arrow-top::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
  
  .arrow-bottom {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .arrow-bottom::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
  </style>
  