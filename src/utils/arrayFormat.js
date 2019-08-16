const compare = (a, b) => {
  const userA = a.id;
  const userB = b.id;

  let comparison = 0;
  if (userA > userB) {
    comparison = 1;
  } else if (userA < userB) {
    comparison = -1;
  }
  return comparison;
};

export const sortByUserId = (array) => {
  return array.sort(compare);
};
