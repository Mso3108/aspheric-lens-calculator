
document.getElementById('lensForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const R = parseFloat(document.getElementById('R').value);
    const k = parseFloat(document.getElementById('k').value);
    const aperture = parseFloat(document.getElementById('aperture').value);
    const thickness = parseFloat(document.getElementById('thickness').value);
    const A2 = parseFloat(document.getElementById('A2').value) || 0;
    const A4 = parseFloat(document.getElementById('A4').value) || 0;
    const A6 = parseFloat(document.getElementById('A6').value) || 0;
    const A8 = parseFloat(document.getElementById('A8').value) || 0;
    const A12 = parseFloat(document.getElementById('A12').value) || 0;

    const step = 0.5;
    let csv = "r (mm),z (mm)\n";

    for (let r = 0; r <= aperture; r += step) {
        let z = (r * r) / (R * (1 + Math.sqrt(1 - (1 + k) * (r * r) / (R * R))));
        z += A2 * Math.pow(r, 2) + A4 * Math.pow(r, 4) + A6 * Math.pow(r, 6) + A8 * Math.pow(r, 8) + A12 * Math.pow(r, 12);
        z += thickness;
        csv += `${r.toFixed(3)},${z.toFixed(6)}\n`;
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const dl = document.createElement('a');
    dl.href = url;
    dl.download = `aspheric_profile_${Date.now()}.csv`;
    dl.click();

    document.getElementById('success').style.display = 'block';
});
