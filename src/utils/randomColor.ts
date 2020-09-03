// Oficial google colors, not so many but I think I can work with this.
const colors = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"];

export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
