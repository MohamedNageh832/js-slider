const sliderTrack = document.querySelector(".slider__track");
const sliderBody = document.querySelector(".slider__body");
const sliderBodyOverflow = sliderBody.scrollWidth - sliderBody.clientWidth;
let isPressed = false;
let xStart,
  xNow = 0,
  xNew,
  xMove;

sliderTrack.addEventListener("mousedown", dragstart);
sliderTrack.addEventListener("touchstart", dragstart);

sliderTrack.addEventListener("mousemove", dragMove);
sliderTrack.addEventListener("touchmove", dragMove);

sliderTrack.addEventListener("mouseleave", dragEnd);
sliderTrack.addEventListener("touchend", dragEnd);
sliderTrack.addEventListener("mouseup", dragEnd);
window.addEventListener("mouseup", dragEnd);

function dragstart(e) {
  isPressed = true;
  sliderBody.style.transition = "none";

  if (e.type === "touchstart") {
    const { left } = e.target.getBoundingClientRect();
    xStart = e.touches[0].pageX - left;
  } else {
    xStart = e.offsetX;
  }
}

function dragMove(e) {
  if (!isPressed) return;

  e.preventDefault();

  if (e.type === "touchmove") {
    const { left } = e.target.getBoundingClientRect();
    const offsetX = e.touches[0].pageX - left;
    xNew = offsetX - xStart;
  } else {
    xNew = e.offsetX - xStart;
  }
  xMove = xNow + xNew;

  sliderBody.style.transform = `translateX(${xMove}px)`;
}

function dragEnd() {
  isPressed = false;

  if (xMove > 0) {
    sliderBody.style.transition = "transform 0.5s";
    sliderBody.style.transform = `translateX(${0}px)`;
    xNow = 0;
  } else if (-xMove > sliderBodyOverflow) {
    sliderBody.style.transition = "transform 0.5s";
    sliderBody.style.transform = `translateX(${-sliderBodyOverflow}px)`;
    xNow = -sliderBodyOverflow;
  } else {
    xNow = xMove;
  }
  xMove = xNow;
}

sliderBody.addEventListener("transitionend", () => {
  sliderBody.style.transition = "none";
});
