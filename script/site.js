document.addEventListener("DOMContentLoaded", () => {
  // Dynamic Last Modified Date
  const lastModified = document.getElementById("lastModified");
  lastModified.textContent = `Last Modified: ${document.lastModified}`;

  // Responsive Navigation
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
      menu.classList.toggle("open");
  });

  // Courses Data
  const courses = [
      { code: "CSE 110", category: "CSE" },
      { code: "WDD 130", category: "WDD" },
      { code: "CSE 111", category: "CSE" },
      { code: "CSE 210", category: "CSE" },
      { code: "WDD 131", category: "WDD" },
      { code: "WDD 231", category: "WDD" },
  ];

  // Populate Courses
  const courseList = document.getElementById("course-list");
  const certificateCourses = document.getElementById("certificate-courses");

  courses.forEach(course => {
      const li = document.createElement("li");
      li.textContent = course.code;
      courseList.appendChild(li);

      const div = document.createElement("div");
      div.classList.add("course-item");
      div.textContent = course.code;
      div.setAttribute("data-category", course.category);
      certificateCourses.appendChild(div);
  });

  // Filter Courses
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(button => {
      button.addEventListener("click", () => {
          const category = button.getAttribute("data-filter");
          const courseItems = document.querySelectorAll(".course-item");

          courseItems.forEach(item => {
              if (category === "all" || item.getAttribute("data-category") === category) {
                  item.style.display = "block";
              } else {
                  item.style.display = "none";
              }
          });
      });
  });
});
