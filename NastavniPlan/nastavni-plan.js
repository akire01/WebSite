$(function() {
  $("#tablica").hide();

  const xhr = new XMLHttpRequest();
  xhr.open("get", "http://www.fulek.com/VUA/SUPIT/GetNastavniPlan");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const courses = JSON.parse(xhr.responseText);
      showTags(courses);
    }
  };
  xhr.send();
});

function retrieveCourse(id) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", `http://www.fulek.com/VUA/supit/GetKolegij/${id}`);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const course = JSON.parse(xhr.responseText);
      addNewRow(course);
    }
  };
  xhr.send();
}

function showTags(courses) {
  $("#tags").autocomplete({
    source: courses,
    focus: function(event, ui) {
      event.preventDefault(); //sprjecava jqueri.ui da stavi item.value kao value inputa
      this.value = ui.item.label;
    },
    select: function(event, ui) {
      event.preventDefault(); //sprjecava jqueri.ui da stavi item.value kao value inputa
      this.value = ui.item.label;
      retrieveCourse(ui.item.value);
    }
  });
}

let number = 0;

function addNewRow(course) {
  const row = ` <tr>
              <td>${course.kolegij}</td>
              <td>${course.ects}</td>
              <td>${course.sati}</td>
              <td>${course.predavanja}</td>
              <td>${course.vjezbe}</td>
              <td>${course.tip}</td>
              <td>${course.semestar}</td>
              <td><button 
              class="obrisi-btn"
              onclick="deleteCourse(this, ${course.ects}, ${course.sati})">Obriši</button></td>
            </tr>`;

  $("#body").append(row);

  let currentEcts = +$("#ects")[0].innerText;
  let totalEcts = currentEcts + course.ects;

  $("#ects")[0].innerText = totalEcts;

  let currentHours = +$("#sati")[0].innerText;
  let totalHours = currentHours + course.sati;

  $("#sati")[0].innerText = totalHours;

  number += 1;
  toggleTable();
}

function deleteCourse(button, ects, sati) {
  const rowIndex = button.parentNode.parentNode.rowIndex;
  document.getElementById("tablica").deleteRow(rowIndex);

  let currentEcts = +$("#ects")[0].innerText;
  let totalEcts = currentEcts - ects;

  $("#ects")[0].innerText = totalEcts;

  let currentHours = +$("#sati")[0].innerText;
  let totalHours = currentHours - sati;

  $("#sati")[0].innerText = totalHours;

  number -= 1;
  toggleTable();
}

function toggleTable() {
  if (number > 0) {
    $("#tablica").show();
  } else {
    $("#tablica").hide();
  }
}
