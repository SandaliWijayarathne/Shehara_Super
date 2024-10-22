export const loadGoogleMaps = (callback) => {
    const existingScript = document.getElementById('googleMaps');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.id = 'googleMaps';
      document.body.appendChild(script);
      script.onload = () => {
        if (callback) callback();
      };
    } else {
      if (callback) callback();
    }
  };
  