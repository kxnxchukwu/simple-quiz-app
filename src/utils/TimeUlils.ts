export const getTimeLeftInHMS = (timeLeftInSeconds: number) => {
  const hours = Math.floor(timeLeftInSeconds / 3600);
  const minutes = Math.floor((timeLeftInSeconds % 3600) / 60);
  const secs = Math.floor(timeLeftInSeconds % 60);

  return { hours, minutes, secs };
};

export const getTimeTextStyle = (seconds: number): string => {
  const animateCSSClasses = "animate__animated animate__heartBeat";

  if (seconds === 0) {
    return "text-danger";
  }
  if (seconds <= 600) {
    return `text-danger ${animateCSSClasses} animate__infinite animate__faster`;
  }

  if (seconds > 600 && seconds <= 2100) {
    return `text-warning ${animateCSSClasses}`;
  }

  if (seconds === 3600) {
    return `text-success ${animateCSSClasses} animate__repeat-3`;
  }

  return `text-success ${animateCSSClasses} animate__repeat-3`;
};
