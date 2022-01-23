export const getCarIcon = (vehicleType, vehicleStatus) => {
  const type = vehicleType.toLowerCase();
  const status = vehicleStatus.toLowerCase();

  if (type === 'truck') {
    if (status === 'available') {
      return {
        src: 'assets/truck-green.png',
        alt: 'Free truck icon'
      }
    } else {
      return {
        src: 'assets/truck-red.png',
        alt: 'Busy truck icon'
      }
    }
  }

  if (type === 'car') {
    if (status === 'available') {
      return {
        src: 'assets/car-green.png',
        alt: 'Free car icon'
      }
    } else {
      return {
        src: 'assets/car-red.png',
        alt: 'Busy car icon'
      }
    }
  }

  return {
    src: 'assets/car-green.png',
    alt: 'Free car icon'
  }
};

export const getParkingIcon = () => {
  return {
    src: 'assets/parking.png',
    alt: 'Parking icon'
  }
};

export const getPoiIcon = (poiCategory) => {
  const category = poiCategory.toLowerCase;

  if (category === 'ciekawe miejsca') {
    return {
      src: 'assets/magnifying-glass.png',
      alt: 'Parking icon'
    }
  }

  if (category === 'stacje kolejowe') {
    return {
      src: 'assets/train.png',
      alt: 'Parking icon'
    }
  }

  if (category === 'krasnale') {
    return {
      src: 'assets/gnome.png',
      alt: 'Parking icon'
    }
  }

  return {
    src: 'assets/magnifying-glass.png',
    alt: 'Parking icon'
  }
}