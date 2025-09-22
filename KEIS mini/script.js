// Save form data & navigate to result page
function goToResult() {
    let data = {
      age: parseInt(document.getElementById("age").value),
      sugarFasting: parseInt(document.getElementById("sugar_fasting").value),
      sugarAfter: parseInt(document.getElementById("sugar_after").value),
      chol: parseInt(document.getElementById("chol").value),
      oldpeak: parseFloat(document.getElementById("oldpeak").value)
    };
  
    localStorage.setItem("healthData", JSON.stringify(data));
    window.location.href = "result.html";
    return false; // stop form refresh
  }
  
  // Show result dynamically
  function showResult() {
    let data = JSON.parse(localStorage.getItem("healthData"));
    if (!data) return;
  
    let score = 0;
    let maxScore = 5; // 5 factors
  
    // Weighted scoring
    if (data.age > 50) score++;
    if (data.sugarFasting > 120) score++;
    if (data.sugarAfter > 180) score++;
    if (data.chol > 240) score++;
    if (data.oldpeak > 2) score++;
  
    let riskPercent = Math.round((score / maxScore) * 100);
    let output = document.getElementById("output");
    if (!output) return;
  
    // Progress bar
    output.innerHTML = `
      <p><b>Your Health Risk Score:</b></p>
      <div class="progress-bar">
        <div class="progress" style="width: ${riskPercent}%;"></div>
      </div>
      <p><b>${riskPercent}% risk level</b></p>
    `;
  
    // Messages based on risk
    if (riskPercent <= 30) {
      output.className = "result safe";
      output.innerHTML += "<p>✅ Low chance of heart disease.</p><ul>" +
        "<li>Maintain your healthy lifestyle</li>" +
        "<li>Exercise daily & eat balanced diet</li>" +
        "<li>Get yearly checkups</li></ul>";
    } 
    else if (riskPercent <= 70) {
      output.className = "result warning";
      output.innerHTML += "<p>⚠ Medium risk. Take care!</p><ul>" +
        "<li>Monitor sugar & cholesterol regularly</li>" +
        "<li>Eat less fried & junk food</li>" +
        "<li>Exercise at least 30 min/day</li></ul>";
    } 
    else {
      output.className = "result danger";
      output.innerHTML += "<p>🚨 High chance of heart disease!</p><ul>" +
        "<li>Consult a doctor immediately</li>" +
        "<li>Control sugar, cholesterol, and BP</li>" +
        "<li>Stop smoking & alcohol</li>" +
        "<li>Practice yoga/meditation to reduce stress</li></ul>";
    }
  }
  