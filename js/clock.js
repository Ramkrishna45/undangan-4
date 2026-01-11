$(document).ready(function () {

  function initClock(selector) {
    let currentDate = new Date();
    let targetDate = moment.tz("2026-05-07 12:00", "Asia/Kolkata");
    let diff = targetDate / 1000 - currentDate.getTime() / 1000;

    if (diff <= 0) {
      $(selector).FlipClock(0, {
        clockFace: "DailyCounter",
        countdown: true,
        autostart: false
      });
    } else {
      $(selector).FlipClock(diff, {
        clockFace: "DailyCounter",
        countdown: true
      });
    }
  }

  // Initialize BOTH clocks
  initClock(".clock-main");
  initClock(".clock-small");

});
