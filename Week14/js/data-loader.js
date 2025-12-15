async function loadGrades() {
  const res = await fetch('./data/grades.json');
  return await res.json();
}
