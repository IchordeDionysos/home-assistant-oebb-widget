# Home Assistant - ÖBB Station Departure Board

A custom card for Home Assistant to display ÖBB departure times for a specific station.

## Installation via HACS
1. Go to HACS.
2. Click the 3 dots in the top right corner -> **Custom repositories**.
3. Add this URL: `https://github.com/IchordeDionysos/home-assistant-oebb-departure-board`
4. Category: **Dashboard** (Select "Lovelace" if on older HACS versions).
5. Click **Add**.
6. Find the new card in the list and click **Download**.

## Usage
You need to first get station information from ÖBB.

### Configure departure board settings

1. Go to: https://fahrplan.oebb.at/webapp/widgetgenerator.html
2. De-select Trip planner & Select schedules. (You should now see a widget preview prompting you for a single station).
3. Select the language you want the widget to have, then continue to the next step.
4. Select the "Monitor" display mode, then continue to the next step.
5. Select the station you want departures for and optionally adjust the advanced settings, then continue to the next step.
6. On the last step, you'll be shown some code that we need to configure the dashboard, copy the one starting with `<div ...`.

### Adding the widget to a Home Assistant dashboard

1. Go to a dashboard and edit it.
2. Create a new widget on the dashboard and search for the "ÖBB widget" card.
3. Copy the following configuration into the text field (for widget copy use the generated widget configuration from the previous section).

```yaml
type: custom:oebb-station-card
widget: <div data-hfs-widget="true" [... your widget configuration ...]></div>
hide_background: true
grid_options: # Optional, use this for a dashboard with only a single ÖBB widget.
  columns: full
  rows: 8
```
