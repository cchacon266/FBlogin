document.getElementById('sms-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const to = document.getElementById('to').value;
    const body = document.getElementById('body').value;

    try {
        const response = await fetch('/sendsms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ to, body })
        });

        const responseText = await response.text();
        document.getElementById('response').innerText = responseText;
    } catch (error) {
        document.getElementById('response').innerText = `Error sending message: ${error.message}`;
    }
});
