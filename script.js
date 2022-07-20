let addLift = document.querySelector(".addLift"),
  addFloor = document.querySelector(".addFloor"),
  main = document.querySelector("main"),
  floor = document.querySelector(".floor"),
  body = document.querySelector("body"),
  lift = document.querySelector(".lift");
(i = 2),
  (lDist = 1),
  (currentFloor = 0),
  (lifts = 1),
  (floors = []),
  (totalFloors = 1);

addFloor.addEventListener("click", () => {
  currentFloor++;
  let section = document.createElement("section");
  let floorBase = document.createElement("hr");
  let liftBtns = `
          <div class="liftBtns">
            <button class="liftBtn ${currentFloor}">&uarr;</button>
            <button class="liftBtn ${currentFloor}">&darr;</button>  
          </div>
          `;

  section.classList.add("floor");
  section.innerHTML = liftBtns;
  section.append(floorBase);
  main.prepend(section);
  // console.log(floor);
});

addLift.addEventListener(
  "click",
  () => {
    lifts++;
    let div = document.createElement("div");
    div.classList.add("lift");
    div.dataset.currentfloor = 0;
    // console.log(div.style);
    div.style.left = 5 * i + 1.5 * lDist + "rem";
    i++;
    lDist++;
    console.log(i);

    floor.appendChild(div);
  },
  true
);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("liftBtn")) {
    floorNum = e.target.classList[1];
    availableLift(floorNum);
  }
});

function availableLift(floorNum) {
  let allLifts = document.querySelectorAll(".lift");
  console.log(allLifts);
  for (let i = 0; i < allLifts.length; i++) {
    if (!allLifts[i].classList.contains("busy")) {
      moveLift(floorNum, allLifts[i]);
      return;
    }
  }
  floors.push(floorNum);
}

function moveLift(floor, lift) {
  let currentFloor = lift.dataset.currentfloor;
  let duration = Math.abs(floor - currentFloor) * 2;
  let move = floor * -17;
  lift.dataset.currentfloor = floor;
  lift.classList.add("busy");
  lift.style.transform = "translateY(" + move + "vh)";
  lift.style.transition = `transform ${duration}s linear`;

  setTimeout(() => {
    lift.classList.remove("busy");
    if (floors.length) {
      moveLift(floors.shift(), lift);
    }
  }, duration * 1000 + 100);
}
