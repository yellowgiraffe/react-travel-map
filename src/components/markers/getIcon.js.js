export const getCarIcon = (vehicleType, vehicleStatus) => {
  const type = vehicleType.toLowerCase();
  const status = vehicleStatus.toLowerCase();

  if (type === 'truck') {
    if (status === 'available') {
      return {
        src: 'assets/truck-green.png',
        alt: 'Free truck icon',
        width: '52px',
        height: '52px',
      };
    }
    return {
      src: 'assets/truck-red.png',
      alt: 'Busy truck icon',
      width: '52px',
      height: '52px',
    };
  }

  if (type === 'car') {
    if (status === 'available') {
      return {
        src: 'assets/car-green.png',
        alt: 'Free car icon',
        width: '52px',
        height: '52px',
      };
    }
    return {
      src: 'assets/car-red.png',
      alt: 'Busy car icon',
      width: '52px',
      height: '52px',
    };
  }

  return {
    src: 'assets/car-green.png',
    alt: 'Free car icon',
    width: '52px',
    height: '52px',
  };
};

export const getParkingIcon = () => ({
  src: 'assets/parking.png',
  alt: 'Parking icon',
  width: '42px',
  height: '42px',
});

export const getPoiIcon = (poiCategory) => {
  const category = poiCategory.toLowerCase();

  if (category === 'ciekawe miejsca') {
    return {
      src: 'assets/magnifying-glass.png',
      alt: 'Magnifying glass icon',
      width: '42px',
      height: '42px',
    };
  }

  if (category === 'stacje kolejowe') {
    return {
      src: 'assets/train.png',
      alt: 'Railway station icon',
      width: '34px',
      height: '34px',
    };
  }

  if (category === 'krasnale') {
    return {
      src: 'assets/gnome.png',
      alt: 'Gnome icon',
      width: '42px',
      height: '42px',
    };
  }

  return {
    src: 'assets/magnifying-glass.png',
    alt: 'Magnifying glass icon',
    width: '42px',
    height: '42px',
  };
};
