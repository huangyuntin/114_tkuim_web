document.addEventListener('DOMContentLoaded', async () => {
  renderNav();

  const gradesContainer = document.getElementById('grades');
  if (gradesContainer) {
    const grades = await loadGrades();
    grades.forEach(item => {
      gradesContainer.innerHTML += `
        <div class="card">
          <h3>${item.subject}</h3>
          <p>Score: ${item.score}</p>
        </div>
      `;
    });
  }
});
