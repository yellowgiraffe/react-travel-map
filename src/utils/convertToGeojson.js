const convertToGeojson = (json) => {
  return json.map((object) => {
    let details;
    const properties = {
      cluster: false,
      objectId: object.id,
      objectName: object.name,
      objectType: object.discriminator,
    };

    const geometry = {
      type: 'Point',
      coordinates: [
        object.location.longitude, 
        object.location.latitude,
      ],
    }

    switch (object.discriminator) {
      case 'vehicle':
        details = {
          vehicleType: object.type,
          availability: object.status,
          batteryLevel: object.batteryLevelPct,
          platesNumber: object.platesNumber,
        };
        return {
          type: 'Feature',
          properties,
          details,
          geometry,
        };
      case 'parking':
        details = {
          description: object.description,
          address: `${object.address.street || ''} ${object.address.house || ''}, ${object.address.city || ''}`,
          availableSpacesCount: object.availableSpacesCount,
          totalSpaces: object.spacesCount,
        };
        return {
          type: 'Feature',
          properties,
          details,
          geometry,
        };

      case 'poi':
        details = {
          description: object.description,
          category: object.category,
          address: `${object.address.street || ''} ${object.address.house || ''}`,
          city: object.address.city || '',
        };
        return{
          type: 'Feature',
          properties,
          details,
          geometry,
        };
      default:
        return null;
    }
  });
};

export default convertToGeojson;
