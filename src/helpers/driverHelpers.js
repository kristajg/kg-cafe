// Fake driver data for now
let availableDrivers = [
  'Spike',
  'Faye',
  'Jet',
  'Edward',
  'Ein',
];

export const bookTaxiDriver = () => {
  // Select random driver from pool
  // assume they would be alerted & confirm on their end
  const random = Math.floor(Math.random() * availableDrivers.length);
  const selectedDriver = availableDrivers[random];
  // remove available driver from pool
  availableDrivers.splice(random, 1);
  return selectedDriver;
};
