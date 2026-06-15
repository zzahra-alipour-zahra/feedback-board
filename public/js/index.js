async function submitFeedback() {
    const title = document.getElementById("title").value;
    const message = document.getElementById("message").value;
    const result = document.getElementById("result");
  
    try {
      const res = await fetch("http://localhost:3001/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, message })
      });
  
      if (!res.ok) throw new Error("Failed");
  
      result.innerText = "Feedback submitted successfully!";
      result.style.color = "green";
  
      document.getElementById("title").value = "";
      document.getElementById("message").value = "";
  
    } catch (err) {
      result.innerText = "Error submitting feedback";
      result.style.color = "red";
    }
  }