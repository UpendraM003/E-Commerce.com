$(document).ready(function() {
    $('#signup-form').submit(function(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Get form data
      var name = $('#name').val();
      var email = $('#email').val();
      var password = $('#password').val();
      var mobile = $('#mobile').val();
  
      // Check if email is for admin or customer
      var isAdmin = email.endsWith('@psiog.com');
  
      // Create JSON object for Firestore
      var userData = {
        fields: {
          "Name": {stringValue: name},
          "Email": {stringValue: email},
          "Password": {stringValue: password},
          "Mobile": {stringValue: mobile}
        }
      };
  
      // Set default Creditlimit only for customers
      if (!isAdmin) {
        userData.fields["Creditlimit"] = {integerValue: 0};
      }
  
      // Determine Firestore collection URL
      var collectionUrl = isAdmin ? "https://firestore.googleapis.com/v1/projects/clothing-5c089/databases/(default)/documents/Admin" : "https://firestore.googleapis.com/v1/projects/clothing-5c089/databases/(default)/documents/Customer";
  
      // Send data to Firestore
      $.ajax({
        url: collectionUrl,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(response) {
          $('#message').text('Sign up successful!');
          $('#signup-form')[0].reset(); // Clear form fields
        },
        error: function(xhr, status, error) {
          var errorMessage = JSON.parse(xhr.responseText).error.message;
          $('#message').text('Error: ' + errorMessage);
        }
      });
    });
});
