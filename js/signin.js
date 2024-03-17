$(document).ready(function() {
    $('#signin-form').submit(function(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Get form data
      var email = $('#email').val();
      var password = $('#password').val();
  
      // Check if email is for admin or customer
      var isAdmin = email.endsWith('@psiog.com');
  
      // Determine Firestore collection URL
      var collectionUrl = isAdmin ? "Admin" : "Customer";
  
      // Send request to Firestore to check credentials
      $.ajax({
        url: "https://firestore.googleapis.com/v1/projects/clothing-5c089/databases/(default)/documents/" + collectionUrl,
        type: "GET",
        success: function(response) {
          var documents = response.documents;
          var authenticated = false;
  
          // Iterate through the documents to check credentials
          for (var i = 0; i < documents.length; i++) {
            var doc = documents[i];
            var docFields = doc.fields;
  
            // Check email and password
            if (docFields.Email.stringValue === email && docFields.Password.stringValue === password) {
              authenticated = true;
              break;
            }
          }
  
          if (authenticated) {
            $('#message').text('Sign in successful!');
            // Redirect to dashboard or another HTML page
            window.location.href = "index1.html"; // Replace "dashboard.html" with the desired page
          } else {
            $('#message').text('Invalid email or password.');
          }
        },
        error: function(xhr, status, error) {
          $('#message').text('Error: ' + error);
        }
      });
    });
  });
  
  