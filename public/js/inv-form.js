document.getElementById('addInventoryForm').addEventListener('submit', function(e) {
    const form = e.target;
    // Example: validate make, model, year, price
    const make = form.make.value.trim();
    const model = form.model.value.trim();
    const year = parseInt(form.year.value);
    const price = parseFloat(form.price.value);

    if (!make || !/^[A-Za-z0-9 ]+$/.test(make)) {
      alert('Please enter a valid make (letters, numbers, spaces).');
      e.preventDefault();
      return;
    }

    if (!model || !/^[A-Za-z0-9 ]+$/.test(model)) {
      alert('Please enter a valid model (letters, numbers, spaces).');
      e.preventDefault();
      return;
    }

    if (isNaN(year) || year < 1900 || year > 2100) {
      alert('Please enter a valid year between 1900 and 2100.');
      e.preventDefault();
      return;
    }

    if (isNaN(price) || price < 0) {
      alert('Please enter a valid price.');
      e.preventDefault();
      return;
    }
  });