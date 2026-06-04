function registerBallerToMemory() {
    if (!passcheckIdentityGuard()) return;

    const name = document.getElementById('pName').value.trim();
    const school = document.getElementById('pSchool').value.trim(); // <-- CAPTURES INPUT VALUE
    const division = document.getElementById('pDivision').value;
    const dob = document.getElementById('pDOB').value;
    const tier = document.getElementById('pTier').value;

    if (!school) {
        alert("⚠ VALIDATION ERROR: Please enter a valid School Name.");
        return;
    }

    const birthYear = new Date(dob).getFullYear();
    const calculatedAge = 2026 - birthYear;
    const faceScoreSimulated = Math.floor(Math.random() * (100 - 88 + 1)) + 88; // 88% - 100% variance

    const newPlayerNode = {
        uid: "ATH-" + Math.floor(100000 + Math.random() * 900000),
        name: name,
        school: school, // <-- MAPS ACTUAL SCHOOL DATA INTO SYSTEM MEMORY
        dob: dob,
        division: division,
        tier: tier,
        avatar: runningAvatarBuffer,
        docHash: currentGeneratedHash !== "No File Seeded" ? currentGeneratedHash : "SHA256-" + Math.random().toString(16).substring(2, 10).toUpperCase(),
        ageDetected: calculatedAge,
        faceMatchScore: faceScoreSimulated,
        printHash: "FPRINT-" + currentAdmin.tenant.substring(0,3).toUpperCase() + "-" + Math.floor(10 + Math.random() * 90),
        status: "PENDING"
    };

    // Commit object node structure to current active memory array location
    tenantDatabases[currentAdmin.tenant].push(newPlayerNode);

    alert(`✅ INTEGRITY LEDGER INGESTION COMPLETE:\n\nPlayer ${name} of ${school} successfully logged into private ${currentAdmin.tenant} memory space.`);

    // Clear operational fields
    document.getElementById('playerEnrollmentForm').reset();
    document.getElementById('avatarPreviewBox').innerHTML = "<span>👤</span>";
    document.getElementById('mirrorName').textContent = "Awaiting Input";
    document.getElementById('mirrorHash').textContent = "No File Seeded";
    runningAvatarBuffer = "👤";
    currentGeneratedHash = "No File Seeded";
    autoTrackDivision();
}
