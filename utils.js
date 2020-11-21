// do not display star gazers with null value
const displayStar = (stargazer) => {
  if (stargazer === 0) {
    return (
      stargazer = `<span style="display:none;"><i class="far fa-star"></i></span>`
    )
  }
  else {
    return (
      stargazer = `<span><i class="far fa-star"></i>${stargazer}</span>`
    )
  }
}
// do not display forks with null value
const displayFork = (forks) => {
  if (forks === 0) {
    return (
      forks = `<span style="display:none;"><i class="fas fa-code-branch"></i></span>`
    )
  }
  else {
    return (
      forks = `<span><i class="fas fa-code-branch"></i>${forks}</span>`
    )
  }
}




function timeAgo(date) {
  let now = Date.now();

  // this is the time diff in milliseconds
  let difference = now - new Date(date).getTime();

  // milli has a multiplier of 10^3, thus dividing by 1000 gives us seconds
  let seconds = difference / 1000;

  // the logic here is simple, we already have our time in seconds
  // we just need to convert seconds to minutes, hours etc
  // eg (xSeconds / 60) = yMinutes
  if (seconds < 60) return `Updated ${Math.floor(seconds)} seconds ago`;
  if (seconds < 3600) return `Updated ${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `Updated ${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 2592000)
    return `Updated ${Math.floor(seconds / 86400)} days ago`;
  // return the month in this case
  if (seconds < 31536000) return `Updated on ${getMonth(date)}`;
  // return the full date in this case
  return `Updated on ${getYear(date)}`;
}

function getMonth(date) {
  let month = new Date(date).getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[month - 1]} ${month}`;
}

function getYear(date) {
  let year = new Date(date).getFullYear();
  return `${getMonth(date)}, ${year}`;
}
