// Liste officielle des 23 matières avec leurs coefficients exacts (Total = 950)
const matieresData = [
    { id: "AN-01", name: "ANGLAIS", coeff: 60 },
    { id: "AP-01", name: "APPLICATION", coeff: 20 },
    { id: "AR-01", name: "ART ET MUSIQUE", coeff: 40 },
    { id: "CL-00", name: "CULTURE LITTERAIRE", coeff: 80 },
    { id: "CL-01", name: "CULTURE GENERALE", coeff: 30 },
    { id: "CR-01", name: "CREOLE", coeff: 40 },
    { id: "EC-02", name: "ECONOMIE", coeff: 30 },
    { id: "ED-00", name: "EDUCATION A LA CITOYENNETE", coeff: 20 },
    { id: "ES-01", name: "ESPAGNOL", coeff: 60 },
    { id: "FR-07", name: "LITTERATURE HAITIENNE", coeff: 80 },
    { id: "FR-12", name: "METHODOLOGIE DE BASE", coeff: 40 },
    { id: "IB-00", name: "INTRO A LA BIBLE", coeff: 20 },
    { id: "MT-03", name: "ANALYSE", coeff: 60 },
    { id: "MT-04", name: "TRIGONOMETRIE", coeff: 20 },
    { id: "MT-06", name: "ANALYSE COMBINATOIRE", coeff: 20 },
    { id: "SE-04", name: "PHYSIOLOGIE/BIO", coeff: 50 },
    { id: "SE-06", name: "CHIMIE", coeff: 60 },
    { id: "SE-08", name: "PHYSIQUE/OPTIQUE", coeff: 50 },
    { id: "SE-09", name: "INFORMATIQUE", coeff: 20 },
    { id: "SE-10", name: "PHYSIQUE/ELECTRICITE", coeff: 50 },
    { id: "SP-02", name: "SPORT", coeff: 10 },
    { id: "SS-00", name: "SC-SOCIALES", coeff: 60 },
    { id: "ST-01", name: "STATISTIQUES", coeff: 30 }
];

const TOTAL_COEFFS = 950;

// Initialisation du DOM pour les matières
function initSubjects() {
    const container = document.getElementById('subjectsContainer');
    container.innerHTML = '';
    
    matieresData.forEach(mat => {
        const div = document.createElement('div');
        div.className = 'subject-item';
        div.innerHTML = `
            <div class="subject-info">
                <span class="subject-name">${mat.name}</span>
                <span class="subject-coeff">Coeff: ${mat.coeff}</span>
            </div>
            <input type="number" class="subject-input" id="sub_${mat.id}" data-coeff="${mat.coeff}" placeholder="Note / ${mat.coeff}" min="0" max="${mat.coeff}" step="0.01" oninput="calculerMatieres()">
        `;
        container.appendChild(div);
    });
}

// Calcul de la moyenne par matières
function calculerMatieres() {
    let totalObtenu = 0;
    let totalSaisiCoeffs = 0;

    matieresData.forEach(mat => {
        const input = document.getElementById(`sub_${mat.id}`);
        const val = parseFloat(input.value);
        if (!isNaN(val)) {
            totalObtenu += val;
            totalSaisiCoeffs += mat.coeff;
        }
    });

    const moyenne100 = (totalObtenu / TOTAL_COEFFS) * 100;

    document.getElementById('totalPointsAchieved').innerText = totalObtenu.toFixed(2);
    document.getElementById('moyenneSur100').innerText = moyenne100.toFixed(2);

    let mention = "En attente de saisie";

    if (totalSaisiCoeffs > 0) {
        if (moyenne100 >= 80) { mention = "Admis • Très Honorable"; }
        else if (moyenne100 >= 70) { mention = "Admis • Bien"; }
        else if (moyenne100 >= 60) { mention = "Admis • Assez-Bien"; }
        else if (moyenne100 >= 50) { mention = "Admis • Passage Juste"; }
        else { mention = "Ajourné / Insuffisant"; }
    }

    document.getElementById('mentionMatiere').innerText = `Mention : ${mention}`;
}

// Calculateur de moyenne générale en 4 étapes
function calculerEtapes() {
    const e1 = parseFloat(document.getElementById('step1').value) || 0;
    const e2 = parseFloat(document.getElementById('step2').value) || 0;
    const e3 = parseFloat(document.getElementById('step3').value) || 0;
    const e4 = parseFloat(document.getElementById('step4').value) || 0;

    let count = 0;
    if(document.getElementById('step1').value !== '') count++;
    if(document.getElementById('step2').value !== '') count++;
    if(document.getElementById('step3').value !== '') count++;
    if(document.getElementById('step4').value !== '') count++;

    if (count === 0) {
        document.getElementById('moyenneEtapesResult').innerText = "0.00 / 100";
        document.getElementById('mentionEtapes').innerText = "Statut : En attente";
        return;
    }

    const moyenneGenerale = (e1 + e2 + e3 + e4) / count;
    document.getElementById('moyenneEtapesResult').innerHTML = `${moyenneGenerale.toFixed(2)} <span style="font-size: 1.5rem;">/ 100</span>`;

    let mention = "";
    if (moyenneGenerale >= 80) mention = "🏆 Mention Excellente";
    else if (moyenneGenerale >= 70) mention = "🥈 Mention Très Bien";
    else if (moyenneGenerale >= 60) mention = "🥉 Mention Bien";
    else if (moyenneGenerale >= 50) mention = "✅ Admis / Passable";
    else mention = "⚠️ Non Validé";

    document.getElementById('mentionEtapes').innerText = mention;
}

// Mode Sombre / Clair toggle
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');
    if (html.getAttribute('data-theme') === 'light') {
        html.setAttribute('data-theme', 'dark');
        icon.className = 'fa-solid fa-sun';
    } else {
        html.setAttribute('data-theme', 'light');
        icon.className = 'fa-solid fa-moon';
    }
}

// Remplir des données de démonstration
function preemplirDemo() {
    matieresData.forEach(mat => {
        const input = document.getElementById(`sub_${mat.id}`);
        const demoScore = (mat.coeff * (0.65 + Math.random() * 0.25)).toFixed(1);
        input.value = demoScore;
    });
    calculerMatieres();

    document.getElementById('step1').value = "76.5";
    document.getElementById('step2').value = "82.0";
    document.getElementById('step3').value = "79.0";
    document.getElementById('step4').value = "85.5";
    calculerEtapes();
}

// Réinitialisation des notes
function reinitialiserMatieres() {
    matieresData.forEach(mat => {
        document.getElementById(`sub_${mat.id}`).value = '';
    });
    document.getElementById('step1').value = '';
    document.getElementById('step2').value = '';
    document.getElementById('step3').value = '';
    document.getElementById('step4').value = '';
    calculerMatieres();
    calculerEtapes();
}

window.onload = initSubjects;
