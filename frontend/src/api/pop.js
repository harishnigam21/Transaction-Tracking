const pop = (message, color) => {
  const target = document.getElementById("pops");
  target.style.display = "block";
  target.style.color = color;
  target.textContent = message;
  setTimeout(() => {
    target.style.display = "none";
  }, 3000);
};
module.exports = pop;
