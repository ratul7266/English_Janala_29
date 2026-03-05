const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const displayLevelWord = (words) => {
  const wordContaienr = document.getElementById("word-container");
  wordContaienr.innerHTML = "";

  if (words.length == 0) {
    wordContaienr.innerHTML = `
    <div class="text-center col-span-full space-y-4">
    <img src="./images/alert-error.png" alt="" class="mx-auto">
        <p class="font-bangla text-base font-medium text-gray-600">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bangla font-bold text-3xl">নেক্সট Lesson এ যান</h2>
      </div>
    `;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
      <h2 class="font-bold text-2xl">${word.word ? word : "শব্দ পাওয়া যায়নি।"}</h2>
      <p class="font-semibold">Meaning /Pronounciation</p>
      <div class="font-bangla text-2xl font-medium text-gray-600">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি।"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি। "}"</div>
      <div class="flex justify-between items-center">
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info fa-lg"></i></button>
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high fa-lg"></i></button>
      </div>
    </div>
    `;
    wordContaienr.append(card);
  });
};

const displayLesson = (lessons) => {
  const levelContaienr = document.getElementById("level-container");
  levelContaienr.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open-reader"></i> Lesson - ${lesson.level_no}
                </button>
    `;

    levelContaienr.append(btnDiv);
  }
};
loadLessons();
