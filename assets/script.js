const form = document.querySelector("form");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const yearsOutput = document.getElementById("years");
const monthsOutput = document.getElementById("months");
const daysOutput = document.getElementById("days");

const errorDay = document.getElementById("error-day");
const errorMonth = document.getElementById("error-month");
const errorYear = document.getElementById("error-year");

function isValidDate(year, month, day) {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function calculateAge(birthDate, today) {
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonthLastDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();
    days += previousMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

function resetResults() {
  yearsOutput.textContent = "--";
  monthsOutput.textContent = "--";
  daysOutput.textContent = "--";
}

function showResults(age) {
  yearsOutput.textContent = age.years;
  monthsOutput.textContent = age.months;
  daysOutput.textContent = age.days;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  errorDay.textContent = "";
  errorMonth.textContent = "";
  errorYear.textContent = "";
  dayInput.closest(".field").classList.remove("error");
  monthInput.closest(".field").classList.remove("error");
  yearInput.closest(".field").classList.remove("error");

  let hasError = false;

  if (!dayInput.value) {
    errorDay.textContent = "This field is required";
    dayInput.closest(".field").classList.add("error");
    hasError = true;
  }
  if (!monthInput.value) {
    errorMonth.textContent = "This field is required";
    monthInput.closest(".field").classList.add("error");
    hasError = true;
  }
  if (!yearInput.value) {
    errorYear.textContent = "This field is required";
    yearInput.closest(".field").classList.add("error");
    hasError = true;
  }

  if (hasError) {
    resetResults();
    return;
  }

  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);
  const today = new Date();

  if (day < 1 || day > 31) {
    errorDay.textContent = "Must be a valid day";
    dayInput.closest(".field").classList.add("error");
    hasError = true;
  }

  if (month < 1 || month > 12) {
    errorMonth.textContent = "Must be a valid month";
    monthInput.closest(".field").classList.add("error");
    hasError = true;
  }

  if (year > today.getFullYear()) {
    errorYear.textContent = "Must be in the past";
    yearInput.closest(".field").classList.add("error");
    hasError = true;
  }

  if (hasError) {
    resetResults();
    return;
  }

  if (!isValidDate(year, month, day)) {
    errorDay.textContent = "Must be a valid date";
    dayInput.closest(".field").classList.add("error");
    monthInput.closest(".field").classList.add("error");
    yearInput.closest(".field").classList.add("error");

    resetResults();
    return;
  }

  const birthDate = new Date(year, month - 1, day);

  if (birthDate > today) {
    errorYear.textContent = "Must be in the past";
    dayInput.closest(".field").classList.add("error");
    monthInput.closest(".field").classList.add("error");
    yearInput.closest(".field").classList.add("error");
    resetResults();
    return;
  }

  const age = calculateAge(birthDate, today);
  showResults(age);
});
