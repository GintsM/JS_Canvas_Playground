const getRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};


export default (getRandom)

const showFrame = () => {
  const frameList = document.getElementById('frame')
  while (frameList.firstChild) {
    frameList.removeChild(frameList.firstChild);
  }
  frame.forEach((el, i) => frameElement(i + 1, el.tIndx, frameList))
}

export const frameElement = (num, context, root, row = 9) => {
  const programTitle = document.createElement('p');
  // programTitle.classList.add('programtitle');
  // programTitle.classList.add('speakers');
  programTitle.innerHTML = `${row < num ? "<b>" + (num - row) + "</b>" : num} ${context}</i>`;
  root.appendChild(programTitle);
}