export const truncate = (str, max = 100, suffix = '...') => str.length < max ?
    str :
    `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;