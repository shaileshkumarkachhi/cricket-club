$(function () {
  $(
      "#contactForm input,#contactForm textarea,#contactForm button"
  ).jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(" ") >= 0) {
        firstName = name.split(" ").slice(0, -1).join(" ");
      }
      const data = {
        name: name,
        email: email,
        phone: phone,
        message: message
      };
      console.log(data);
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "https://us-central1-hardy-abode-283819.cloudfunctions.net/sendSupportRequest",
        type: "POST",
        data: data,
        cache: false,
        success: function () {
          // Success message
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
          .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
          )
          .append("</button>");
          $("#success > .alert-success").append(
              "<strong>Your message has been sent. </strong>"
          );
          $("#success > .alert-success").append("</div>");
          //clear all fields
          $("#contactForm").trigger("reset");
        },
        error: function () {
          // Fail message
          $("#success").html("<div class='alert alert-danger'>");
          $("#success > .alert-danger")
          .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
          )
          .append("</button>");
          $("#success > .alert-danger").append(
              $("<strong>").text(
                  "Sorry " +
                  firstName +
                  ", it seems that server is not responding. Please try again later!"
              )
          );
          $("#success > .alert-danger").append("</div>");
          //clear all fields
          $("#contactForm").trigger("reset");
        },
        complete: function () {
          setTimeout(function () {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        },
      });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $(
      "#teamRegistrationForm input,#teamRegistrationForm textarea,#teamRegistrationForm button"
  ).jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      const requestData = {
        teamName: $("input#team-name").val(),
        email: $("input#captain-email").val(),
        captainName: $("input#captain-name").val(),
        number: $("input#contact-number").val(),
        players: []
      };

      for (let i = 0; i < 11; i++) {
          const num = i+1;
        const player = {
          name: $("input#player-" + num).val(),
          jersey: $("input#jersey-" + num).val(),
        };
        requestData.players.push(player);
      }
      console.log(requestData);
      $this = $("#sendRegistrationButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "https://us-central1-hardy-abode-283819.cloudfunctions.net/sendRegistrationRequest",
        type: "POST",
        data: requestData,
        cache: false,
        success: function () {
          // Success message
          $("#registration-success").html("<div class='alert alert-success'>");
          $("#registration-success > .alert-success")
          .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
          )
          .append("</button>");
          $("#registration-success > .alert-success").append(
              "<strong>Your message has been sent. </strong>"
          );
          $("#registration-success > .alert-success").append("</div>");
          //clear all fields
          $("#contactForm").trigger("reset");
        },
        error: function () {
          // Fail message
          $("#registration-success").html("<div class='alert alert-danger'>");
          $("#registration-success > .alert-danger")
          .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
          )
          .append("</button>");
          $("#registration-success > .alert-danger").append(
              $("<strong>").text(
                  "Sorry , it seems that server is not responding. Please try again later!"
              )
          );
          $("#registration-success > .alert-danger").append("</div>");
          //clear all fields
          $("#contactForm").trigger("reset");
        },
        complete: function () {
          setTimeout(function () {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        },
      });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
  $("#success").html("");
});
