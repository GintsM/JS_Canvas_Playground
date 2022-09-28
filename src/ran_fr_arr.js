const getRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};


export default (getRandom)

export const frameElement = (num, context, root, row = 9) => {
  const programTitle = document.createElement('p');
  // programTitle.classList.add('programtitle');
  // programTitle.classList.add('speakers');
  programTitle.innerHTML = `${row < num ? "<b>" + (num - row) + "</b>" : num} ${context}</i>`;
  root.appendChild(programTitle);
}