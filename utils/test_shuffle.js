function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const count = {};
const opciones = ['A', 'B', 'C', 'D'];
for (let i = 0; i < 1000; i++) {
  const s = shuffle(opciones);
  count[s[0]] = (count[s[0]] || 0) + 1;
}
console.log(count);
