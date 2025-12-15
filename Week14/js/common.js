function renderNav() {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <nav>
      <div>ANTIGRAVITY</div>
      <div>
        <a href="index.html">Home</a>
        <a href="grades.html">Grades</a>
      </div>
    </nav>
    `
  );
}
