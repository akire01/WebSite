$(function() {
  $(".type-text").each(function() {
    var text = $(this).attr("title");
    $(this).teletype({
      text: [text],
      typeDelay: 10,
      backDelay: 20,
      cursor: "▋",
      delay: 3000,
      preserve: true,
      loop: 1
    });
  });
});
