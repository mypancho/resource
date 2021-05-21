(function () {
    const second    = 1000,
          minute    = second * 60,
          hour      = minute * 60,
          day       = hour * 24;
  
    let time = "May 05, 2021 00:00:00",
        countDown = new Date(time).getTime(),
        x = setInterval(function() {    
  
          let now = new Date().getTime(),
              distance = countDown - now;
              var hours =  Math.floor((distance % (day)) / (hour));
              var days =  Math.floor(distance / (day));
              var minutes =  Math.floor((distance % (hour)) / (minute));
              var seconds =  Math.floor((distance % (minute)) / second);
              document.getElementById('days').innerText = (days < 10 )?'0'+days:days,
                document.getElementById('hours').innerText = (hours < 10)?'0'+hours:hours,
                document.getElementById('minutes').innerText = (minutes < 10)?'0'+minutes:minutes,
                document.getElementById('seconds').innerText = (seconds < 10)?'0'+seconds:seconds;
  
          //do something later when date is reached
          if (distance < 0) {
            let headline = document.getElementById("headline"),
                countdown = document.getElementById("countdown"),
                content = document.getElementById("content");
  
            headline.innerText = "Welcome to Fastland!";
            countdown.style.display = "none";
            content.style.display = "block";
  
            clearInterval(x);
          }
          //seconds
        }, 0)
        if (second < 10 && minute < 10 && hour < 10 && day < 10) {
            countDown = "0" + countDown;
          }
    }());

