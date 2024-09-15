// Dark/Light Mode Switcher
document.getElementById('themeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Bildkonvertierung
document.getElementById('convertButton').addEventListener('click', function () {
    const fileInput = document.getElementById('uploadFile');
    const format = document.getElementById('formatSelect').value;

    if (!fileInput.files.length) {
        alert('Bitte lade zuerst ein Bild hoch!');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            canvas.toBlob(function (blob) {
                const downloadLink = document.getElementById('downloadLink');
                const url = URL.createObjectURL(blob);
                
                downloadLink.href = url;
                downloadLink.download = `converted-image.${format}`;
                downloadLink.style.display = 'inline';
                downloadLink.textContent = 'Download';
            }, `image/${format}`);
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});
