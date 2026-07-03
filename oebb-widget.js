class OebbCard extends HTMLElement {
    setConfig(config) {
      this.config = config;

      if (this.content) return;

      const card = document.createElement('ha-card');
      this.content = document.createElement('div');
      this.content.style.padding = '0px';
      this.content.style.height = config.height || '400px';
      card.appendChild(this.content);
      this.appendChild(card);

      const widgetHtml = this._getHtmlTemplate(config);
      
      this.content.innerHTML = `
        <iframe 
          style="width: 100%; height: 100%; border: none; border-radius: var(--ha-card-border-radius, var(--ha-border-radius-lg));" 
          srcdoc='${widgetHtml}'>
        </iframe>
      `;
    }

    _getHtmlTemplate(config) {
      const marginTop = config.hide_branding ? "0" : "16px";
      let styles = `body { margin: ${marginTop} 0 16px 0; padding: 0; background: transparent; }`;

      if (config.hide_caption) styles += " .lyr_sqCaption { display: none !important; }";
      if (config.hide_stop_list_explanation) styles += " .lyr_sqStopListExplanation { display: none !important; }";
      
      if (config.hide_branding) {
        styles += " .hfs_widgetIconBranding { display: none !important; }";
        styles += " .lyr_sqCaption { margin-top: 0 !important; paddingTop: 0 !important; }";
      }

      if (config.hide_header) styles += " .lyr_miniStboardHeader { display: none !important; }";
      if (config.hide_date_headline) styles += " .lyr_atomDateHeadline { display: none !important; }";

      if (config.font_family) {
        styles += ` body, * { font-family: ${config.font_family} !important; }`;
      }
      
      const fontLink = config.font_url ? `<link rel="stylesheet" href="${config.font_url}">` : "";

      return `
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="utf-8">
            ${fontLink}
            <style>${styles}</style>
            <script src="https://fahrplan.oebb.at/webapp/staticfiles/hafas-widget-core.1.0.0.js?language=${config.language || 'en_GB'}"></script>
        </head>
        <body>
            ${config.widget}
        </body>
        </html>
      `.replace(/'/g, "&apos;"); // Escape quotes for safety
    }
  }

  customElements.define('oebb-widget', OebbCard);

  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "oebb-widget",
    name: "ÖBB Widget",
    description: "Displays the ÖBB Scotty widget with either a live departure board or trip planner."
  });
