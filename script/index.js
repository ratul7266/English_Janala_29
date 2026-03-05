const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContaienr = document.getElementById("word-container");
  wordContaienr.innerHTML = "";
  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
      <h2 class="font-bold text-2xl">${word.word}</h2>
      <p class="font-semibold">Meaning /Pronounciation</p>
      <div class="font-bangla text-2xl font-medium text-gray-600">"${word.meaning} / ${word.pronunciation}"</div>
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
                <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open-reader"></i> Lesson - ${lesson.level_no}
                </button>
    `;

    levelContaienr.append(btnDiv);
  }
};
loadLessons();
