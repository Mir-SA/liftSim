let addLift = document.querySelector(".addLift"),
  addFloor = document.querySelector(".addFloor"),
  main = document.querySelector("main"),
  floor = document.querySelector(".floor"),
  body = document.querySelector("body"),
  lift = document.querySelector(".lift");
(i = 2),
  (lDist = 2),
  (currentFloor = 0),
  (lifts = 1),
  (floors = []),
  (totalFloors = 1);

addFloor.addEventListener("click", () => {
  currentFloor++;
  let allFloors = document.querySelectorAll("section");
  let section = document.createElement("section");
  let floorBase = document.createElement("hr");
  let liftBtns = `
          <div class="liftBtns">
           <button class="liftBtn ${currentFloor}">&uarr;</button>      
          </div>
          `;

  section.classList.add("floor");
  section.innerHTML = liftBtns;

  if (allFloors.length > 1) {
    console.log(allFloors);

    for (let i = 0; i < allFloors.length - 1; i++) {
      let liftBtns1 = `
              <button class="liftBtn ${
                allFloors.length - (i + 1)
              }">&uarr;</button>
              <button class="liftBtn ${
                allFloors.length - (i + 1)
              }">&darr;</button>
      `;

      allFloors[i].firstElementChild.innerHTML = liftBtns1;
      // console.log(allFloors[i].firstElementChild);
    }
  } else {
  }

  section.append(floorBase);
  main.prepend(section);
  // console.log(allFloors);
});

addLift.addEventListener("click", () => {
  lifts++;
  let div = document.createElement("div");
  div.classList.add("lift");
  div.dataset.currentfloor = 0;
  let doors = `
    <div class="left door"></div>
    <div class="right door"></div>
  `;
  div.innerHTML = doors;
  div.style.left = 5 * i + 1.5 * lDist + "rem";
  i++;
  lDist += 2;

  floor.appendChild(div);
});

// main.addEventListener("change", () => {
//   console.log("Event on Main");
// });

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("liftBtn")) {
    floorNum = e.target.classList[1];
    availableLift(floorNum);
  }
});

function availableLift(floorNum) {
  let allLifts = document.querySelectorAll(".lift");
  // console.log(allLifts);
  for (let i = 0; i < allLifts.length; i++) {
    if (!allLifts[i].classList.contains("busy")) {
      moveLift(floorNum, allLifts[i]);
      return;
    }
  }
  // floors.push(floorNum);
  console.log(floors);
}

function moveLift(floor, lift) {
  let currentFloor = lift.dataset.currentfloor;
  let duration = Math.abs(floor - currentFloor) * 2;
  let move = floor * -8.5;
  lift.dataset.currentfloor = floor;
  lift.classList.add("busy");
  lift.style.transform = `translateY(${move}rem)`;
  lift.style.transition = `transform ${duration}s linear`;

  setTimeout(() => {
    lift.children[0].classList.add("open-left-door");
    lift.children[1].classList.add("open-right-door");
  }, duration * 1000 + 1000);

  setTimeout(() => {
    lift.children[0].classList.remove("open-left-door");
    lift.children[1].classList.remove("open-right-door");
  }, duration * 1000 + 3000);

  setTimeout(() => {
    lift.classList.remove("busy");
  }, duration * 1000 + 5000);
}
