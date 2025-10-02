document.getElementById('classificationForm').addEventListener('submit', function(e) {
    const input = document.getElementById('classification_name');
    const pattern = /^[A-Za-z0-9]+$/; 
    if (!pattern.test(input.value)) {
      e.preventDefault();
      alert('Classification name must contain only letters and numbers, no spaces or special characters.');
    }
});


