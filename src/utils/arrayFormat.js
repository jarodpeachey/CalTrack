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

const compareDate = (a, b) => {
  const arrayItemA = a.date.UTC;
  const arrayItemB = b.date.UTC;

  let comparison = 0;
  if (arrayItemA > arrayItemB) {
    comparison = -1;
  } else if (arrayItemA < arrayItemB) {
    comparison = 1;
  }
  return comparison;
};

export const sortByUserId = array => array.sort(compare);

export const sortByDate = array => array.sort(compareDate);
