class OebbStationCard extends HTMLElement {
    // 1. The setConfig function is run when the card is loaded
    setConfig(config) {
      this.config = config;
      
      // If the card is already drawn, don't redraw it (optimization)
      if (this.content) return;
  
      // 2. Create the container
      const card = document.createElement('ha-card');
      this.content = document.createElement('div');
      this.content.style.padding = '0';
      this.content.style.height = config.height || '400px'; // Allow user to set height
      card.appendChild(this.content);
      this.appendChild(card);
  
      // 3. Render the Widget inside an Iframe
      // We use 'srcdoc' to inject your HTML directly without needing a separate file.
      const widgetHtml = this._getHtmlTemplate(config);
      
      this.content.innerHTML = `
        <iframe 
          style="width: 100%; height: 100%; border: none;" 
          srcdoc='${widgetHtml}'>
        </iframe>
      `;
    }
  
    // 4. This function returns your HTML code
    _getHtmlTemplate(config) {
      // We escape single quotes to prevent code breaking
      return `
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="utf-8">
            <style>body { margin: 0; background: transparent; }</style>
            <script src="https://fahrplan.oebb.at/webapp/staticfiles/hafas-widget-core.1.0.0.js?language=de_DE"></script>
        </head>
        <body>
            ${config.widget || `<div data-hfs-widget="true" 
                 data-hfs-widget-cfg-colorscheme="light" 
                 data-hfs-widget-sq="true" 
                 data-hfs-widget-sq-displaymode="results" 
                 data-hfs-widget-sq-pcls="7167" 
                 data-hfs-widget-sq-maxjny="40" 
                 data-hfs-widget-sq-location="${config.location_code || 'A=1@O=Innsbruck Südring@X=11419779@Y=47260679@U=181@L=791007@B=1@p=1767004641@'}" 
                 data-hfs-widget-sq-locationname="${config.station_name || 'Innsbruck Südring'}" 
                 data-hfs-widget-sq-nowmode="true" 
                 data-hfs-widget-sq-enquiry="true">
            </div>`}
        </body>
        </html>
      `.replace(/'/g, "&apos;"); // Escape quotes for safety
    }
  
    // 5. Define the size of the card (optional but good practice)
    getCardSize() {
      return 3;
    }
  }
  
  // 6. Register the card with Home Assistant
  customElements.define('oebb-station-card', OebbStationCard);
  
  // 7. Add the card to the "Add Card" picker menu
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "oebb-station-card",
    name: "ÖBB Station Monitor",
    description: "Displays a live ÖBB departure board for a specific station."
  });
