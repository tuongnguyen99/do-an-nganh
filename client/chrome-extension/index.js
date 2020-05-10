function mapDay(day) {
  switch (day) {
    case 'Thứ Hai':
      return 1;
    case 'Thứ Ba':
      return 2;
    case 'Thứ Tư':
      return 3;
    case 'Thứ Năm':
      return 4;
    case 'Thứ Sáu':
      return 5;
    case 'Thứ Bảy':
      return 6;
    case 'Chủ Nhật':
      return 0;
    default:
      return -1;
  }
}

// check login
var id = localStorage.getItem('bdu_id');

if (id) {
  document.querySelector('.login').style.display = 'none';
}

// handle event login
const btnSend = document.querySelector('#btnSend');
btnSend.addEventListener('click', () => {
  const mssv = document.querySelector('#mssv').value;
  if (mssv.length < 7 || mssv.length > 8) {
    alert('Mã số sinh viên không hợp lệ!');
  } else {
    localStorage.setItem('bdu_id', mssv);
    window.location.reload();
  }
});

// handle search
const btnSearch = document.querySelector('#btnSearch');
btnSearch.addEventListener('click', () => {
  const input = document.querySelector('#txtSearch').value;
  window.location.href = `https://www.google.com/search?q=${input}`;
});

// handle key event
document.querySelector('#mssv').addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    btnSend.click();
  }
});

document.querySelector('#txtSearch').addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    btnSearch.click();
  }
});

// filter today schedule from week schedule
function getTodaySchedule(schedule) {
  const date = new Date();
  const day = date.getDay();

  const unit = schedule.filter((item) => {
    return day === mapDay(item.weekDay);
  });
  return unit;
}

// render schedule items
function renderSchedule(s) {
  return s.reduce((acc, cur) => {
    return (
      acc +
      `<div class="schedule-item">
          <div class="label">
            <p>Lớp:</p>
            <p>Mã môn học:</p>
            <p>Tên môn học:</p>
            <p>Phòng:</p>
            <p>Thứ:</p>
            <p>Tiết bắt đầu:</p>
            <p>Số tiết:</p>
            <p>Giảng viên:</p>
          </div>
          <div class="detail">
            <p id="class">${cur.class}</p>
            <p id="subjectCode">${cur.subjectCode}</p>
            <p id="subjectName">${cur.subjectName}</p>
            <p id="room">${cur.room}</p>
            <p id="weekDay">${cur.weekDay}</p>
            <p id="startSlot">${cur.startSlot}</p>
            <p id="numbersOfSlots">${cur.numbersOfSlots}</p>
            <p id="instructor">${cur.instructor}</p>
          </div>
        </div>`
    );
  }, '');
}

// render a message when today's schedule is empty
function renderEmptySchedule() {
  return `<div class="empty-schedule">
            <img src="./images/cat.gif" alt="" />
            <span>Bạn không có tiết học vào ngày hôm nay!</span>
          </div>`;
}

// get data from API by student Id
fetch(`http://localhost:4000/api/schedule/${id}`, { method: 'GET' })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const schedule = document.querySelector('#content');
    const username = document.querySelector('#txtName');
    const todaySchedule = getTodaySchedule(data.schedule);
    console.log(todaySchedule);

    if (todaySchedule.length) {
      schedule.innerHTML = renderSchedule(todaySchedule);
      console.log('run1');
    } else {
      schedule.innerHTML = renderEmptySchedule();
      console.log('run');
    }
    username.append(' ' + data.name.split(' - ')[0]);
  });

// set clock

const clock = document.querySelector('#clock');
function setTime() {
  const date = new Date();
  clock.innerHTML = `${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
}
setInterval(setTime, 100);

//handle logout
const btnLogout = document.querySelector('#btnLogout');
btnLogout.addEventListener('click', () => {
  localStorage.clear('bdu_id');
  window.location.reload();
});
