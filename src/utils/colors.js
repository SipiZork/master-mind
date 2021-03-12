export const convertColors = (color) => {
  switch (color) {
    case 1:
      return 'red';
    case 2:
      return 'pink';
    case 3:
      return 'yellow';
    case 4:
      return 'green';
    case 5:
      return 'lightskyblue';
    case 6:
      return 'blue';
    default:
      return 'grey';
  }
};

export const convertToNumber = (color) => {
  switch (color) {
    case '#ff0000':
      return 1;
    case '#ffc0cb':
      return 2;
    case '#ffff00':
      return 3;
    case '#008000':
      return 4;
    case '#87cefa':
      return 5;
    case '#0000ff':
      return 6;
    default:
      return 0;
  }
}