

// Comment 1: This is an informative comment about the email validation algorithm.
// Comment 2: Edge case handling for invalid emails should include common typos.
// Comment 3: Adding test cases for different email formats.
// Comment 4: Consider user experience when prompting for email input.
// Comment 5: Improve efficiency with regex validation instead of manual checks.

// Function to validate email
function validateEmail(email) {
    // Regex for email validation
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
